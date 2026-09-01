/**
 * SUPPLIES ARE LIMITED - LAUNCH TRACKING AUTOMATION
 * Google Apps Script for Daily Data Collection & Calculations
 *
 * Setup Instructions:
 * 1. Create Google Sheet: "Supplies Are Limited - Sept Launch Tracking"
 * 2. Go to Extensions → Apps Script
 * 3. Copy this entire file into the Apps Script editor
 * 4. Set API credentials (see Setup Instructions below)
 * 5. Save and deploy triggers
 *
 * Data will auto-populate daily:
 * - 6:00 PM CDT: Google Analytics data
 * - 6:30 PM CDT: Shopify order data
 * - 7:00 PM CDT: Klavioy email metrics
 * - 7:15 PM CDT: Calculate formulas & create daily summary
 */

// ============================================================================
// CONFIGURATION - EDIT THESE WITH YOUR API CREDENTIALS
// ============================================================================

const CONFIG = {
  // Google Analytics
  GA_PROPERTY_ID: 'YOUR_GA4_PROPERTY_ID', // Get from GA4 admin
  GA_DATA_STREAM: 'YOUR_DATA_STREAM_ID',

  // Shopify
  SHOPIFY_SHOP_URL: 'suppliesarelimited.myshopify.com',
  SHOPIFY_ACCESS_TOKEN: 'YOUR_SHOPIFY_ACCESS_TOKEN', // Get from Shopify admin

  // Klavioy
  KLAVIOY_API_KEY: 'YOUR_KLAVIOY_API_KEY', // Get from Klavioy account

  // Sheet Structure
  SHEET_NAME_DAILY: 'Daily Tracking',
  SHEET_NAME_EMAIL: 'Email Metrics',
  SHEET_NAME_SUMMARY: 'Daily Summary',
  SHEET_NAME_WEEKLY: 'Weekly Analysis',

  // Campaign Filters (for Google Analytics)
  TRACKED_CAMPAIGNS: [
    'sept_launch',
    'welcome_1',
    'newsletter_week1'
  ],

  // Time zone
  TIMEZONE: 'America/Chicago'
};

// ============================================================================
// 1. GOOGLE ANALYTICS DATA COLLECTION (6:00 PM CDT)
// ============================================================================

function fetchGoogleAnalyticsData() {
  try {
    Logger.log('Starting Google Analytics data pull...');

    const today = getFormattedDate();
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME_DAILY);

    // Get yesterday's data (GA has a 1-day delay for complete data)
    const analyticsData = getAnalyticsMetrics(today);

    // Group data by channel and traffic source
    const groupedData = groupAnalyticsData(analyticsData);

    // Add rows to sheet
    for (const channelData of groupedData) {
      addDataRow(sheet, {
        date: today,
        channel: channelData.channel,
        trafficSource: channelData.source,
        visitors: channelData.visitors,
        emailSignups: channelData.signups,
        orders: null, // Will be filled by Shopify
        revenue: null, // Will be filled by Shopify
        notes: 'GA data fetched automatically'
      });
    }

    Logger.log('Google Analytics data pull complete');

  } catch (error) {
    Logger.log('ERROR in fetchGoogleAnalyticsData: ' + error);
    sendErrorNotification('Google Analytics fetch failed: ' + error);
  }
}

function getAnalyticsMetrics(date) {
  /**
   * IMPORTANT: This requires Google Analytics Data API authentication
   * Steps to set up:
   * 1. Go to Google Cloud Console
   * 2. Enable "Google Analytics Data API"
   * 3. Create a Service Account
   * 4. Download JSON key
   * 5. Add service account email to Google Analytics property as Viewer
   * 6. Use the JSON key with the fetch request below
   */

  try {
    // Get service account credentials from Script Properties
    const scriptProperties = PropertiesService.getScriptProperties();
    const gaCredentials = scriptProperties.getProperty('GA_SERVICE_ACCOUNT_JSON');

    if (!gaCredentials) {
      Logger.log('WARNING: GA credentials not set. Set via setGACredentials()');
      return [];
    }

    const credentials = JSON.parse(gaCredentials);
    const accessToken = getGoogleAccessToken(credentials);

    // Build the Analytics Data API request
    const requestBody = {
      dateRanges: [{
        startDate: date,
        endDate: date
      }],
      dimensions: [
        { name: 'sessionDefaultChannelGrouping' },
        { name: 'sessionSource' },
        { name: 'sessionMedium' }
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'conversions' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'sessionCampaignName',
          value: CONFIG.TRACKED_CAMPAIGNS.join(',')
        }
      }
    };

    const options = {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify(requestBody),
      muteHttpExceptions: true
    };

    const url = 'https://analyticsdata.googleapis.com/v1beta/properties/' +
                CONFIG.GA_PROPERTY_ID + ':runReport';

    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());

    if (response.getResponseCode() !== 200) {
      Logger.log('GA API Error: ' + response.getContentText());
      return [];
    }

    // Transform GA response into usable data
    const analyticsData = [];
    if (result.rows) {
      for (const row of result.rows) {
        analyticsData.push({
          channel: row.dimensionValues[0].value,
          source: row.dimensionValues[1].value,
          medium: row.dimensionValues[2].value,
          visitors: parseInt(row.metricValues[0].value) || 0,
          signups: parseInt(row.metricValues[1].value) || 0
        });
      }
    }

    return analyticsData;

  } catch (error) {
    Logger.log('Error fetching GA metrics: ' + error);
    return [];
  }
}

function groupAnalyticsData(analyticsData) {
  // Group by channel and traffic source for cleaner sheet layout
  const grouped = {};

  for (const item of analyticsData) {
    const key = item.channel + '|' + item.source;
    if (!grouped[key]) {
      grouped[key] = {
        channel: item.channel,
        source: item.source,
        visitors: 0,
        signups: 0
      };
    }
    grouped[key].visitors += item.visitors;
    grouped[key].signups += item.signups;
  }

  return Object.values(grouped);
}

// ============================================================================
// 2. SHOPIFY ORDER DATA COLLECTION (6:30 PM CDT)
// ============================================================================

function fetchShopifyData() {
  try {
    Logger.log('Starting Shopify data pull...');

    const today = getFormattedDate();
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME_DAILY);

    // Get today's orders from Shopify
    const orders = getShopifyOrders(today);

    // Group orders by source (if UTM tracking enabled)
    const groupedOrders = groupOrdersBySource(orders);

    // Update existing rows with order data
    for (const sourceData of groupedOrders) {
      updateDataRow(sheet, today, sourceData);
    }

    Logger.log('Shopify data pull complete');

  } catch (error) {
    Logger.log('ERROR in fetchShopifyData: ' + error);
    sendErrorNotification('Shopify fetch failed: ' + error);
  }
}

function getShopifyOrders(date) {
  /**
   * IMPORTANT: Create a Shopify Custom App to get access token
   * Steps:
   * 1. Go to Shopify admin → Settings → Apps and integrations → Develop apps
   * 2. Create a new app
   * 3. Under Admin API scopes, enable: read_orders
   * 4. Install app and copy access token
   * 5. Replace SHOPIFY_ACCESS_TOKEN above
   */

  try {
    const startDate = date + 'T00:00:00Z';
    const endDate = date + 'T23:59:59Z';

    const url = 'https://' + CONFIG.SHOPIFY_SHOP_URL +
                '/admin/api/2024-01/orders.json?status=any&created_at_min=' +
                encodeURIComponent(startDate) + '&created_at_max=' +
                encodeURIComponent(endDate) + '&limit=250';

    const options = {
      method: 'get',
      headers: {
        'X-Shopify-Access-Token': CONFIG.SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url, options);

    if (response.getResponseCode() !== 200) {
      Logger.log('Shopify API Error: ' + response.getContentText());
      return [];
    }

    const result = JSON.parse(response.getContentText());
    return result.orders || [];

  } catch (error) {
    Logger.log('Error fetching Shopify orders: ' + error);
    return [];
  }
}

function groupOrdersBySource(orders) {
  // Extract source from UTM parameters if available
  const grouped = {};

  for (const order of orders) {
    let source = 'Direct';
    let channel = 'Other';

    // Try to get source from order attributes or referring site
    if (order.referring_site && order.referring_site !== '') {
      source = order.referring_site;
    }

    // Map source to channel
    if (source.includes('linkedin')) channel = 'LinkedIn';
    else if (source.includes('substack')) channel = 'Substack';
    else if (source.includes('email') || order.utm_source === 'email') channel = 'Email';
    else if (source === 'Direct') channel = 'Direct';

    const key = channel + '|' + source;
    if (!grouped[key]) {
      grouped[key] = {
        channel: channel,
        source: source,
        orders: 0,
        revenue: 0,
        orderCount: 0
      };
    }

    grouped[key].orders += 1;
    grouped[key].revenue += parseFloat(order.total_price) || 0;
    grouped[key].orderCount += 1;
  }

  return Object.values(grouped);
}

// ============================================================================
// 3. KLAVIOY EMAIL METRICS COLLECTION (7:00 PM CDT)
// ============================================================================

function fetchKlaviyoData() {
  try {
    Logger.log('Starting Klavioy data pull...');

    const today = getFormattedDate();
    const emailSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME_EMAIL);

    // Get email performance for today
    const emailMetrics = getKlaviyoMetrics(today);

    // Add to Email Metrics sheet
    for (const metric of emailMetrics) {
      addEmailRow(emailSheet, {
        date: today,
        campaign: metric.campaign,
        opens: metric.opens,
        clicks: metric.clicks,
        conversions: metric.conversions,
        newSubscribers: metric.subscribers,
        openRate: metric.openRate,
        clickRate: metric.clickRate,
        conversionRate: metric.conversionRate
      });
    }

    Logger.log('Klavioy data pull complete');

  } catch (error) {
    Logger.log('ERROR in fetchKlaviyoData: ' + error);
    sendErrorNotification('Klavioy fetch failed: ' + error);
  }
}

function getKlaviyoMetrics(date) {
  /**
   * IMPORTANT: Get Klavioy API key
   * Steps:
   * 1. Go to Klaviyo → Account → Settings → API Keys
   * 2. Create a new Private API key
   * 3. Replace KLAVIOY_API_KEY above
   */

  try {
    const url = 'https://a.klaviyo.com/api/v1/metrics/?api_key=' + CONFIG.KLAVIOY_API_KEY;

    const options = {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      },
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url, options);

    if (response.getResponseCode() !== 200) {
      Logger.log('Klavioy API Error: ' + response.getContentText());
      return [];
    }

    const result = JSON.parse(response.getContentText());

    // Parse and format email metrics
    const metrics = [];
    if (result.data) {
      for (const item of result.data) {
        metrics.push({
          campaign: item.name,
          opens: item.opens || 0,
          clicks: item.clicks || 0,
          conversions: item.conversions || 0,
          subscribers: item.new_subscribers || 0,
          openRate: item.open_rate || 0,
          clickRate: item.click_rate || 0,
          conversionRate: item.conversion_rate || 0
        });
      }
    }

    return metrics;

  } catch (error) {
    Logger.log('Error fetching Klavioy metrics: ' + error);
    return [];
  }
}

// ============================================================================
// 4. AUTOMATIC CALCULATIONS (7:15 PM CDT)
// ============================================================================

function calculateFormulas() {
  try {
    Logger.log('Calculating formulas...');

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME_DAILY);
    const data = sheet.getDataRange().getValues();

    // Find rows without formulas and add them
    for (let i = 1; i < data.length; i++) {
      const row = data[i];

      // Check if this is a data row (has date, channel, traffic source)
      if (row[0] && row[1] && row[2]) {
        const revenue = row[6] ? parseFloat(row[6]) : 0;
        const orders = row[5] ? parseInt(row[5]) : 0;
        const visitors = row[3] ? parseInt(row[3]) : 0;

        // AOV formula: Revenue ÷ Orders
        const aov = orders > 0 ? revenue / orders : 0;
        if (!row[7]) sheet.getRange(i + 1, 8).setValue(aov);

        // Conversion Rate: (Orders ÷ Visitors) × 100
        const convRate = visitors > 0 ? (orders / visitors) * 100 : 0;
        if (!row[8]) sheet.getRange(i + 1, 9).setValue(convRate);
      }
    }

    // Create daily totals row
    createDailyTotals(sheet);

    // Update Daily Summary tab
    updateDailySummary(SpreadsheetApp.getActiveSpreadsheet());

    Logger.log('Formula calculations complete');

  } catch (error) {
    Logger.log('ERROR in calculateFormulas: ' + error);
  }
}

function createDailyTotals(sheet) {
  // Add a TOTALS row at the end of today's data
  const today = getFormattedDate();
  const data = sheet.getDataRange().getValues();

  let lastRow = 0;
  let totalVisitors = 0;
  let totalSignups = 0;
  let totalOrders = 0;
  let totalRevenue = 0;

  for (let i = data.length - 1; i > 0; i--) {
    if (data[i][0] === today) {
      lastRow = i + 2; // Next empty row
      totalVisitors += parseInt(data[i][3]) || 0;
      totalSignups += parseInt(data[i][4]) || 0;
      totalOrders += parseInt(data[i][5]) || 0;
      totalRevenue += parseFloat(data[i][6]) || 0;
    }
  }

  if (lastRow > 0) {
    const totalsRow = lastRow + 1;
    sheet.getRange(totalsRow, 1).setValue('TOTALS');
    sheet.getRange(totalsRow, 4).setValue(totalVisitors);
    sheet.getRange(totalsRow, 5).setValue(totalSignups);
    sheet.getRange(totalsRow, 6).setValue(totalOrders);
    sheet.getRange(totalsRow, 7).setValue(totalRevenue);
    sheet.getRange(totalsRow, 8).setValue(totalOrders > 0 ? totalRevenue / totalOrders : 0);
    sheet.getRange(totalsRow, 9).setValue(totalVisitors > 0 ? (totalOrders / totalVisitors) * 100 : 0);

    // Format totals row
    sheet.getRange(totalsRow, 1, 1, 9).setFontWeight('bold').setBackground('#E8F4F8');
  }
}

function updateDailySummary(spreadsheet) {
  try {
    const summarySheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME_SUMMARY);
    if (!summarySheet) return;

    const today = getFormattedDate();
    const dailySheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME_DAILY);
    const data = dailySheet.getDataRange().getValues();

    // Calculate daily totals
    let totalVisitors = 0;
    let totalSignups = 0;
    let totalOrders = 0;
    let totalRevenue = 0;
    let topChannel = '';
    let topChannelRevenue = 0;

    const channelRevenue = {};

    for (const row of data) {
      if (row[0] === today && row[1]) {
        totalVisitors += parseInt(row[3]) || 0;
        totalSignups += parseInt(row[4]) || 0;
        totalOrders += parseInt(row[5]) || 0;
        totalRevenue += parseFloat(row[6]) || 0;

        const channel = row[1];
        const revenue = parseFloat(row[6]) || 0;
        channelRevenue[channel] = (channelRevenue[channel] || 0) + revenue;
      }
    }

    // Find top channel
    for (const [channel, revenue] of Object.entries(channelRevenue)) {
      if (revenue > topChannelRevenue) {
        topChannel = channel;
        topChannelRevenue = revenue;
      }
    }

    // Add summary row
    const nextRow = summarySheet.getLastRow() + 1;
    summarySheet.getRange(nextRow, 1).setValue(today);
    summarySheet.getRange(nextRow, 2).setValue(totalVisitors);
    summarySheet.getRange(nextRow, 3).setValue(totalSignups);
    summarySheet.getRange(nextRow, 4).setValue(totalOrders);
    summarySheet.getRange(nextRow, 5).setValue(totalRevenue);
    summarySheet.getRange(nextRow, 6).setValue(totalOrders > 0 ? totalRevenue / totalOrders : 0);
    summarySheet.getRange(nextRow, 7).setValue(topChannel);
    summarySheet.getRange(nextRow, 8).setValue(topChannelRevenue);

  } catch (error) {
    Logger.log('Error updating daily summary: ' + error);
  }
}

// ============================================================================
// 5. WEEKLY ANALYSIS GENERATION (Every Sunday at 10:00 AM CDT)
// ============================================================================

function generateWeeklyAnalysis() {
  try {
    Logger.log('Generating weekly analysis...');

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const dailySheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME_DAILY);
    const weeklySheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME_WEEKLY);

    if (!weeklySheet) {
      Logger.log('Weekly Analysis sheet not found');
      return;
    }

    const weekData = getWeekData(dailySheet);

    // Add week summary row
    const nextRow = weeklySheet.getLastRow() + 1;
    const weekStart = weekData.startDate;
    const weekEnd = weekData.endDate;

    weeklySheet.getRange(nextRow, 1).setValue('Week of ' + weekStart);
    weeklySheet.getRange(nextRow, 2).setValue(weekData.totalVisitors);
    weeklySheet.getRange(nextRow, 3).setValue(weekData.totalSignups);
    weeklySheet.getRange(nextRow, 4).setValue(weekData.totalOrders);
    weeklySheet.getRange(nextRow, 5).setValue(weekData.totalRevenue);
    weeklySheet.getRange(nextRow, 6).setValue(weekData.bestChannel);
    weeklySheet.getRange(nextRow, 7).setValue(weekData.bestChannelRevenue);
    weeklySheet.getRange(nextRow, 8).setValue(weekData.avgConversionRate);

    Logger.log('Weekly analysis complete');

  } catch (error) {
    Logger.log('ERROR in generateWeeklyAnalysis: ' + error);
  }
}

function getWeekData(sheet) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startDate = new Date(today.setDate(today.getDate() - dayOfWeek));

  const data = sheet.getDataRange().getValues();

  const weekData = {
    startDate: Utilities.formatDate(startDate, CONFIG.TIMEZONE, 'yyyy-MM-dd'),
    endDate: getFormattedDate(),
    totalVisitors: 0,
    totalSignups: 0,
    totalOrders: 0,
    totalRevenue: 0,
    bestChannel: '',
    bestChannelRevenue: 0,
    avgConversionRate: 0,
    totalRows: 0,
    conversionRateSum: 0
  };

  const channelRevenue = {};

  for (const row of data) {
    if (row[0] >= startDate && row[1]) {
      weekData.totalVisitors += parseInt(row[3]) || 0;
      weekData.totalSignups += parseInt(row[4]) || 0;
      weekData.totalOrders += parseInt(row[5]) || 0;
      weekData.totalRevenue += parseFloat(row[6]) || 0;

      const convRate = parseFloat(row[8]) || 0;
      if (convRate > 0) {
        weekData.conversionRateSum += convRate;
        weekData.totalRows += 1;
      }

      const channel = row[1];
      const revenue = parseFloat(row[6]) || 0;
      channelRevenue[channel] = (channelRevenue[channel] || 0) + revenue;
    }
  }

  // Find best channel
  for (const [channel, revenue] of Object.entries(channelRevenue)) {
    if (revenue > weekData.bestChannelRevenue) {
      weekData.bestChannel = channel;
      weekData.bestChannelRevenue = revenue;
    }
  }

  weekData.avgConversionRate = weekData.totalRows > 0 ?
    weekData.conversionRateSum / weekData.totalRows : 0;

  return weekData;
}

// ============================================================================
// 6. HELPER FUNCTIONS
// ============================================================================

function addDataRow(sheet, data) {
  const nextRow = sheet.getLastRow() + 1;
  sheet.getRange(nextRow, 1).setValue(data.date);
  sheet.getRange(nextRow, 2).setValue(data.channel);
  sheet.getRange(nextRow, 3).setValue(data.trafficSource);
  sheet.getRange(nextRow, 4).setValue(data.visitors);
  sheet.getRange(nextRow, 5).setValue(data.emailSignups);
  sheet.getRange(nextRow, 6).setValue(data.orders || '');
  sheet.getRange(nextRow, 7).setValue(data.revenue || '');
  sheet.getRange(nextRow, 9).setValue(data.notes);
}

function updateDataRow(sheet, date, data) {
  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === date && values[i][1] === data.channel) {
      // Update orders and revenue
      if (data.orders > 0) {
        sheet.getRange(i + 1, 6).setValue(data.orders);
      }
      if (data.revenue > 0) {
        sheet.getRange(i + 1, 7).setValue(data.revenue);
      }
      return;
    }
  }

  // If no matching row, add new one
  const nextRow = sheet.getLastRow() + 1;
  sheet.getRange(nextRow, 1).setValue(date);
  sheet.getRange(nextRow, 2).setValue(data.channel);
  sheet.getRange(nextRow, 6).setValue(data.orders);
  sheet.getRange(nextRow, 7).setValue(data.revenue);
}

function addEmailRow(sheet, data) {
  const nextRow = sheet.getLastRow() + 1;
  sheet.getRange(nextRow, 1).setValue(data.date);
  sheet.getRange(nextRow, 2).setValue(data.campaign);
  sheet.getRange(nextRow, 3).setValue(data.opens);
  sheet.getRange(nextRow, 4).setValue(data.clicks);
  sheet.getRange(nextRow, 5).setValue(data.conversions);
  sheet.getRange(nextRow, 6).setValue(data.newSubscribers);
  sheet.getRange(nextRow, 7).setValue(data.openRate);
  sheet.getRange(nextRow, 8).setValue(data.clickRate);
  sheet.getRange(nextRow, 9).setValue(data.conversionRate);
}

function getFormattedDate() {
  return Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd');
}

function getGoogleAccessToken(credentials) {
  // This would require additional OAuth setup
  // For now, return placeholder
  Logger.log('NOTE: Google access token setup required');
  return 'PLACEHOLDER_TOKEN';
}

function sendErrorNotification(message) {
  try {
    const email = Session.getEffectiveUser().getEmail();
    MailApp.sendEmail(email, 'Launch Tracking Error', message);
  } catch (error) {
    Logger.log('Could not send notification: ' + error);
  }
}

// ============================================================================
// 7. TRIGGER SETUP FUNCTIONS (Run these once to create triggers)
// ============================================================================

function setupAllTriggers() {
  /**
   * Call this function ONCE to set up all automated triggers
   *
   * It will create:
   * - Daily triggers at 6:00 PM, 6:30 PM, 7:00 PM, 7:15 PM CDT
   * - Weekly trigger on Sunday at 10:00 AM CDT
   */

  // Clear existing triggers first
  clearAllTriggers();

  // Create daily triggers
  ScriptApp.newTrigger('fetchGoogleAnalyticsData')
    .timeBased()
    .atHour(18) // 6:00 PM CDT
    .everyDays(1)
    .create();

  ScriptApp.newTrigger('fetchShopifyData')
    .timeBased()
    .atHour(18)
    .atMinute(30) // 6:30 PM CDT
    .everyDays(1)
    .create();

  ScriptApp.newTrigger('fetchKlaviyoData')
    .timeBased()
    .atHour(19) // 7:00 PM CDT
    .everyDays(1)
    .create();

  ScriptApp.newTrigger('calculateFormulas')
    .timeBased()
    .atHour(19)
    .atMinute(15) // 7:15 PM CDT
    .everyDays(1)
    .create();

  // Weekly trigger (Sunday at 10:00 AM CDT)
  ScriptApp.newTrigger('generateWeeklyAnalysis')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.SUNDAY)
    .atHour(10)
    .create();

  Logger.log('All triggers created successfully');
  sendNotification('Automation Setup Complete', 'All daily and weekly triggers are now active.');
}

function clearAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    ScriptApp.deleteTrigger(trigger);
  }
}

function sendNotification(subject, message) {
  try {
    const email = Session.getEffectiveUser().getEmail();
    MailApp.sendEmail(email, subject, message);
  } catch (error) {
    Logger.log('Could not send notification: ' + error);
  }
}

// ============================================================================
// 8. TEST FUNCTIONS
// ============================================================================

function testSheetSetup() {
  Logger.log('Testing sheet setup...');

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // Check for required sheets
  const requiredSheets = [
    CONFIG.SHEET_NAME_DAILY,
    CONFIG.SHEET_NAME_EMAIL,
    CONFIG.SHEET_NAME_SUMMARY,
    CONFIG.SHEET_NAME_WEEKLY
  ];

  for (const sheetName of requiredSheets) {
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (sheet) {
      Logger.log('✓ ' + sheetName + ' exists');
    } else {
      Logger.log('✗ ' + sheetName + ' MISSING - create it');
    }
  }
}

function testAPIConnections() {
  Logger.log('Testing API connections...');

  // Test Shopify
  try {
    if (CONFIG.SHOPIFY_ACCESS_TOKEN === 'YOUR_SHOPIFY_ACCESS_TOKEN') {
      Logger.log('✗ Shopify: Access token not configured');
    } else {
      const url = 'https://' + CONFIG.SHOPIFY_SHOP_URL + '/admin/api/2024-01/shop.json';
      const options = {
        headers: { 'X-Shopify-Access-Token': CONFIG.SHOPIFY_ACCESS_TOKEN },
        muteHttpExceptions: true
      };
      const response = UrlFetchApp.fetch(url, options);
      Logger.log('Shopify connection: ' + response.getResponseCode());
    }
  } catch (error) {
    Logger.log('✗ Shopify error: ' + error);
  }

  // Test Klavioy
  try {
    if (CONFIG.KLAVIOY_API_KEY === 'YOUR_KLAVIOY_API_KEY') {
      Logger.log('✗ Klavioy: API key not configured');
    } else {
      const url = 'https://a.klaviyo.com/api/v1/account/?api_key=' + CONFIG.KLAVIOY_API_KEY;
      const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
      Logger.log('Klavioy connection: ' + response.getResponseCode());
    }
  } catch (error) {
    Logger.log('✗ Klavioy error: ' + error);
  }
}
