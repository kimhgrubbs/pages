/**
 * SUPPLIES ARE LIMITED - AUTOMATED PERFORMANCE REPORTING
 * Google Apps Script for Daily & Weekly Email Reports
 *
 * Deployment:
 * 1. Create Google Sheet: "Supplies Are Limited - Sept 2026 Performance Dashboard"
 * 2. Create tabs: Daily Data, Daily Totals, Channel Performance, Alerts, Historical Trends
 * 3. Paste this code into Apps Script Editor (Extensions → Apps Script)
 * 4. Click Run to authorize
 * 5. Set up triggers:
 *    - generateDailyReport at 7:30pm CDT daily
 *    - generateWeeklyReport at 10am CDT on Sundays
 *    - checkAnomalies every 6 hours
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

var SHEET_NAME = "Supplies Are Limited - Sept 2026 Performance Dashboard";
var REPORT_EMAIL = "kimhgrubbs@gmail.com";
var TIMEZONE = "America/Chicago";

// Tab names
var TABS = {
  DAILY_DATA: "Daily Data",
  DAILY_TOTALS: "Daily Totals",
  CHANNEL_PERFORMANCE: "Channel Performance",
  ALERTS: "Alerts & Anomalies",
  HISTORICAL: "Historical Trends"
};

// Industry benchmarks (premium/soft survivalism)
var BENCHMARKS = {
  LINKEDIN: { conversion: 0.015, clickRate: 0.03, minVisitors: 30 },
  SUBSTACK: { conversion: 0.025, openRate: 0.25, clickRate: 0.07 },
  EMAIL: { conversion: 0.035, openRate: 0.28, clickRate: 0.08 },
  REDDIT: { conversion: 0.005, minVisitors: 20 },
  OVERALL_AOV: 2199
};

// Alert thresholds
var ALERTS = {
  REVENUE_DROP_PERCENT: 30,
  EMAIL_OPEN_RATE_THRESHOLD: 10,
  EMAIL_CLICK_RATE_THRESHOLD: 1,
  HIGH_TRAFFIC_NO_CONVERSION_THRESHOLD: 50,
  ANOMALY_SPIKE_MULTIPLIER: 3
};

// ============================================================================
// MAIN FUNCTIONS - CALLED BY TRIGGERS
// ============================================================================

/**
 * DAILY REPORT (7:30pm CDT)
 * Generates and sends daily performance summary email
 */
function generateDailyReport() {
  try {
    var ss = SpreadsheetApp.openByName(SHEET_NAME);
    var today = Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd");

    // Get today's data
    var dailyData = getTodaysDailyData(ss, today);
    if (!dailyData) {
      Logger.log("No data for today (" + today + "), skipping report");
      return;
    }

    var dailyTotals = getTodaysDailyTotals(ss, today);
    var previousDayTotals = getPreviousDayTotals(ss, today);

    // Get channel analysis
    var channelAnalysis = analyzeChannels(ss, today);

    // Generate insights
    var insights = generateDailyInsights(dailyTotals, previousDayTotals, channelAnalysis);

    // Generate recommendations
    var recommendations = generateDailyRecommendations(channelAnalysis);

    // Build email
    var emailBody = buildDailyReportEmail(today, dailyTotals, previousDayTotals, channelAnalysis, insights, recommendations);

    // Send email
    GmailApp.sendEmail(
      REPORT_EMAIL,
      "[Supplies Are Limited] Daily Performance Report - " + today,
      emailBody,
      {
        noReply: false,
        from: Session.getActiveUser().getEmail()
      }
    );

    Logger.log("Daily report sent for " + today);

  } catch(e) {
    Logger.log("ERROR in generateDailyReport: " + e);
    sendErrorAlert("Daily Report Generation Failed", e.toString());
  }
}

/**
 * WEEKLY REPORT (Sunday 10am CDT)
 * Generates and sends comprehensive weekly analysis
 */
function generateWeeklyReport() {
  try {
    var ss = SpreadsheetApp.openByName(SHEET_NAME);
    var today = new Date();
    var weekStart = getWeekStart(today);
    var weekEnd = getWeekEnd(today);

    var weekStartStr = Utilities.formatDate(weekStart, TIMEZONE, "yyyy-MM-dd");
    var weekEndStr = Utilities.formatDate(weekEnd, TIMEZONE, "yyyy-MM-dd");

    // Get weekly data
    var weeklyData = getWeeklyData(ss, weekStartStr, weekEndStr);
    if (!weeklyData || weeklyData.totalVisitors === 0) {
      Logger.log("No data for week, skipping weekly report");
      return;
    }

    var previousWeekData = getPreviousWeekData(ss, weekStartStr);

    // Analyze channels for the week
    var weeklyChannelAnalysis = analyzeWeeklyChannels(ss, weekStartStr, weekEndStr);

    // Get trend analysis
    var trendAnalysis = analyzeWeeklyTrends(ss, weekStartStr, weekEndStr);

    // Generate recommendations
    var weeklyRecommendations = generateWeeklyRecommendations(weeklyChannelAnalysis, trendAnalysis);

    // Generate projections
    var projections = generateProjections(weeklyData, previousWeekData);

    // Build email
    var emailBody = buildWeeklyReportEmail(
      weekStartStr,
      weekEndStr,
      weeklyData,
      previousWeekData,
      weeklyChannelAnalysis,
      trendAnalysis,
      weeklyRecommendations,
      projections
    );

    // Send email
    GmailApp.sendEmail(
      REPORT_EMAIL,
      "[Supplies Are Limited] Weekly Performance Report - " + weekStartStr + " to " + weekEndStr,
      emailBody,
      {
        noReply: false,
        from: Session.getActiveUser().getEmail()
      }
    );

    // Save to Historical Trends tab
    saveWeeklyToHistory(ss, weekStartStr, weekEndStr, weeklyData);

    Logger.log("Weekly report sent for week " + weekStartStr + " to " + weekEndStr);

  } catch(e) {
    Logger.log("ERROR in generateWeeklyReport: " + e);
    sendErrorAlert("Weekly Report Generation Failed", e.toString());
  }
}

/**
 * CHECK ANOMALIES (Every 6 hours)
 * Detects and flags unusual patterns
 */
function checkAnomalies() {
  try {
    var ss = SpreadsheetApp.openByName(SHEET_NAME);
    var today = Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd");

    var alerts = [];

    // Check 1: Revenue drop
    var revenueDrop = checkRevenueDrop(ss, today);
    if (revenueDrop) alerts.push(revenueDrop);

    // Check 2: Email deliverability issues
    var emailIssue = checkEmailDeliverability(ss, today);
    if (emailIssue) alerts.push(emailIssue);

    // Check 3: High traffic, zero conversions
    var trafficAnomaly = checkHighTrafficNoConversion(ss, today);
    if (trafficAnomaly) alerts.push(...trafficAnomaly);

    // Check 4: Positive anomalies (spikes)
    var positiveAnomalies = checkPositiveAnomalies(ss, today);
    if (positiveAnomalies) alerts.push(...positiveAnomalies);

    // Log alerts to sheet
    if (alerts.length > 0) {
      logAlertsToSheet(ss, alerts);
      sendAnomalyAlert(alerts);
    }

  } catch(e) {
    Logger.log("ERROR in checkAnomalies: " + e);
  }
}

// ============================================================================
// DATA RETRIEVAL FUNCTIONS
// ============================================================================

function getTodaysDailyData(ss, date) {
  var sheet = ss.getSheetByName(TABS.DAILY_DATA);
  var data = sheet.getDataRange().getValues();

  var todayData = [];
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] && Utilities.formatDate(new Date(data[i][0]), TIMEZONE, "yyyy-MM-dd") === date) {
      todayData.push({
        date: data[i][0],
        channel: data[i][1],
        source: data[i][2],
        visitors: data[i][3],
        signups: data[i][4],
        orders: data[i][5],
        revenue: data[i][6],
        aov: data[i][7],
        conversionRate: data[i][8],
        emailOpenRate: data[i][9],
        emailClickRate: data[i][10],
        notes: data[i][11]
      });
    }
  }

  return todayData.length > 0 ? todayData : null;
}

function getTodaysDailyTotals(ss, date) {
  var sheet = ss.getSheetByName(TABS.DAILY_TOTALS);
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] && Utilities.formatDate(new Date(data[i][0]), TIMEZONE, "yyyy-MM-dd") === date) {
      return {
        date: date,
        totalVisitors: data[i][1],
        totalSignups: data[i][2],
        totalOrders: data[i][3],
        totalRevenue: data[i][4],
        conversionRate: data[i][5],
        aov: data[i][6],
        bestChannel: data[i][7],
        worstChannel: data[i][8],
        trend: data[i][9],
        notes: data[i][10]
      };
    }
  }

  return null;
}

function getPreviousDayTotals(ss, date) {
  var sheet = ss.getSheetByName(TABS.DAILY_TOTALS);
  var data = sheet.getDataRange().getValues();

  var currentDate = new Date(date);
  var previousDate = new Date(currentDate.getTime() - 24*60*60*1000);
  var previousDateStr = Utilities.formatDate(previousDate, TIMEZONE, "yyyy-MM-dd");

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] && Utilities.formatDate(new Date(data[i][0]), TIMEZONE, "yyyy-MM-dd") === previousDateStr) {
      return {
        totalRevenue: data[i][4],
        totalOrders: data[i][3]
      };
    }
  }

  return null;
}

function getWeeklyData(ss, weekStartStr, weekEndStr) {
  var sheet = ss.getSheetByName(TABS.DAILY_DATA);
  var data = sheet.getDataRange().getValues();

  var weekStart = new Date(weekStartStr);
  var weekEnd = new Date(weekEndStr);

  var totals = {
    totalVisitors: 0,
    totalSignups: 0,
    totalOrders: 0,
    totalRevenue: 0
  };

  for (var i = 1; i < data.length; i++) {
    var rowDate = new Date(data[i][0]);
    if (rowDate >= weekStart && rowDate <= weekEnd) {
      totals.totalVisitors += (data[i][3] || 0);
      totals.totalSignups += (data[i][4] || 0);
      totals.totalOrders += (data[i][5] || 0);
      totals.totalRevenue += (data[i][6] || 0);
    }
  }

  if (totals.totalVisitors === 0) return null;

  totals.conversionRate = (totals.totalOrders / totals.totalVisitors) * 100;
  totals.aov = totals.totalOrders > 0 ? totals.totalRevenue / totals.totalOrders : 0;

  return totals;
}

function getPreviousWeekData(ss, weekStartStr) {
  var currentWeekStart = new Date(weekStartStr);
  var prevWeekStart = new Date(currentWeekStart.getTime() - 7*24*60*60*1000);
  var prevWeekEnd = new Date(prevWeekStart.getTime() + 6*24*60*60*1000);

  var prevWeekStartStr = Utilities.formatDate(prevWeekStart, TIMEZONE, "yyyy-MM-dd");
  var prevWeekEndStr = Utilities.formatDate(prevWeekEnd, TIMEZONE, "yyyy-MM-dd");

  return getWeeklyData(ss, prevWeekStartStr, prevWeekEndStr);
}

// ============================================================================
// ANALYSIS FUNCTIONS
// ============================================================================

function analyzeChannels(ss, date) {
  var sheet = ss.getSheetByName(TABS.DAILY_DATA);
  var data = sheet.getDataRange().getValues();

  var channels = {};

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] && Utilities.formatDate(new Date(data[i][0]), TIMEZONE, "yyyy-MM-dd") === date) {
      var channel = data[i][1];
      if (!channels[channel]) {
        channels[channel] = {
          channel: channel,
          visitors: 0,
          signups: 0,
          orders: 0,
          revenue: 0,
          conversionRate: 0
        };
      }
      channels[channel].visitors += (data[i][3] || 0);
      channels[channel].signups += (data[i][4] || 0);
      channels[channel].orders += (data[i][5] || 0);
      channels[channel].revenue += (data[i][6] || 0);
    }
  }

  // Calculate rates
  for (var ch in channels) {
    if (channels[ch].visitors > 0) {
      channels[ch].conversionRate = (channels[ch].orders / channels[ch].visitors) * 100;
      channels[ch].aov = channels[ch].orders > 0 ? channels[ch].revenue / channels[ch].orders : 0;
    }
  }

  return channels;
}

function analyzeWeeklyChannels(ss, weekStartStr, weekEndStr) {
  var sheet = ss.getSheetByName(TABS.DAILY_DATA);
  var data = sheet.getDataRange().getValues();

  var weekStart = new Date(weekStartStr);
  var weekEnd = new Date(weekEndStr);

  var channels = {};

  for (var i = 1; i < data.length; i++) {
    var rowDate = new Date(data[i][0]);
    if (rowDate >= weekStart && rowDate <= weekEnd) {
      var channel = data[i][1];
      if (!channels[channel]) {
        channels[channel] = {
          channel: channel,
          visitors: 0,
          signups: 0,
          orders: 0,
          revenue: 0
        };
      }
      channels[channel].visitors += (data[i][3] || 0);
      channels[channel].signups += (data[i][4] || 0);
      channels[channel].orders += (data[i][5] || 0);
      channels[channel].revenue += (data[i][6] || 0);
    }
  }

  // Calculate rates and sort by revenue
  var channelArray = [];
  for (var ch in channels) {
    if (channels[ch].visitors > 0) {
      channels[ch].conversionRate = (channels[ch].orders / channels[ch].visitors) * 100;
      channels[ch].aov = channels[ch].orders > 0 ? channels[ch].revenue / channels[ch].orders : 0;
      channelArray.push(channels[ch]);
    }
  }

  channelArray.sort(function(a, b) { return b.revenue - a.revenue; });

  return channelArray;
}

function analyzeWeeklyTrends(ss, weekStartStr, weekEndStr) {
  var sheet = ss.getSheetByName(TABS.DAILY_TOTALS);
  var data = sheet.getDataRange().getValues();

  var weekStart = new Date(weekStartStr);
  var weekEnd = new Date(weekEndStr);

  var dailyRevenue = [];
  var totalRevenue = 0;

  for (var i = 1; i < data.length; i++) {
    var rowDate = new Date(data[i][0]);
    if (rowDate >= weekStart && rowDate <= weekEnd) {
      var revenue = data[i][4] || 0;
      dailyRevenue.push({
        date: Utilities.formatDate(rowDate, TIMEZONE, "MMM dd"),
        revenue: revenue
      });
      totalRevenue += revenue;
    }
  }

  // Determine trend
  var trend = "flat";
  if (dailyRevenue.length >= 2) {
    var firstHalf = 0, secondHalf = 0;
    var mid = Math.floor(dailyRevenue.length / 2);

    for (var i = 0; i < mid; i++) {
      firstHalf += dailyRevenue[i].revenue;
    }
    for (var i = mid; i < dailyRevenue.length; i++) {
      secondHalf += dailyRevenue[i].revenue;
    }

    if (secondHalf > firstHalf * 1.1) trend = "accelerating";
    else if (secondHalf < firstHalf * 0.9) trend = "declining";
  }

  return {
    dailyBreakdown: dailyRevenue,
    totalRevenue: totalRevenue,
    trend: trend
  };
}

// ============================================================================
// INSIGHT & RECOMMENDATION GENERATION
// ============================================================================

function generateDailyInsights(dailyTotals, previousDayTotals, channelAnalysis) {
  var insights = [];

  // Insight 1: Day performance vs previous day
  if (previousDayTotals) {
    var revenueDiff = dailyTotals.totalRevenue - previousDayTotals.totalRevenue;
    var revenueDiffPercent = (revenueDiff / previousDayTotals.totalRevenue) * 100;

    if (revenueDiff > 0) {
      insights.push("✓ Revenue up " + revenueDiffPercent.toFixed(1) + "% vs previous day");
    } else if (revenueDiff < 0) {
      insights.push("⚠ Revenue down " + Math.abs(revenueDiffPercent).toFixed(1) + "% vs previous day");
    } else {
      insights.push("→ Revenue flat vs previous day");
    }
  }

  // Insight 2: Email signup rate
  if (dailyTotals.totalVisitors > 0) {
    var signupRate = (dailyTotals.totalSignups / dailyTotals.totalVisitors) * 100;
    if (signupRate > 8) {
      insights.push("✓ Email signup rate " + signupRate.toFixed(1) + "% is excellent");
    }
  }

  // Insight 3: Top channel insight
  var topChannel = null;
  var topRevenue = 0;
  for (var ch in channelAnalysis) {
    if (channelAnalysis[ch].revenue > topRevenue) {
      topRevenue = channelAnalysis[ch].revenue;
      topChannel = channelAnalysis[ch];
    }
  }

  if (topChannel) {
    var topChannelPercent = (topChannel.revenue / dailyTotals.totalRevenue) * 100;
    insights.push("🏆 " + topChannel.channel + " driving " + topChannelPercent.toFixed(0) + "% of revenue");
  }

  // Insight 4: Conversion rate vs benchmark
  if (dailyTotals.conversionRate >= 1.5) {
    insights.push("✓ Overall conversion rate " + dailyTotals.conversionRate.toFixed(2) + "% is strong");
  }

  return insights;
}

function generateDailyRecommendations(channelAnalysis) {
  var recommendations = [];

  for (var ch in channelAnalysis) {
    var channel = channelAnalysis[ch];
    var benchmark = getBenchmarkForChannel(channel.channel);

    if (!benchmark) continue;

    // Check conversion rate vs benchmark
    if (channel.conversionRate < benchmark.conversion * 100 * 0.8) {
      recommendations.push({
        channel: channel.channel,
        issue: "Below benchmark conversion rate",
        action: "Test new messaging or higher-intent targeting",
        priority: "Medium"
      });
    }

    // Check for zero conversions
    if (channel.visitors > 50 && channel.orders === 0) {
      recommendations.push({
        channel: channel.channel,
        issue: "High traffic but zero conversions",
        action: "Check for broken checkout link or landing page optimization",
        priority: "High"
      });
    }
  }

  return recommendations;
}

function generateWeeklyRecommendations(channelAnalysis, trendAnalysis) {
  var recommendations = [];

  // Recommendation 1: Top channel should increase
  if (channelAnalysis.length > 0) {
    var topChannel = channelAnalysis[0];
    var benchmark = getBenchmarkForChannel(topChannel.channel);

    if (topChannel.conversionRate > benchmark.conversion * 100) {
      recommendations.push({
        channel: topChannel.channel,
        title: "DOUBLE DOWN: " + topChannel.channel.toUpperCase(),
        action: "Increase frequency or investment in " + topChannel.channel,
        reason: topChannel.conversionRate.toFixed(2) + "% conversion rate (exceeds benchmark)",
        expectedImpact: "+15-25% revenue"
      });
    }
  }

  // Recommendation 2: Underperforming channels
  if (channelAnalysis.length > 1) {
    var worstChannel = channelAnalysis[channelAnalysis.length - 1];
    var benchmark = getBenchmarkForChannel(worstChannel.channel);

    if (worstChannel.conversionRate < benchmark.conversion * 100 * 0.5) {
      recommendations.push({
        channel: worstChannel.channel,
        title: "OPTIMIZE: " + worstChannel.channel.toUpperCase(),
        action: "Test new messaging or pause if ROI negative",
        reason: worstChannel.conversionRate.toFixed(2) + "% conversion rate (well below benchmark)",
        expectedImpact: "Potential to 2x conversion rate"
      });
    }
  }

  // Recommendation 3: Bundle offers
  recommendations.push({
    title: "TEST BUNDLE OFFERS",
    action: "Create F5000 + Berkey Water Kit bundle at $4,999",
    reason: "Increase AOV while providing customer value",
    expectedImpact: "Increase AOV 20-40%, test premium positioning"
  });

  return recommendations;
}

function generateProjections(weeklyData, previousWeekData) {
  var projections = {};

  if (previousWeekData) {
    var growthRate = (weeklyData.totalRevenue - previousWeekData.totalRevenue) / previousWeekData.totalRevenue;
    projections.conservative = previousWeekData.totalRevenue * (1 + growthRate);
    projections.optimistic = weeklyData.totalRevenue * 1.25;
  } else {
    projections.conservative = weeklyData.totalRevenue;
    projections.optimistic = weeklyData.totalRevenue * 1.2;
  }

  return projections;
}

// ============================================================================
// EMAIL BUILDING FUNCTIONS
// ============================================================================

function buildDailyReportEmail(date, dailyTotals, previousDayTotals, channelAnalysis, insights, recommendations) {
  var email = "";

  email += "SUPPLIES ARE LIMITED — DAILY PERFORMANCE SUMMARY\n";
  email += Utilities.formatDate(new Date(date), TIMEZONE, "EEEE, MMMM d, yyyy") + "\n\n";
  email += "═══════════════════════════════════════════════════════════════\n\n";

  // Metrics
  email += "📊 TODAY'S METRICS\n\n";
  email += "Total Visitors: " + dailyTotals.totalVisitors + "\n";
  email += "Email Signups: " + dailyTotals.totalSignups + " (" + ((dailyTotals.totalSignups/dailyTotals.totalVisitors)*100).toFixed(1) + "% signup rate)\n";
  email += "Orders: " + dailyTotals.totalOrders + "\n";
  email += "Total Revenue: $" + dailyTotals.totalRevenue.toFixed(2) + "\n";
  email += "Conversion Rate: " + dailyTotals.conversionRate.toFixed(2) + "%\n";
  email += "AOV: $" + dailyTotals.aov.toFixed(2) + "\n\n";

  // Best channel
  email += "═══════════════════════════════════════════════════════════════\n\n";
  email += "🏆 BEST PERFORMING CHANNEL\n\n";
  var bestChannel = null;
  var bestRevenue = 0;
  for (var ch in channelAnalysis) {
    if (channelAnalysis[ch].revenue > bestRevenue) {
      bestRevenue = channelAnalysis[ch].revenue;
      bestChannel = channelAnalysis[ch];
    }
  }

  if (bestChannel) {
    email += "Channel: " + bestChannel.channel + "\n";
    email += "Revenue: $" + bestChannel.revenue.toFixed(2) + " (" + ((bestChannel.revenue/dailyTotals.totalRevenue)*100).toFixed(0) + "% of daily total)\n";
    email += "Conversion Rate: " + bestChannel.conversionRate.toFixed(2) + "%\n";
    email += "Visitors: " + bestChannel.visitors + "\n\n";
  }

  // Worst channel
  email += "═══════════════════════════════════════════════════════════════\n\n";
  email += "📉 WORST PERFORMING CHANNEL\n\n";
  var worstChannel = null;
  var worstConv = 999;
  for (var ch in channelAnalysis) {
    if (channelAnalysis[ch].conversionRate < worstConv && channelAnalysis[ch].visitors > 10) {
      worstConv = channelAnalysis[ch].conversionRate;
      worstChannel = channelAnalysis[ch];
    }
  }

  if (worstChannel) {
    email += "Channel: " + worstChannel.channel + "\n";
    email += "Revenue: $" + worstChannel.revenue.toFixed(2) + "\n";
    email += "Conversion Rate: " + worstChannel.conversionRate.toFixed(2) + "%\n";
    email += "Visitors: " + worstChannel.visitors + "\n\n";
  }

  // Comparison
  email += "═══════════════════════════════════════════════════════════════\n\n";
  email += "📈 COMPARISON TO PREVIOUS DAY\n\n";
  if (previousDayTotals) {
    var revenueDiff = dailyTotals.totalRevenue - previousDayTotals.totalRevenue;
    var revenueDiffPercent = (revenueDiff / previousDayTotals.totalRevenue) * 100;
    email += "Previous Day Revenue: $" + previousDayTotals.totalRevenue.toFixed(2) + "\n";
    email += "Today Revenue: $" + dailyTotals.totalRevenue.toFixed(2) + "\n";
    email += "Difference: $" + revenueDiff.toFixed(2) + " (" + revenueDiffPercent.toFixed(1) + "%)\n";
    email += "Trend: " + (revenueDiff > 0 ? "↗ UP" : revenueDiff < 0 ? "↘ DOWN" : "→ FLAT") + "\n\n";
  } else {
    email += "Previous Day: N/A (Launch Day)\n\n";
  }

  // Insights
  email += "═══════════════════════════════════════════════════════════════\n\n";
  email += "💡 KEY INSIGHTS & OBSERVATIONS\n\n";
  for (var i = 0; i < insights.length; i++) {
    email += insights[i] + "\n";
  }
  email += "\n";

  // Recommendations
  if (recommendations.length > 0) {
    email += "═══════════════════════════════════════════════════════════════\n\n";
    email += "✅ ACTION ITEMS FOR TOMORROW\n\n";
    for (var i = 0; i < recommendations.length; i++) {
      email += (i+1) + ". " + recommendations[i].channel + ": " + recommendations[i].action + "\n";
    }
    email += "\n";
  }

  email += "═══════════════════════════════════════════════════════════════\n\n";
  email += "🚀 Next Report: Tomorrow at 7:30pm CDT\n\n";
  email += "Questions? Check the Supplies Are Limited Performance Dashboard\n";

  return email;
}

function buildWeeklyReportEmail(weekStart, weekEnd, weeklyData, previousWeekData, channelAnalysis, trendAnalysis, recommendations, projections) {
  var email = "";

  email += "SUPPLIES ARE LIMITED — WEEK " + getWeekNumber(new Date(weekStart)) + " PERFORMANCE ANALYSIS\n";
  email += weekStart + " to " + weekEnd + "\n\n";
  email += "═══════════════════════════════════════════════════════════════\n\n";

  // Weekly totals
  email += "📊 WEEK TOTALS\n\n";
  email += "Total Visitors: " + weeklyData.totalVisitors + "\n";
  email += "Email Signups: " + weeklyData.totalSignups + " (" + ((weeklyData.totalSignups/weeklyData.totalVisitors)*100).toFixed(1) + "% signup rate)\n";
  email += "Total Orders: " + weeklyData.totalOrders + "\n";
  email += "Total Revenue: $" + weeklyData.totalRevenue.toFixed(2) + "\n";
  email += "Conversion Rate: " + weeklyData.conversionRate.toFixed(2) + "%\n";
  email += "AOV: $" + weeklyData.aov.toFixed(2) + "\n\n";

  // Channel ranking
  email += "═══════════════════════════════════════════════════════════════\n\n";
  email += "🏆 CHANNEL PERFORMANCE RANKING (by Revenue)\n\n";
  for (var i = 0; i < channelAnalysis.length; i++) {
    var medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "";
    var ch = channelAnalysis[i];
    email += (i+1) + ". " + medal + " " + ch.channel.toUpperCase() + "\n";
    email += "   Visitors: " + ch.visitors + " | Orders: " + ch.orders + " | Revenue: $" + ch.revenue.toFixed(2) + "\n";
    email += "   Conversion Rate: " + ch.conversionRate.toFixed(2) + "%\n\n";
  }

  // Benchmarking
  email += "═══════════════════════════════════════════════════════════════\n\n";
  email += "💯 COMPETITIVE BENCHMARKING\n\n";
  email += "Channel           | Your Performance | Status\n";
  email += "─────────────────────────────────────────────\n";
  for (var i = 0; i < channelAnalysis.length; i++) {
    var ch = channelAnalysis[i];
    var benchmark = getBenchmarkForChannel(ch.channel);
    var status = ch.conversionRate >= benchmark.conversion * 100 ? "✓" : "⚠";
    email += ch.channel + " Conv Rate | " + ch.conversionRate.toFixed(2) + "% | " + status + "\n";
  }
  email += "\n";

  // Trend analysis
  email += "═══════════════════════════════════════════════════════════════\n\n";
  email += "📈 TREND ANALYSIS: Growth " + trendAnalysis.trend.toUpperCase() + "\n\n";
  email += "Daily Breakdown:\n";
  for (var i = 0; i < trendAnalysis.dailyBreakdown.length; i++) {
    var day = trendAnalysis.dailyBreakdown[i];
    email += day.date + ": $" + day.revenue.toFixed(2) + "\n";
  }
  email += "\n";

  // Recommendations
  if (recommendations.length > 0) {
    email += "═══════════════════════════════════════════════════════════════\n\n";
    email += "🎯 RECOMMENDATIONS FOR NEXT WEEK\n\n";
    for (var i = 0; i < recommendations.length; i++) {
      var rec = recommendations[i];
      email += (i+1) + ". " + rec.title + "\n";
      if (rec.action) email += "   Action: " + rec.action + "\n";
      if (rec.reason) email += "   Reason: " + rec.reason + "\n";
      if (rec.expectedImpact) email += "   Expected Impact: " + rec.expectedImpact + "\n";
      email += "\n";
    }
  }

  // Projections
  email += "═══════════════════════════════════════════════════════════════\n\n";
  email += "📊 NEXT WEEK PROJECTIONS\n\n";
  email += "Conservative: $" + projections.conservative.toFixed(2) + "\n";
  email += "Optimistic: $" + projections.optimistic.toFixed(2) + "\n\n";

  email += "═══════════════════════════════════════════════════════════════\n\n";
  email += "🚀 Next Report: Next Sunday at 10am CDT\n";
  email += "Daily Reports: Every day at 7:30pm CDT\n\n";
  email += "Questions? Check the Supplies Are Limited Performance Dashboard\n";

  return email;
}

// ============================================================================
// ALERT & ANOMALY DETECTION
// ============================================================================

function checkRevenueDrop(ss, date) {
  var todayTotals = getTodaysDailyTotals(ss, date);
  var yesterdayTotals = getPreviousDayTotals(ss, date);

  if (!todayTotals || !yesterdayTotals) return null;

  var revenueDrop = ((yesterdayTotals.totalRevenue - todayTotals.totalRevenue) / yesterdayTotals.totalRevenue) * 100;

  if (revenueDrop > ALERTS.REVENUE_DROP_PERCENT) {
    return {
      type: "Revenue Drop",
      severity: "HIGH",
      date: date,
      details: "Revenue dropped " + revenueDrop.toFixed(1) + "% (Yesterday: $" + yesterdayTotals.totalRevenue.toFixed(2) + ", Today: $" + todayTotals.totalRevenue.toFixed(2) + ")",
      action: "Check for: broken links, checkout errors, email deliverability issues"
    };
  }

  return null;
}

function checkEmailDeliverability(ss, date) {
  var dailyData = getTodaysDailyData(ss, date);
  if (!dailyData) return null;

  for (var i = 0; i < dailyData.length; i++) {
    var row = dailyData[i];
    if (row.channel === "Email" && row.emailOpenRate && row.emailOpenRate < ALERTS.EMAIL_OPEN_RATE_THRESHOLD) {
      return {
        type: "Email Deliverability Issue",
        severity: "MEDIUM",
        date: date,
        details: "Email open rate " + row.emailOpenRate.toFixed(1) + "% (threshold: " + ALERTS.EMAIL_OPEN_RATE_THRESHOLD + "%)",
        action: "Check: spam folder, subject line, send time"
      };
    }
  }

  return null;
}

function checkHighTrafficNoConversion(ss, date) {
  var dailyData = getTodaysDailyData(ss, date);
  if (!dailyData) return [];

  var alerts = [];

  for (var i = 0; i < dailyData.length; i++) {
    var row = dailyData[i];
    if (row.visitors > ALERTS.HIGH_TRAFFIC_NO_CONVERSION_THRESHOLD && row.orders === 0) {
      alerts.push({
        type: "High Traffic, Zero Conversions",
        severity: "MEDIUM",
        date: date,
        details: row.channel + " (" + row.source + "): " + row.visitors + " visitors, 0 orders",
        action: "Check: broken checkout link, landing page CTA clarity, traffic quality"
      });
    }
  }

  return alerts;
}

function checkPositiveAnomalies(ss, date) {
  var dailyData = getTodaysDailyData(ss, date);
  var yesterdayData = getTodaysDailyData(ss,
    Utilities.formatDate(new Date(new Date(date).getTime() - 24*60*60*1000), TIMEZONE, "yyyy-MM-dd"));

  if (!dailyData || !yesterdayData) return [];

  var alerts = [];

  // Check for traffic spikes
  var todayTotalVisitors = 0;
  var yesterdayTotalVisitors = 0;

  for (var i = 0; i < dailyData.length; i++) {
    todayTotalVisitors += dailyData[i].visitors;
  }
  for (var i = 0; i < yesterdayData.length; i++) {
    yesterdayTotalVisitors += yesterdayData[i].visitors;
  }

  if (yesterdayTotalVisitors > 0 && todayTotalVisitors > yesterdayTotalVisitors * ALERTS.ANOMALY_SPIKE_MULTIPLIER) {
    alerts.push({
      type: "Positive Anomaly: Traffic Spike",
      severity: "LOW",
      date: date,
      details: "Traffic spiked " + Math.round(((todayTotalVisitors - yesterdayTotalVisitors) / yesterdayTotalVisitors) * 100) + "% vs yesterday",
      action: "INVESTIGATE: Which post/email went viral? Should we double down?"
    });
  }

  return alerts;
}

function logAlertsToSheet(ss, alerts) {
  var sheet = ss.getSheetByName(TABS.ALERTS);

  for (var i = 0; i < alerts.length; i++) {
    var alert = alerts[i];
    var row = [
      new Date(alert.date),
      alert.type,
      alert.severity,
      alert.details,
      alert.action,
      "Pending"
    ];
    sheet.appendRow(row);
  }
}

function sendAnomalyAlert(alerts) {
  var subject = "[ALERT] Supplies Are Limited - " + alerts.length + " Anomalies Detected";
  var body = "ALERT: The following anomalies were detected:\n\n";

  for (var i = 0; i < alerts.length; i++) {
    var alert = alerts[i];
    body += "[" + alert.severity + "] " + alert.type + "\n";
    body += alert.details + "\n";
    body += "Action: " + alert.action + "\n\n";
  }

  GmailApp.sendEmail(REPORT_EMAIL, subject, body);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getBenchmarkForChannel(channel) {
  switch(channel.toLowerCase()) {
    case "linkedin":
      return { conversion: 0.015, clickRate: 0.03 };
    case "substack":
      return { conversion: 0.025, openRate: 0.25 };
    case "email":
      return { conversion: 0.035, openRate: 0.28 };
    case "reddit":
      return { conversion: 0.005 };
    default:
      return { conversion: 0.01 };
  }
}

function getWeekStart(date) {
  var d = new Date(date);
  var day = d.getDay();
  var diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

function getWeekEnd(date) {
  var start = getWeekStart(date);
  return new Date(start.getTime() + 6*24*60*60*1000);
}

function getWeekNumber(date) {
  var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
}

function saveWeeklyToHistory(ss, weekStartStr, weekEndStr, weeklyData) {
  var sheet = ss.getSheetByName(TABS.HISTORICAL);
  var weekNum = getWeekNumber(new Date(weekStartStr));

  var row = [
    "Week " + weekNum,
    new Date(weekStartStr),
    new Date(weekEndStr),
    weeklyData.totalVisitors,
    weeklyData.totalOrders,
    weeklyData.totalRevenue,
    "0%", // will be calculated with previous week
    "", // best channel (optional)
    weeklyData.aov,
    weeklyData.totalSignups,
    ""  // key insight
  ];

  sheet.appendRow(row);
}

function sendErrorAlert(title, error) {
  var subject = "[ERROR] Supplies Are Limited Report Generation Failed";
  var body = title + "\n\nError Details:\n" + error;
  GmailApp.sendEmail(REPORT_EMAIL, subject, body);
}
