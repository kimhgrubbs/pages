# Supplies Are Limited - Google Sheets Automation
## Quick Deployment Checklist

**Deployment Date:** September 6, 2026  
**Deadline:** September 7, 2026, 11:00 PM CDT  
**Estimated Time:** 45 minutes  

---

## PHASE 1: GATHER CREDENTIALS (5 min)

### Google Analytics
- [ ] Go to: https://analytics.google.com
- [ ] Select property: "Supplies Are Limited"
- [ ] Click "Admin" → "Property Settings"
- [ ] Copy Property ID: `___________________________`
- [ ] Click "Data Streams" → select your stream
- [ ] Copy Data Stream ID: `___________________________`

### Shopify
- [ ] Go to: https://admin.shopify.com
- [ ] Click "Settings" → "Apps and integrations"
- [ ] Click "App and sales channel settings" → "Develop apps"
- [ ] Click "Create an app"
- [ ] Name: "Supplies Are Limited Automation"
- [ ] Go to "Configuration" → "Admin API access scopes"
- [ ] Enable: `read_orders` (required), `read_products` (optional)
- [ ] Click "Install app"
- [ ] Click "Reveal token"
- [ ] Copy Access Token: `___________________________`

### Klavioy
- [ ] ✓ API Key already configured: `pk_SvmBdA_3d1ce04623d5c304f31a5ec5ea1c655126`

---

## PHASE 2: CREATE GOOGLE SHEET (10 min)

### Create Sheet
- [ ] Go to: https://sheets.google.com
- [ ] Click "Create" → "Blank spreadsheet"
- [ ] Name it: "Supplies Are Limited - Sept Launch Tracking"
- [ ] Share with: kimhgrubbs@gmail.com (Editor access)

### Create Tabs
- [ ] Rename Sheet1 to: `Daily Tracking`
- [ ] Create new sheet: `Email Metrics`
- [ ] Create new sheet: `Daily Summary`
- [ ] Create new sheet: `Weekly Analysis`
- [ ] Create new sheet: `Logs`

### Add Headers - Daily Tracking
- [ ] Row 1: Date | Channel | Traffic Source | Visitors | Email Signups | Orders | Revenue | AOV | Conversion Rate % | Notes

### Add Headers - Email Metrics
- [ ] Row 1: Date | New Signups | Email Opens | Click Rate | Conversion Rate | Revenue

### Add Headers - Daily Summary
- [ ] Row 1: Date | Total Visitors | Total Signups | Total Orders | Total Revenue | Top Channel

### Add Headers - Weekly Analysis
- [ ] Row 1: Week | Total Visitors | Total Orders | Total Revenue | Best Day | Best Channel | Trends

### Add Headers - Logs
- [ ] Row 1: Timestamp | Type | Message

### Format Daily Tracking
- [ ] Select Row 1 → Bold → Blue background → White text
- [ ] Column G (Revenue) → Format as Currency ($)
- [ ] Column H (AOV) → Format as Currency ($)
- [ ] Column I (Conversion Rate %) → Format as Percentage (%)
- [ ] Column A (Date) → Format as YYYY-MM-DD

### Format Email Metrics
- [ ] Select Row 1 → Bold → Blue background → White text
- [ ] Column F (Revenue) → Format as Currency ($)
- [ ] Columns D & E → Format as Percentage (%)

### Format Other Sheets
- [ ] Daily Summary: Format headers, columns E & H as Currency, column G as %
- [ ] Weekly Analysis: Format headers, column D as Currency, column G as %
- [ ] Logs: Format headers, column B with conditional formatting

---

## PHASE 3: DEPLOY APPS SCRIPT (8 min)

### Access Apps Script
- [ ] Open your Google Sheet
- [ ] Click "Extensions" → "Apps Script"
- [ ] New tab opens with Apps Script editor

### Copy Code
- [ ] Open file: `/home/user/pages/SAL_AUTOMATION_PROJECT/AppsScript_LaunchTracking.gs`
- [ ] Select all code (Ctrl+A)
- [ ] Copy (Ctrl+C)
- [ ] Go back to Apps Script editor
- [ ] Select all default code
- [ ] Delete it
- [ ] Paste the copied code (Ctrl+V)

### Update Credentials
In the CONFIG object (lines 7-18), update these three values:

```javascript
const CONFIG = {
  GA_PROPERTY_ID: '[REPLACE WITH YOUR VALUE]',  
  GA_DATA_STREAM: '[REPLACE WITH YOUR VALUE]',
  SHOPIFY_SHOP_URL: 'suppliesarelimited.myshopify.com',  // ✓ Leave as-is
  SHOPIFY_ACCESS_TOKEN: '[REPLACE WITH YOUR VALUE]',
  KLAVIOY_API_KEY: 'pk_SvmBdA_3d1ce04623d5c304f31a5ec5ea1c655126',  // ✓ Leave as-is
  // ... rest stays the same
};
```

Replace with your credentials:
- [ ] GA_PROPERTY_ID = `___________________________`
- [ ] GA_DATA_STREAM = `___________________________`
- [ ] SHOPIFY_ACCESS_TOKEN = `___________________________`

### Save Project
- [ ] Press Ctrl+S
- [ ] Enter project name: "SAL Launch Tracking Automation"
- [ ] Click "OK"

---

## PHASE 4: ENABLE GOOGLE CLOUD APIs (7 min)

### Enable Analytics Data API
- [ ] In Apps Script editor, click "Project Settings" (gear icon)
- [ ] Copy the "GCP Project ID"
- [ ] Click the link to open Google Cloud Console
- [ ] Go to "APIs & Services" → "Library"
- [ ] Search for: "Google Analytics Data API"
- [ ] Click the result
- [ ] Click "Enable"
- [ ] Back to Library
- [ ] Search for: "Google Sheets API"
- [ ] Click "Enable" (if not already enabled)

---

## PHASE 5: CREATE AUTOMATED TRIGGERS (5 min)

### Option A: Automated Setup (Recommended)
- [ ] In Apps Script editor, click the play/run button ▶
- [ ] From dropdown, select: `createAllTriggers()`
- [ ] Click the play button again
- [ ] Function runs and creates all 5 triggers
- [ ] Go to "Triggers" tab (clock icon) on left
- [ ] Verify all 5 functions are listed with green checkmarks:
  - [ ] fetchGoogleAnalyticsData
  - [ ] fetchShopifyData
  - [ ] fetchKlavioyData
  - [ ] calculateFormulas
  - [ ] generateDailySummary

### Option B: Manual Trigger Creation
If Option A doesn't work, manually create triggers:

For each trigger listed below:
1. Click "Create new trigger"
2. Function: [Name]
3. Event source: Time-based
4. Type: Day timer
5. Time: [Time from table]
6. Timezone: America/Chicago
7. Click "Save"

| Time | Function |
|------|----------|
| 6:00 PM | fetchGoogleAnalyticsData |
| 6:30 PM | fetchShopifyData |
| 7:00 PM | fetchKlavioyData |
| 7:15 PM | calculateFormulas |
| 7:30 PM | generateDailySummary |

---

## PHASE 6: TEST SYSTEM (10 min)

### Run Comprehensive Test
- [ ] In Apps Script editor, select function: `testAllDataPulls()`
- [ ] Click the play button ▶
- [ ] Wait ~15 seconds for test to complete
- [ ] System logs "=== MANUAL TEST COMPLETE ===" in console

### Check Logs
- [ ] Go to "Logs" tab in your Google Sheet
- [ ] Look for entries with Type = "SUCCESS"
- [ ] Should see entries like:
  - [ ] "Starting Google Analytics data fetch"
  - [ ] "GA data successfully added for [TODAY'S DATE]"
  - [ ] "Shopify data successfully added for [TODAY'S DATE]"
  - [ ] "Klavioy data successfully added for [TODAY'S DATE]"
  - [ ] "Formulas applied successfully"
  - [ ] "Daily summary generated for [TODAY'S DATE]"

### Verify Data
- [ ] Go to "Daily Tracking" tab
- [ ] Look for today's date in Column A
- [ ] Should have data in columns D-G (Visitors, Signups, Orders, Revenue)
- [ ] Columns H & I should show calculated numbers (AOV, Conv Rate %)

### Check Formula Calculations
- [ ] Column H (AOV) = Revenue ÷ Orders
- [ ] Column I (Conversion Rate) = (Orders ÷ Visitors) × 100
- [ ] Example: If Orders=3, Visitors=150, Revenue=$450:
  - [ ] AOV should be $150
  - [ ] Conv Rate should be 2%

---

## PHASE 7: MONITOR FIRST AUTOMATED RUN (Monitor)

### First Night (September 6, 6:00 PM - 7:30 PM CDT)
- [ ] At 6:00 PM, check Logs for "GA data fetch" entry
- [ ] At 6:30 PM, check for "Shopify data" entry
- [ ] At 7:00 PM, check for "Klavioy data" entry
- [ ] At 7:15 PM, check for "Formulas applied" entry
- [ ] At 7:30 PM, check for "Daily summary generated" entry

### What to Look For
- [ ] No ERROR entries in Logs sheet
- [ ] All entries have Type = "SUCCESS"
- [ ] Data in Daily Tracking sheet for today
- [ ] Daily Summary sheet has totals

### If Errors Occur
- [ ] Note the error message from Logs sheet
- [ ] Refer to troubleshooting section in GOOGLE_SHEETS_SETUP_GUIDE.md
- [ ] Common issues:
  - [ ] "API_NOT_ENABLED" → Enable API in Google Cloud
  - [ ] "INVALID_TOKEN" → Verify credentials in CONFIG
  - [ ] "SHEET_NOT_FOUND" → Verify sheet names exactly match

---

## PHASE 8: DAILY OPERATIONS

### Each Evening
- [ ] Open "Daily Summary" tab
- [ ] Review totals for the day
- [ ] Check "Logs" tab for any ERROR entries
- [ ] Note top performing channel

### Weekly
- [ ] Review "Weekly Analysis" tab every Sunday
- [ ] Compare week-over-week trends
- [ ] Identify optimization opportunities

### Monthly
- [ ] Generate report from all 4 weeks of data
- [ ] Document wins and learnings
- [ ] Plan next month's tests

---

## TROUBLESHOOTING QUICK REFERENCE

| Problem | First Step | Then Try |
|---------|-----------|----------|
| No data in sheets | Check Logs for errors | Look for ERROR entries with details |
| Formulas show as text | Click cell H2 | Type: =IF(F2=0, 0, G2/F2) then press Enter |
| Triggers not running | Go to Triggers tab | Check all 5 are listed with green checkmarks |
| API error | Check credentials in CONFIG | Verify tokens copied completely (no extra spaces) |
| GA data missing | Confirm GA Property ID | Enable Google Analytics Data API in GCP Console |
| Shopify data missing | Verify access token | Check scopes include "read_orders" |

---

## FILES CREATED FOR YOU

| File | Purpose | Location |
|------|---------|----------|
| AppsScript_LaunchTracking.gs | Automation code | /SAL_AUTOMATION_PROJECT/ |
| GOOGLE_SHEETS_SETUP_GUIDE.md | Detailed instructions | /SAL_AUTOMATION_PROJECT/ |
| sheets_deployment_report.md | Complete status report | /SAL_AUTOMATION_PROJECT/agents/ |
| DEPLOYMENT_CHECKLIST.md | This checklist | /SAL_AUTOMATION_PROJECT/ |

---

## ESTIMATED TIMELINE

| Phase | Time | Status |
|-------|------|--------|
| 1. Gather Credentials | 5 min | 🟡 PENDING |
| 2. Create Google Sheet | 10 min | 🟡 PENDING |
| 3. Deploy Apps Script | 8 min | 🟡 PENDING |
| 4. Enable APIs | 7 min | 🟡 PENDING |
| 5. Create Triggers | 5 min | 🟡 PENDING |
| 6. Test System | 10 min | 🟡 PENDING |
| 7. Monitor First Run | Ongoing | 🟡 PENDING |
| **TOTAL** | **45 min** | 🟡 **READY TO START** |

---

## COMPLETION CRITERIA

✓ System is successfully deployed when:
- [ ] All 5 sheets created with correct headers
- [ ] Apps Script code deployed in editor
- [ ] All credentials configured in CONFIG object
- [ ] All 5 automated triggers created and showing OK status
- [ ] testAllDataPulls() runs without errors
- [ ] Data appears in Daily Tracking sheet
- [ ] Logs sheet shows SUCCESS entries (no ERRORs)
- [ ] Formulas calculate correctly
- [ ] Daily Summary auto-populates

---

## GO / NO-GO DECISION

**Before starting, verify:**
- [ ] You have 45 minutes available uninterrupted
- [ ] You have your GA Property ID and Data Stream ID
- [ ] You have created Shopify custom app and have access token
- [ ] You have access to Google Cloud Console
- [ ] You can share Google Sheets with kimhgrubbs@gmail.com

**If all checked:** You're ready to GO! Start with Phase 1.

**If any unchecked:** HOLD - gather missing credentials first, then proceed.

---

**Ready to begin deployment? Start with PHASE 1 above.**

