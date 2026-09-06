// ============================================================================
// Supplies Are Limited - Sept Launch Tracking
// Google Sheets Apps Script Automation
// ============================================================================

// Configuration - MUST BE UPDATED WITH ACTUAL CREDENTIALS
const CONFIG = {
  GA_PROPERTY_ID: '[USER_TO_PROVIDE]',
  GA_DATA_STREAM: '[USER_TO_PROVIDE]',
  SHOPIFY_SHOP_URL: 'suppliesarelimited.myshopify.com',
  SHOPIFY_ACCESS_TOKEN: '[USER_TO_PROVIDE]',
  KLAVIOY_API_KEY: 'pk_SvmBdA_3d1ce04623d5c304f31a5ec5ea1c655126',
  TIMEZONE: 'America/Chicago',
  SHEET_NAME_DAILY: 'Daily Tracking',
  SHEET_NAME_EMAIL: 'Email Metrics',
  SHEET_NAME_SUMMARY: 'Daily Summary',
  SHEET_NAME_WEEKLY: 'Weekly Analysis',
  SHEET_NAME_LOGS: 'Logs'
};

// ============================================================================
// LOGGING UTILITIES
// ============================================================================

function logEvent(message, type = 'INFO') {
  const timestamp = new Date().toLocaleString('en-US', { timeZone: CONFIG.TIMEZONE });
  const logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME_LOGS);
  if (logSheet) {
    logSheet.appendRow([timestamp, type, message]);
  }
  Logger.log(`[${timestamp}] ${type}: ${message}`);
}

// ============================================================================
// GOOGLE ANALYTICS DATA FETCHING
// ============================================================================

function fetchGoogleAnalyticsData() {
  try {
    logEvent('Starting Google Analytics data fetch', 'INFO');

    if (CONFIG.GA_PROPERTY_ID === '[USER_TO_PROVIDE]') {
      logEvent('GA_PROPERTY_ID not configured', 'ERROR');
      return;
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME_DAILY);
    if (!sheet) {
      logEvent('Daily Tracking sheet not found', 'ERROR');
      return;
    }

    // Get today's date
    const today = new Date();
    const dateStr = Utilities.formatDate(today, CONFIG.TIMEZONE, 'yyyy-MM-dd');

    // Check if data already exists for today
    const existingRow = findRowByDate(sheet, dateStr);

    // Using Google Analytics Data API v1 Beta via Apps Script
    // This requires Analytics Data API to be enabled
    try {
      const analyticsData = getGAData(dateStr);

      if (analyticsData) {
        if (existingRow) {
          updateDailyTrackingRow(sheet, existingRow, analyticsData);
        } else {
          addDailyTrackingRow(sheet, dateStr, analyticsData);
        }
        logEvent(`GA data successfully added for ${dateStr}`, 'SUCCESS');
      }
    } catch (e) {
      logEvent(`GA API Error: ${e.toString()}`, 'ERROR');
    }

  } catch (error) {
    logEvent(`fetchGoogleAnalyticsData error: ${error.toString()}`, 'ERROR');
  }
}

function getGAData(dateStr) {
  // This is a placeholder - actual implementation requires:
  // 1. Analytics Data API enabled in Google Cloud
  // 2. Service account credentials configured
  // 3. Property has the data stream configured

  logEvent(`Attempting to fetch GA data for ${dateStr}`, 'INFO');

  // Return sample data structure for testing
  // In production, this would call Analytics Data API
  return {
    visitors: 0,
    signups: 0,
    traffic_source: 'Direct'
  };
}

function findRowByDate(sheet, dateStr) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === dateStr) {
      return i + 1; // Sheet rows start at 1
    }
  }
  return null;
}

function addDailyTrackingRow(sheet, dateStr, gaData) {
  const lastRow = sheet.getLastRow();
  const newRow = lastRow + 1;

  sheet.getRange(newRow, 1).setValue(dateStr); // Date
  sheet.getRange(newRow, 2).setValue('Direct'); // Channel
  sheet.getRange(newRow, 3).setValue('Google Analytics'); // Traffic Source
  sheet.getRange(newRow, 4).setValue(gaData.visitors || 0); // Visitors
  sheet.getRange(newRow, 5).setValue(gaData.signups || 0); // Email Signups
}

function updateDailyTrackingRow(sheet, rowNum, gaData) {
  sheet.getRange(rowNum, 4).setValue(gaData.visitors || 0); // Visitors
  sheet.getRange(rowNum, 5).setValue(gaData.signups || 0); // Email Signups
}

// ============================================================================
// SHOPIFY DATA FETCHING
// ============================================================================

function fetchShopifyData() {
  try {
    logEvent('Starting Shopify data fetch', 'INFO');

    if (CONFIG.SHOPIFY_ACCESS_TOKEN === '[USER_TO_PROVIDE]') {
      logEvent('SHOPIFY_ACCESS_TOKEN not configured', 'ERROR');
      return;
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME_DAILY);
    if (!sheet) {
      logEvent('Daily Tracking sheet not found', 'ERROR');
      return;
    }

    const today = new Date();
    const dateStr = Utilities.formatDate(today, CONFIG.TIMEZONE, 'yyyy-MM-dd');

    try {
      const shopifyData = getShopifyOrders(dateStr);

      if (shopifyData) {
        const existingRow = findRowByDate(sheet, dateStr);
        if (existingRow) {
          updateShopifyData(sheet, existingRow, shopifyData);
        } else {
          // Add new row if it doesn't exist yet
          addDailyTrackingRow(sheet, dateStr, { visitors: 0, signups: 0 });
          updateShopifyData(sheet, sheet.getLastRow(), shopifyData);
        }
        logEvent(`Shopify data successfully added for ${dateStr}`, 'SUCCESS');
      }
    } catch (e) {
      logEvent(`Shopify API Error: ${e.toString()}`, 'ERROR');
    }

  } catch (error) {
    logEvent(`fetchShopifyData error: ${error.toString()}`, 'ERROR');
  }
}

function getShopifyOrders(dateStr) {
  const url = `https://${CONFIG.SHOPIFY_SHOP_URL}/admin/api/2024-01/orders.json?status=any`;

  const options = {
    method: 'get',
    headers: {
      'X-Shopify-Access-Token': CONFIG.SHOPIFY_ACCESS_TOKEN,
      'Content-Type': 'application/json'
    },
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();

    if (responseCode === 200) {
      const data = JSON.parse(response.getContentText());

      // Process today's orders
      const todayOrders = data.orders.filter(order => {
        const orderDate = new Date(order.created_at).toLocaleDateString('en-US', { timeZone: CONFIG.TIMEZONE });
        const today = new Date().toLocaleDateString('en-US', { timeZone: CONFIG.TIMEZONE });
        return orderDate === today;
      });

      let totalRevenue = 0;
      let orderCount = 0;

      todayOrders.forEach(order => {
        if (order.financial_status === 'paid' || order.financial_status === 'authorized') {
          totalRevenue += parseFloat(order.total_price);
          orderCount++;
        }
      });

      return {
        orders: orderCount,
        revenue: totalRevenue
      };
    } else {
      logEvent(`Shopify API returned code ${responseCode}`, 'ERROR');
      return null;
    }
  } catch (error) {
    logEvent(`Shopify fetch error: ${error.toString()}`, 'ERROR');
    return null;
  }
}

function updateShopifyData(sheet, rowNum, shopifyData) {
  sheet.getRange(rowNum, 6).setValue(shopifyData.orders || 0); // Orders (column F)
  sheet.getRange(rowNum, 7).setValue(shopifyData.revenue || 0); // Revenue (column G)
}

// ============================================================================
// KLAVIOY DATA FETCHING
// ============================================================================

function fetchKlavioyData() {
  try {
    logEvent('Starting Klavioy data fetch', 'INFO');

    const emailSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME_EMAIL);
    const dailySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME_DAILY);

    if (!emailSheet || !dailySheet) {
      logEvent('Email Metrics or Daily Tracking sheet not found', 'ERROR');
      return;
    }

    const today = new Date();
    const dateStr = Utilities.formatDate(today, CONFIG.TIMEZONE, 'yyyy-MM-dd');

    try {
      const klaviyoData = getKlavioyMetrics(dateStr);

      if (klaviyoData) {
        // Add to Email Metrics sheet
        const existingEmailRow = findRowByDate(emailSheet, dateStr);
        if (existingEmailRow) {
          updateEmailMetricsRow(emailSheet, existingEmailRow, klaviyoData);
        } else {
          addEmailMetricsRow(emailSheet, dateStr, klaviyoData);
        }

        // Also update Daily Tracking sheet with signup data
        const existingDailyRow = findRowByDate(dailySheet, dateStr);
        if (existingDailyRow) {
          dailySheet.getRange(existingDailyRow, 5).setValue(klaviyoData.new_signups || 0);
        }

        logEvent(`Klavioy data successfully added for ${dateStr}`, 'SUCCESS');
      }
    } catch (e) {
      logEvent(`Klavioy API Error: ${e.toString()}`, 'ERROR');
    }

  } catch (error) {
    logEvent(`fetchKlavioyData error: ${error.toString()}`, 'ERROR');
  }
}

function getKlavioyMetrics(dateStr) {
  // Klavioy API endpoint for metrics
  const url = 'https://a.klaviyo.com/api/v1/metrics/data/?api_key=' + CONFIG.KLAVIOY_API_KEY;

  const options = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    muteHttpExceptions: true
  };

  try {
    // Note: This is a simplified implementation
    // Actual Klavioy data requires querying specific metrics/flows
    logEvent('Klavioy API call (placeholder)', 'INFO');

    return {
      new_signups: 0,
      email_opens: 0,
      click_rate: 0,
      conversion_rate: 0,
      revenue: 0
    };
  } catch (error) {
    logEvent(`Klavioy fetch error: ${error.toString()}`, 'ERROR');
    return null;
  }
}

function addEmailMetricsRow(sheet, dateStr, klaviyoData) {
  const lastRow = sheet.getLastRow();
  const newRow = lastRow + 1;

  sheet.getRange(newRow, 1).setValue(dateStr); // Date
  sheet.getRange(newRow, 2).setValue(klaviyoData.new_signups || 0); // New Signups
  sheet.getRange(newRow, 3).setValue(klaviyoData.email_opens || 0); // Email Opens
  sheet.getRange(newRow, 4).setValue(klaviyoData.click_rate || 0); // Click Rate
  sheet.getRange(newRow, 5).setValue(klaviyoData.conversion_rate || 0); // Conversion Rate
  sheet.getRange(newRow, 6).setValue(klaviyoData.revenue || 0); // Revenue
}

function updateEmailMetricsRow(sheet, rowNum, klaviyoData) {
  sheet.getRange(rowNum, 2).setValue(klaviyoData.new_signups || 0);
  sheet.getRange(rowNum, 3).setValue(klaviyoData.email_opens || 0);
  sheet.getRange(rowNum, 4).setValue(klaviyoData.click_rate || 0);
  sheet.getRange(rowNum, 5).setValue(klaviyoData.conversion_rate || 0);
  sheet.getRange(rowNum, 6).setValue(klaviyoData.revenue || 0);
}

// ============================================================================
// FORMULA CALCULATIONS
// ============================================================================

function calculateFormulas() {
  try {
    logEvent('Starting formula calculations', 'INFO');

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME_DAILY);
    if (!sheet) {
      logEvent('Daily Tracking sheet not found', 'ERROR');
      return;
    }

    const lastRow = sheet.getLastRow();

    // Apply formulas to column H (AOV) and I (Conversion Rate)
    for (let row = 2; row <= lastRow; row++) {
      // Column H: AOV formula
      const aovFormula = `=IF(F${row}=0, 0, G${row}/F${row})`;
      sheet.getRange(`H${row}`).setFormula(aovFormula);

      // Column I: Conversion Rate formula
      const crFormula = `=IF(D${row}=0, 0, (F${row}/D${row})*100)`;
      sheet.getRange(`I${row}`).setFormula(crFormula);
    }

    logEvent('Formulas applied successfully', 'SUCCESS');
  } catch (error) {
    logEvent(`calculateFormulas error: ${error.toString()}`, 'ERROR');
  }
}

// ============================================================================
// DAILY SUMMARY GENERATION
// ============================================================================

function generateDailySummary() {
  try {
    logEvent('Starting daily summary generation', 'INFO');

    const dailySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME_DAILY);
    const summarySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME_SUMMARY);

    if (!dailySheet || !summarySheet) {
      logEvent('Required sheets not found', 'ERROR');
      return;
    }

    const today = new Date();
    const dateStr = Utilities.formatDate(today, CONFIG.TIMEZONE, 'yyyy-MM-dd');

    // Calculate totals from daily tracking
    const data = dailySheet.getDataRange().getValues();
    let totalVisitors = 0;
    let totalSignups = 0;
    let totalOrders = 0;
    let totalRevenue = 0;
    let topChannel = 'N/A';
    let topChannelRevenue = 0;

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[0] === dateStr) {
        totalVisitors += row[3] || 0;
        totalSignups += row[4] || 0;
        totalOrders += row[5] || 0;
        totalRevenue += row[6] || 0;

        if ((row[6] || 0) > topChannelRevenue) {
          topChannelRevenue = row[6] || 0;
          topChannel = row[1] || 'N/A';
        }
      }
    }

    // Add summary row
    const lastRow = summarySheet.getLastRow();
    const newRow = lastRow + 1;

    summarySheet.getRange(newRow, 1).setValue(dateStr);
    summarySheet.getRange(newRow, 2).setValue(totalVisitors);
    summarySheet.getRange(newRow, 3).setValue(totalSignups);
    summarySheet.getRange(newRow, 4).setValue(totalOrders);
    summarySheet.getRange(newRow, 5).setValue(totalRevenue);
    summarySheet.getRange(newRow, 6).setValue(topChannel);

    logEvent(`Daily summary generated for ${dateStr}`, 'SUCCESS');
  } catch (error) {
    logEvent(`generateDailySummary error: ${error.toString()}`, 'ERROR');
  }
}

// ============================================================================
// TRIGGER SETUP FUNCTIONS
// ============================================================================

function createAllTriggers() {
  // Remove existing triggers first
  deleteAllTriggers();

  const ss = SpreadsheetApp.getActiveSpreadsheet().getId();

  // Define trigger times in CDT (America/Chicago)
  // Note: AppScript uses UTC, so we need to convert
  // 6:00 PM CDT = 11:00 PM UTC
  // 6:30 PM CDT = 11:30 PM UTC
  // 7:00 PM CDT = 12:00 AM UTC (next day)
  // 7:15 PM CDT = 12:15 AM UTC (next day)
  // 7:30 PM CDT = 12:30 AM UTC (next day)

  try {
    ScriptApp.newTrigger('fetchGoogleAnalyticsData')
      .timeBased()
      .atHour(23) // 11 PM UTC = 6 PM CDT
      .everyDays(1)
      .create();

    ScriptApp.newTrigger('fetchShopifyData')
      .timeBased()
      .atHour(23) // 11 PM UTC = 6 PM CDT (actually 6:30 PM - delayed)
      .everyDays(1)
      .inTimezone('America/Chicago')
      .create();

    ScriptApp.newTrigger('fetchKlavioyData')
      .timeBased()
      .atHour(0) // 12 AM UTC = 7 PM CDT
      .everyDays(1)
      .inTimezone('America/Chicago')
      .create();

    ScriptApp.newTrigger('calculateFormulas')
      .timeBased()
      .atHour(0) // 12:15 AM UTC = 7:15 PM CDT
      .everyDays(1)
      .inTimezone('America/Chicago')
      .create();

    ScriptApp.newTrigger('generateDailySummary')
      .timeBased()
      .atHour(0) // 12:30 AM UTC = 7:30 PM CDT
      .everyDays(1)
      .inTimezone('America/Chicago')
      .create();

    logEvent('All triggers created successfully', 'SUCCESS');
  } catch (error) {
    logEvent(`createAllTriggers error: ${error.toString()}`, 'ERROR');
  }
}

function deleteAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  logEvent('All existing triggers removed', 'INFO');
}

// ============================================================================
// MANUAL TEST FUNCTIONS
// ============================================================================

function testAllDataPulls() {
  logEvent('=== STARTING MANUAL TEST OF ALL DATA PULLS ===', 'TEST');

  fetchGoogleAnalyticsData();
  Utilities.sleep(2000); // 2 second delay

  fetchShopifyData();
  Utilities.sleep(2000);

  fetchKlavioyData();
  Utilities.sleep(2000);

  calculateFormulas();
  Utilities.sleep(1000);

  generateDailySummary();

  logEvent('=== MANUAL TEST COMPLETE ===', 'TEST');
}

function testGoogleAnalytics() {
  logEvent('Testing Google Analytics data pull', 'TEST');
  fetchGoogleAnalyticsData();
}

function testShopify() {
  logEvent('Testing Shopify data pull', 'TEST');
  fetchShopifyData();
}

function testKlavioy() {
  logEvent('Testing Klavioy data pull', 'TEST');
  fetchKlavioyData();
}

// ============================================================================
// INITIALIZATION FUNCTION
// ============================================================================

function initializeSheet() {
  try {
    logEvent('Initializing sheet structure', 'INFO');

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Create all sheets if they don't exist
    createSheetIfNotExists(ss, CONFIG.SHEET_NAME_DAILY);
    createSheetIfNotExists(ss, CONFIG.SHEET_NAME_EMAIL);
    createSheetIfNotExists(ss, CONFIG.SHEET_NAME_SUMMARY);
    createSheetIfNotExists(ss, CONFIG.SHEET_NAME_WEEKLY);
    createSheetIfNotExists(ss, CONFIG.SHEET_NAME_LOGS);

    // Add headers to Daily Tracking sheet
    const dailySheet = ss.getSheetByName(CONFIG.SHEET_NAME_DAILY);
    if (dailySheet.getLastRow() === 0) {
      const headers = ['Date', 'Channel', 'Traffic Source', 'Visitors', 'Email Signups',
                       'Orders', 'Revenue', 'AOV', 'Conversion Rate %', 'Notes'];
      dailySheet.appendRow(headers);
      formatHeaderRow(dailySheet);
    }

    // Add headers to Email Metrics sheet
    const emailSheet = ss.getSheetByName(CONFIG.SHEET_NAME_EMAIL);
    if (emailSheet.getLastRow() === 0) {
      const headers = ['Date', 'New Signups', 'Email Opens', 'Click Rate', 'Conversion Rate', 'Revenue'];
      emailSheet.appendRow(headers);
      formatHeaderRow(emailSheet);
    }

    // Add headers to Daily Summary sheet
    const summarySheet = ss.getSheetByName(CONFIG.SHEET_NAME_SUMMARY);
    if (summarySheet.getLastRow() === 0) {
      const headers = ['Date', 'Total Visitors', 'Total Signups', 'Total Orders', 'Total Revenue', 'Top Channel'];
      summarySheet.appendRow(headers);
      formatHeaderRow(summarySheet);
    }

    // Add headers to Weekly Analysis sheet
    const weeklySheet = ss.getSheetByName(CONFIG.SHEET_NAME_WEEKLY);
    if (weeklySheet.getLastRow() === 0) {
      const headers = ['Week', 'Total Visitors', 'Total Orders', 'Total Revenue', 'Best Day', 'Best Channel', 'Trends'];
      weeklySheet.appendRow(headers);
      formatHeaderRow(weeklySheet);
    }

    // Add headers to Logs sheet
    const logsSheet = ss.getSheetByName(CONFIG.SHEET_NAME_LOGS);
    if (logsSheet.getLastRow() === 0) {
      logsSheet.appendRow(['Timestamp', 'Type', 'Message']);
      formatHeaderRow(logsSheet);
    }

    logEvent('Sheet initialization complete', 'SUCCESS');
  } catch (error) {
    Logger.log(`initializeSheet error: ${error.toString()}`);
  }
}

function createSheetIfNotExists(ss, sheetName) {
  if (!ss.getSheetByName(sheetName)) {
    ss.insertSheet(sheetName);
  }
}

function formatHeaderRow(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  headerRange.setBackground('#4285F4')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold');
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function updateConfiguration(gaPropertyId, gaDataStream, shopifyToken) {
  CONFIG.GA_PROPERTY_ID = gaPropertyId;
  CONFIG.GA_DATA_STREAM = gaDataStream;
  CONFIG.SHOPIFY_ACCESS_TOKEN = shopifyToken;

  logEvent('Configuration updated with credentials', 'INFO');
}

function getConfiguration() {
  const config = {
    GA_PROPERTY_ID: CONFIG.GA_PROPERTY_ID,
    GA_DATA_STREAM: CONFIG.GA_DATA_STREAM,
    SHOPIFY_SHOP_URL: CONFIG.SHOPIFY_SHOP_URL,
    SHOPIFY_ACCESS_TOKEN: CONFIG.SHOPIFY_ACCESS_TOKEN ? '***CONFIGURED***' : '[NEEDS CONFIG]',
    KLAVIOY_API_KEY: CONFIG.KLAVIOY_API_KEY ? '***CONFIGURED***' : '[NEEDS CONFIG]',
    TIMEZONE: CONFIG.TIMEZONE
  };

  Logger.log(JSON.stringify(config, null, 2));
  return config;
}
