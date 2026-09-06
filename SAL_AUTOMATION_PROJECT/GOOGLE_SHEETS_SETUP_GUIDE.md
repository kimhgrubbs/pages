# Supplies Are Limited - Sept Launch Tracking
## Complete Google Sheets Setup Guide

**Date Created:** September 6, 2026
**Deployment Status:** READY FOR MANUAL SETUP
**User Email:** kimhgrubbs@gmail.com

---

## EXECUTIVE SUMMARY

This document provides complete step-by-step instructions for setting up the "Supplies Are Limited - Sept Launch Tracking" Google Sheet with full Apps Script automation. The system will automatically collect data from Google Analytics, Shopify, and Klavioy at 6:00 PM, 6:30 PM, and 7:00 PM CDT daily.

**Prerequisites:**
- Google Account (kimhgrubbs@gmail.com)
- Google Analytics 4 account with Property ID and Data Stream ID
- Shopify Admin access with ability to create API access tokens
- Klavioy account (API key provided: pk_SvmBdA_3d1ce04623d5c304f31a5ec5ea1c655126)

---

## SECTION 1: CREATE THE GOOGLE SHEET

### Step 1.1: Create New Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Create" → "Blank Spreadsheet"
3. Name it: **"Supplies Are Limited - Sept Launch Tracking"**
4. Click the dropdown next to "Untitled spreadsheet" and change the name

### Step 1.2: Share Sheet
1. Click "Share" in top right
2. Enter email: `kimhgrubbs@gmail.com`
3. Ensure "Editor" access is selected
4. Click "Share"

---

## SECTION 2: CREATE THE FIVE SHEETS/TABS

The Google Sheet should have 5 tabs. Rename the default "Sheet1" and create new sheets:

### Tab 1: Daily Tracking
**Purpose:** Primary data collection sheet with all daily metrics

**Column Headers:**
| Col | Header | Format | Notes |
|-----|--------|--------|-------|
| A | Date | YYYY-MM-DD | Unique date identifier |
| B | Channel | Text | LinkedIn, Substack, Email, Direct, etc. |
| C | Traffic Source | Text | Specific campaign or email name |
| D | Visitors | Number | Unique visitors from GA |
| E | Email Signups | Number | New subscribers |
| F | Orders | Number | Completed purchases |
| G | Revenue | Currency ($) | Total $ from that channel |
| H | AOV | Currency ($) | Auto-calculated: =IF(F2=0, 0, G2/F2) |
| I | Conversion Rate % | Percentage (%) | Auto-calculated: =IF(D2=0, 0, (F2/D2)*100) |
| J | Notes | Text | Observations and context |

**Formatting for Daily Tracking:**
1. Row 1 (Header): Bold, Blue background (#4285F4), White text
2. Column G (Revenue): Format as Currency ($)
3. Column H (AOV): Format as Currency ($)
4. Column I (Conversion Rate %): Format as Percentage (%)
5. Column A (Date): Format as YYYY-MM-DD

### Tab 2: Email Metrics
**Purpose:** Klavioy email performance data

**Column Headers:**
| Col | Header | Format | Notes |
|-----|--------|--------|-------|
| A | Date | YYYY-MM-DD | Email metric date |
| B | New Signups | Number | New subscribers from Klavioy |
| C | Email Opens | Number | Total opens |
| D | Click Rate | Percentage (%) | Click rate % |
| E | Conversion Rate | Percentage (%) | Email to purchase rate |
| F | Revenue | Currency ($) | Revenue from email campaigns |

**Formatting for Email Metrics:**
1. Row 1 (Header): Bold, Blue background, White text
2. Column F (Revenue): Format as Currency ($)
3. Columns D & E: Format as Percentage (%)

### Tab 3: Daily Summary
**Purpose:** Auto-generated daily summary of all channels

**Column Headers:**
| Col | Header | Format | Notes |
|-----|--------|--------|-------|
| A | Date | YYYY-MM-DD | Summary date |
| B | Total Visitors | Number | Sum of all channels |
| C | Total Signups | Number | Sum of all channels |
| D | Total Orders | Number | Sum of all channels |
| E | Total Revenue | Currency ($) | Sum of all channels |
| F | Top Channel | Text | Highest revenue channel |
| G | Avg Conversion Rate | Percentage (%) | Average across channels |
| H | Avg AOV | Currency ($) | Average across channels |

**Formatting for Daily Summary:**
1. Row 1 (Header): Bold, Blue background, White text
2. Columns E, H: Format as Currency ($)
3. Column G: Format as Percentage (%)

### Tab 4: Weekly Analysis
**Purpose:** Weekly summaries and trend analysis

**Column Headers:**
| Col | Header | Format | Notes |
|-----|--------|--------|-------|
| A | Week | Text | Week 1, Week 2, etc. |
| B | Total Visitors | Number | Weekly total |
| C | Total Orders | Number | Weekly total |
| D | Total Revenue | Currency ($) | Weekly total |
| E | Best Day | Text | Day with highest revenue |
| F | Best Channel | Text | Most profitable channel |
| G | Week over Week % | Percentage (%) | Growth vs previous week |
| H | Recommendations | Text | Optimization notes |

**Formatting for Weekly Analysis:**
1. Row 1 (Header): Bold, Blue background, White text
2. Columns D: Format as Currency ($)
3. Column G: Format as Percentage (%)

### Tab 5: Logs
**Purpose:** System logging and error tracking

**Column Headers:**
| Col | Header | Format | Notes |
|-----|--------|--------|-------|
| A | Timestamp | Text | Full date+time |
| B | Type | Text | INFO, ERROR, SUCCESS, TEST |
| C | Message | Text | Log message |

**Formatting for Logs:**
1. Row 1 (Header): Bold, Blue background, White text
2. Column B: Use conditional formatting (red for ERROR, green for SUCCESS)

---

## SECTION 3: ADD FORMULAS

### For Daily Tracking Sheet (Rows 2 onward):

**Column H (AOV - Average Order Value):**
```
=IF(F2=0, 0, G2/F2)
```
- Divides Revenue by Orders
- Returns 0 if no orders to avoid #DIV/0! error

**Column I (Conversion Rate %):**
```
=IF(D2=0, 0, (F2/D2)*100)
```
- Calculates Orders ÷ Visitors × 100
- Returns 0 if no visitors to avoid #DIV/0! error

**To apply formulas:**
1. Enter the formula in cell H2
2. Copy it down to row 100 (or more if needed)
3. Repeat for Column I

### For Daily Summary Sheet (Bottom totals row):

After data is populated, add totals row (example in row 100):

**Total Visitors (B100):**
```
=SUMIF(A:A, A100, 'Daily Tracking'!D:D)
```

**Total Signups (C100):**
```
=SUMIF(A:A, A100, 'Daily Tracking'!E:E)
```

**Total Orders (D100):**
```
=SUMIF(A:A, A100, 'Daily Tracking'!F:F)
```

**Total Revenue (E100):**
```
=SUMIF(A:A, A100, 'Daily Tracking'!G:G)
```

---

## SECTION 4: DEPLOY APPS SCRIPT

### Step 4.1: Open Apps Script Editor
1. Open your Google Sheet
2. Click "Extensions" in the menu
3. Click "Apps Script"
4. This will open the Apps Script editor in a new tab

### Step 4.2: Copy the Code
1. The file `AppsScript_LaunchTracking.gs` contains the complete automation code
2. Clear any default code in the Apps Script editor
3. Paste the entire content of `AppsScript_LaunchTracking.gs` into the editor

### Step 4.3: Configure API Credentials

**CRITICAL:** Update these values in the CONFIG object at the top of the script:

```javascript
const CONFIG = {
  GA_PROPERTY_ID: '[REPLACE_WITH_YOUR_GA_PROPERTY_ID]',
  GA_DATA_STREAM: '[REPLACE_WITH_YOUR_GA_DATA_STREAM_ID]',
  SHOPIFY_SHOP_URL: 'suppliesarelimited.myshopify.com',  // ✓ ALREADY SET
  SHOPIFY_ACCESS_TOKEN: '[REPLACE_WITH_YOUR_SHOPIFY_TOKEN]',
  KLAVIOY_API_KEY: 'pk_SvmBdA_3d1ce04623d5c304f31a5ec5ea1c655126',  // ✓ ALREADY SET
  // ... rest of config
};
```

**You need to provide:**

#### A. Google Analytics Property ID and Data Stream ID
**How to find:**
1. Go to [Google Analytics 4](https://analytics.google.com)
2. Select your property (Supplies Are Limited)
3. Click "Admin" → "Property Settings"
4. Your Property ID is displayed at the top
5. Click "Data Streams" to find your Data Stream ID

#### B. Shopify Access Token
**How to create:**
1. Go to Shopify Admin: https://admin.shopify.com
2. Click "Settings" (gear icon)
3. Select "Apps and integrations" → "App and sales channel settings"
4. Click "Develop apps"
5. Click "Create an app"
6. Name it: "Supplies Are Limited Automation"
7. In "Configuration" tab → "Admin API access scopes"
8. Select at minimum:
   - `read_orders`
   - `read_products`
   - `read_fulfillments`
9. Click "Install app"
10. Click "Reveal token" under "Admin API access token"
11. Copy the full token (starts with `shpat_`)

**Required Scopes for Shopify API:**
- read_orders - To pull order and revenue data
- read_products - To identify products
- read_fulfillments - To track fulfillment status

### Step 4.4: Save and Deploy

1. Press Ctrl+S (or Cmd+S on Mac) to save
2. A "Project name" dialog may appear - name it: "SAL Launch Tracking Automation"
3. Click "Save"

---

## SECTION 5: ENABLE REQUIRED GOOGLE CLOUD APIs

For Google Analytics data fetching to work:

1. Open the Apps Script project
2. Click "Project Settings" (gear icon, right side)
3. Under "Google Cloud Platform (GCP) project", you'll see "GCP Project ID"
4. Click the link to open the GCP project
5. In GCP Console, go to "APIs & Services" → "Library"
6. Search for and enable:
   - **Google Analytics Data API**
   - **Google Sheets API** (usually auto-enabled)

---

## SECTION 6: SET UP AUTOMATED TRIGGERS

Automated triggers run the data collection functions at scheduled times.

### Step 6.1: Create Triggers Manually

1. In Apps Script editor, click "Triggers" (clock icon) on left sidebar
2. Click "Create new trigger"
3. Create each trigger with these settings:

**Trigger 1: Google Analytics Data**
- Function: `fetchGoogleAnalyticsData`
- Deployment: `Head`
- Event source: `Time-based`
- Type: `Day timer`
- Time: `6:00 PM - 7:00 PM` (pick any time in that hour)
- Timezone: `America/Chicago`

**Trigger 2: Shopify Data**
- Function: `fetchShopifyData`
- Deployment: `Head`
- Event source: `Time-based`
- Type: `Day timer`
- Time: `6:30 PM - 7:30 PM`
- Timezone: `America/Chicago`

**Trigger 3: Klavioy Data**
- Function: `fetchKlavioyData`
- Deployment: `Head`
- Event source: `Time-based`
- Type: `Day timer`
- Time: `7:00 PM - 8:00 PM`
- Timezone: `America/Chicago`

**Trigger 4: Calculate Formulas**
- Function: `calculateFormulas`
- Deployment: `Head`
- Event source: `Time-based`
- Type: `Day timer`
- Time: `7:15 PM - 8:15 PM`
- Timezone: `America/Chicago`

**Trigger 5: Generate Daily Summary**
- Function: `generateDailySummary`
- Deployment: `Head`
- Event source: `Time-based`
- Type: `Day timer`
- Time: `7:30 PM - 8:30 PM`
- Timezone: `America/Chicago`

### Step 6.2: Or Use the Automated Setup Function

Alternatively, you can use the automated setup function:

1. In Apps Script editor, click the play/run button
2. Select function: `createAllTriggers`
3. Click "Run"
4. The system will create all five triggers automatically

---

## SECTION 7: TEST THE AUTOMATION

### Step 7.1: Manual Testing

Before relying on automatic triggers, test each data pull manually:

1. **Test Google Analytics:**
   - In Apps Script editor, select function: `testGoogleAnalytics`
   - Click "Run"
   - Check the Logs sheet in your Google Sheet for results
   - Verify data appears in Daily Tracking sheet

2. **Test Shopify:**
   - Select function: `testShopify`
   - Click "Run"
   - Check Logs sheet
   - Verify order and revenue data appears

3. **Test Klavioy:**
   - Select function: `testKlavioy`
   - Click "Run"
   - Check Logs sheet
   - Verify email metrics appear

4. **Test All at Once:**
   - Select function: `testAllDataPulls`
   - Click "Run"
   - All functions will run sequentially with 2-second delays
   - Monitor the Logs sheet for success/error messages

### Step 7.2: Check the Logs Sheet

After running tests:
1. Switch to the "Logs" tab in your Google Sheet
2. Look for entries with:
   - Type: "SUCCESS" - function completed successfully
   - Type: "ERROR" - something went wrong, read the message
   - Type: "INFO" - informational messages

**Common errors and solutions:**
- "API_NOT_ENABLED": Enable the Google Analytics Data API in GCP Console
- "INVALID_TOKEN": Check that Shopify token is correct and has right scopes
- "API_RATE_LIMIT": Wait a few minutes before retrying
- "SHEET_NOT_FOUND": Verify all sheet names match CONFIG object exactly

---

## SECTION 8: VERIFY FORMULAS ARE CALCULATING

After data is added:

1. Go to "Daily Tracking" sheet
2. Look for rows with:
   - Visitors in column D (e.g., 150)
   - Orders in column F (e.g., 3)
   - Revenue in column G (e.g., $450)
3. Check that:
   - Column H calculates AOV: $450 ÷ 3 = $150 ✓
   - Column I calculates Conversion Rate: (3 ÷ 150) × 100 = 2% ✓

If formulas show as text or have errors:
1. Click the cell
2. Edit the formula (should start with =)
3. Press Enter to recalculate

---

## SECTION 9: ONGOING MONITORING

### Daily Checks:
1. Open "Daily Summary" tab each evening
2. Verify total visitors, orders, and revenue are populated
3. Review "Logs" tab for any errors

### Weekly Checks:
1. Review "Weekly Analysis" tab every Sunday
2. Compare trends with previous weeks
3. Note top performing channels and content

### Monthly Checks:
1. Review all 4 weeks of data
2. Identify patterns and optimization opportunities
3. Test any new campaigns or channels

---

## SECTION 10: TROUBLESHOOTING

### Problem: No data appears in Daily Tracking sheet

**Solutions:**
1. Check the Logs sheet for error messages
2. Verify API credentials are correct and current
3. Ensure Shopify/Klavioy accounts have activity for today
4. Run `testAllDataPulls()` manually
5. Check that sheet names exactly match CONFIG object

### Problem: Formulas show as text instead of calculating

**Solutions:**
1. Delete the content in column H
2. Click on cell H2
3. Type: `=IF(F2=0, 0, G2/F2)`
4. Press Enter
5. Copy the formula down to other rows

### Problem: Triggers not running automatically

**Solutions:**
1. Go to "Triggers" in Apps Script
2. Check that all 5 triggers are listed with green checkmarks
3. Verify "Status" column shows enabled
4. Click each trigger to verify settings are correct
5. If missing, create them manually using Section 6.1 steps

### Problem: Google Analytics data not pulling

**Solutions:**
1. Verify GA4 Property ID is correct
2. Ensure Google Analytics Data API is enabled in GCP
3. Verify the service account has access to your GA property
4. Run `testGoogleAnalytics()` and check Logs for specific error
5. May require manual configuration of service account permissions

### Problem: Shopify API returns 401 (Unauthorized)

**Solutions:**
1. Verify Shopify access token hasn't expired
2. Check token has required scopes (read_orders minimum)
3. Confirm token value is completely copied (no extra spaces)
4. Recreate access token from Shopify Admin if uncertain

---

## SECTION 11: REFERENCE: SCRIPT FUNCTIONS

| Function | Purpose | Trigger | Manual Test |
|----------|---------|---------|------------|
| `fetchGoogleAnalyticsData()` | Pulls visitor data from GA4 | 6:00 PM CDT | `testGoogleAnalytics()` |
| `fetchShopifyData()` | Pulls order and revenue from Shopify | 6:30 PM CDT | `testShopify()` |
| `fetchKlavioyData()` | Pulls email metrics from Klavioy | 7:00 PM CDT | `testKlavioy()` |
| `calculateFormulas()` | Applies AOV and Conversion Rate formulas | 7:15 PM CDT | Part of all tests |
| `generateDailySummary()` | Creates daily summary totals | 7:30 PM CDT | Part of all tests |
| `createAllTriggers()` | Sets up all automated triggers | Manual only | Run once for setup |
| `deleteAllTriggers()` | Removes all triggers | Manual only | Use if need to reset |
| `testAllDataPulls()` | Runs all functions in sequence | Manual only | For testing |
| `initializeSheet()` | Creates sheet structure and headers | Manual only | Run once for setup |
| `getConfiguration()` | Displays current API configuration | Manual only | Check credentials |

---

## SECTION 12: SECURITY NOTES

**Credential Storage:**
- API keys are stored in the Apps Script CONFIG object
- These are NOT automatically visible to other users
- Apps Script can only access them if they have edit access to the script
- Consider using Apps Script Properties Service for extra security (optional enhancement)

**Recommended:**
1. Only share the Google Sheet with trusted users
2. Use Editor role sparingly
3. Regularly audit Apps Script access logs
4. Rotate Shopify access tokens annually
5. Keep Klavioy API key confidential

---

## SECTION 13: NEXT STEPS

1. **CREATE THE SHEET** - Use steps in Section 1-3
2. **DEPLOY THE SCRIPT** - Use steps in Section 4-5
3. **SET UP TRIGGERS** - Use steps in Section 6
4. **TEST MANUALLY** - Use steps in Section 7
5. **VERIFY FORMULAS** - Use steps in Section 8
6. **MONITOR DAILY** - Use steps in Section 9

**Expected Timeline:** 30-45 minutes for complete setup

**Deadline:** September 7, 2026, 11:00 PM CDT

---

## APPENDIX A: COMPLETE CONFIGURATION TEMPLATE

When updating API credentials in the CONFIG object, use this template:

```javascript
const CONFIG = {
  GA_PROPERTY_ID: 'REPLACE_WITH_YOUR_VALUE',  // e.g., '123456789'
  GA_DATA_STREAM: 'REPLACE_WITH_YOUR_VALUE',  // e.g., '987654321'
  SHOPIFY_SHOP_URL: 'suppliesarelimited.myshopify.com',  // ✓ DO NOT CHANGE
  SHOPIFY_ACCESS_TOKEN: 'REPLACE_WITH_YOUR_VALUE',  // e.g., 'shpat_...'
  KLAVIOY_API_KEY: 'pk_SvmBdA_3d1ce04623d5c304f31a5ec5ea1c655126',  // ✓ DO NOT CHANGE
  TIMEZONE: 'America/Chicago',  // ✓ DO NOT CHANGE
  SHEET_NAME_DAILY: 'Daily Tracking',  // ✓ DO NOT CHANGE
  SHEET_NAME_EMAIL: 'Email Metrics',  // ✓ DO NOT CHANGE
  SHEET_NAME_SUMMARY: 'Daily Summary',  // ✓ DO NOT CHANGE
  SHEET_NAME_WEEKLY: 'Weekly Analysis',  // ✓ DO NOT CHANGE
  SHEET_NAME_LOGS: 'Logs'  // ✓ DO NOT CHANGE
};
```

---

**Document Version:** 1.0
**Last Updated:** September 6, 2026
**Status:** READY FOR DEPLOYMENT
