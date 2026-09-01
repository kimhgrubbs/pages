# SUPPLIES ARE LIMITED - LAUNCH TRACKING DEPLOYMENT CHECKLIST

**Target Deployment Date**: September 2, 2026, 5:45 PM CDT  
**Automation Start**: September 2, 2026, 6:00 PM CDT

---

## PHASE 1: GOOGLE SHEET SETUP (Day 1 - Sept 1)

### Sheet Structure
- [ ] Google Sheet created: "Supplies Are Limited - Sept Launch Tracking"
- [ ] Sheet shared with kimhgrubbs@gmail.com (edit access)
- [ ] Backup link saved

### Sheet Tabs
- [ ] Tab 1: "Daily Tracking" created with correct headers
- [ ] Tab 2: "Email Metrics" created with correct headers
- [ ] Tab 3: "Daily Summary" created with correct headers
- [ ] Tab 4: "Weekly Analysis" created with correct headers

### Column Headers (Daily Tracking)
- [ ] A: Date
- [ ] B: Channel
- [ ] C: Traffic Source
- [ ] D: Visitors
- [ ] E: Email Signups
- [ ] F: Orders
- [ ] G: Revenue
- [ ] H: AOV
- [ ] I: Conversion Rate
- [ ] J: Notes

### Formatting
- [ ] Header row (row 1) is bold with blue background
- [ ] Date column formatted as YYYY-MM-DD
- [ ] Currency columns formatted ($)
- [ ] Percentage column formatted (%)
- [ ] Number columns formatted as integers

### Email Metrics Tab Headers
- [ ] A: Date
- [ ] B: Campaign
- [ ] C: Opens
- [ ] D: Clicks
- [ ] E: Conversions
- [ ] F: New Subscribers
- [ ] G: Open Rate
- [ ] H: Click Rate
- [ ] I: Conversion Rate

### Daily Summary Tab Headers
- [ ] A: Date
- [ ] B: Total Visitors
- [ ] C: Total Signups
- [ ] D: Total Orders
- [ ] E: Total Revenue
- [ ] F: AOV
- [ ] G: Top Performing Channel
- [ ] H: Top Channel Revenue

### Weekly Analysis Tab Headers
- [ ] A: Week
- [ ] B: Total Visitors
- [ ] C: Total Signups
- [ ] D: Total Orders
- [ ] E: Total Revenue
- [ ] F: Best Performing Channel
- [ ] G: Channel Revenue
- [ ] H: Avg Conversion Rate

---

## PHASE 2: APPS SCRIPT SETUP (Day 1 - Sept 1, Evening)

### Code Setup
- [ ] Apps Script editor opened (Extensions → Apps Script)
- [ ] Default code deleted
- [ ] LaunchTracking automation code pasted
- [ ] Code saved successfully

### Configuration
- [ ] Shopify shop URL verified: `suppliesarelimited.myshopify.com`
- [ ] All tracked campaigns listed in CONFIG

### Test Sheet Structure
- [ ] Function `testSheetSetup()` run
- [ ] All 4 tabs confirmed to exist
- [ ] No ✗ errors in execution log

---

## PHASE 3: API CREDENTIAL SETUP (Day 1 - Sept 1, Evening)

### Shopify Setup
- [ ] Shopify Custom App created: "Launch Tracking Automation"
- [ ] Admin API scopes enabled: `read_orders`
- [ ] App installed and access token generated
- [ ] Shopify access token copied to CONFIG
- [ ] Token in single quotes: `'shpat_xxxxx'`
- [ ] Code saved

**Token Format Check**:
```
SHOPIFY_ACCESS_TOKEN: 'shpat_1a2b3c4d5e6f7g8h9i0j'
```

### Klavioy Setup
- [ ] Klavioy account accessed (klaviyo.com)
- [ ] Settings → API Keys opened
- [ ] Private API key created: "Launch Tracking"
- [ ] API key copied (starts with `pk_`)
- [ ] Klavioy API key added to CONFIG
- [ ] Key in single quotes: `'pk_xxxxx'`
- [ ] Code saved

**Token Format Check**:
```
KLAVIOY_API_KEY: 'pk_1a2b3c4d5e6f7g8h9i0j'
```

### Google Analytics Setup
- [ ] Decision made: Full API automation OR Manual entry
  - [ ] Full automation (requires Cloud Project setup)
  - [ ] Manual entry (recommended: 5 min/day)
- [ ] (If full automation): Service account JSON configured
- [ ] (If full automation): Service account added to GA property

---

## PHASE 4: DEPLOYMENT & TESTING (Day 1 - Sept 1, Late Evening)

### Deploy Code
- [ ] Apps Script code deployed (Deploy button)
- [ ] Deployment named: "Launch Tracking Automation"
- [ ] Deployment ID noted (if needed)

### Test API Connections
- [ ] Function `testAPIConnections()` run
- [ ] Shopify shows: `200` ✓
- [ ] Klavioy shows: `200` ✓
- [ ] (If GA): Google Analytics shows: `200` ✓
- [ ] No auth errors in execution log

**Expected Output**:
```
Shopify connection: 200
Klavioy connection: 200
(Google Analytics connection: 200) - if configured
```

### Create Automated Triggers
- [ ] Function `setupAllTriggers()` run
- [ ] Authorization granted to Apps Script
- [ ] Completion message: "All triggers created successfully"
- [ ] Email notification received

### Verify Triggers
- [ ] Triggers view shows 5 daily triggers:
  1. `fetchGoogleAnalyticsData` - 6:00 PM CDT daily
  2. `fetchShopifyData` - 6:30 PM CDT daily
  3. `fetchKlaviyoData` - 7:00 PM CDT daily
  4. `calculateFormulas` - 7:15 PM CDT daily
  5. `generateWeeklyAnalysis` - Sunday 10:00 AM CDT

### Trigger Times Verification
- [ ] All times are correct (adjusted for CDT)
- [ ] Frequency shows "Every day" for daily triggers
- [ ] Sunday trigger shows "Every week on Sunday"

---

## PHASE 5: MANUAL TEST RUNS (Day 1 - Sept 1, Evening)

### Test Shopify Data Pull
- [ ] Function `fetchShopifyData()` selected
- [ ] Function run manually
- [ ] Execution log shows: "Shopify data pull complete"
- [ ] No errors in log
- [ ] Check Daily Tracking sheet:
  - [ ] Orders column populated
  - [ ] Revenue column populated
  - [ ] Data is for today's orders

### Test Klavioy Data Pull
- [ ] Function `fetchKlaviyoData()` selected
- [ ] Function run manually
- [ ] Execution log shows: "Klavioy data pull complete"
- [ ] No errors in log
- [ ] Check Email Metrics sheet:
  - [ ] Campaign names populated
  - [ ] Opens, clicks, conversions populated
  - [ ] Subscriber counts populated

### Test Formula Calculations
- [ ] Function `calculateFormulas()` selected
- [ ] Function run manually
- [ ] Execution log shows: "Formula calculations complete"
- [ ] Check Daily Tracking sheet:
  - [ ] AOV column (H) has calculated values
  - [ ] Conversion Rate column (I) has calculated values
  - [ ] TOTALS row appears at bottom
- [ ] Check Daily Summary sheet:
  - [ ] Today's row populated with totals
  - [ ] Top channel identified and highlighted

---

## PHASE 6: GOOGLE ANALYTICS WORKFLOW SETUP (Sept 1, Before 6 PM)

### Choose Workflow
- [ ] Decision: Manual entry OR full API automation

### If Manual Entry (Recommended):
- [ ] Process documented: Check GA at 5:45 PM CDT
- [ ] Campaigns to track listed:
  - [ ] sept_launch
  - [ ] welcome_1
  - [ ] newsletter_week1
- [ ] Where to find data in GA documented:
  - [ ] Acquisition → Campaigns → All Campaigns
  - [ ] Filter by date: Today
  - [ ] Filter by campaign: sept_launch, etc.
- [ ] Data entry columns identified:
  - [ ] Visitors → Column D
  - [ ] Conversions/signups → Column E

### If Full API Automation (Advanced):
- [ ] Google Cloud Project created
- [ ] Google Analytics Data API enabled
- [ ] Service Account created
- [ ] JSON key downloaded and secured
- [ ] JSON key contents added to Apps Script properties
- [ ] Service account email added to GA property as Editor
- [ ] Test run successful (GA connection shows 200)

---

## PHASE 7: LAUNCH READINESS (Sept 1, 5:45 PM CDT)

### 15 Minutes Before First Automation Run (5:45 PM):

**If using manual GA entry:**
- [ ] Open Google Analytics
- [ ] Navigate to Acquisition → Campaigns
- [ ] Filter by today's date
- [ ] Note visitor and conversion numbers for each campaign
- [ ] Open Google Sheet Daily Tracking tab
- [ ] Enter GA data in rows before 6:00 PM CDT:
  - [ ] Visitors in Column D
  - [ ] Signups in Column E
  - [ ] Leave Columns F-I blank (automation fills these)

### At 6:00 PM CDT:
- [ ] First automation run should begin
- [ ] Shopify data will pull at 6:30 PM
- [ ] Klavioy data will pull at 7:00 PM
- [ ] Formulas will calculate at 7:15 PM

### Monitor First Run (6:00-7:30 PM):
- [ ] Apps Script Executions view shows all runs completing
- [ ] Green checkmarks on all 4 functions
- [ ] Google Sheet updates in real-time:
  - [ ] 6:30 PM: Orders and revenue appear
  - [ ] 7:00 PM: Email metrics appear
  - [ ] 7:15 PM: AOV and conversion rates calculate
- [ ] Daily Summary tab populates with totals
- [ ] Email confirmation received

---

## PHASE 8: GO-LIVE CONFIRMATION (Sept 2, Morning)

### After First Automated Run:
- [ ] Check Executions log: All 4 functions completed with 200 OK
- [ ] Check Daily Tracking sheet: Complete day 1 data present
- [ ] Check Email Metrics sheet: Day 1 email performance present
- [ ] Check Daily Summary sheet: Day 1 totals correct
- [ ] Verify calculations:
  - [ ] AOV formula working (Revenue ÷ Orders)
  - [ ] Conversion Rate formula working ((Orders ÷ Visitors) × 100)

### Data Verification:
- [ ] Visitors count looks reasonable (50-250 first day)
- [ ] Email signups look reasonable (10-30 first day)
- [ ] Orders match Shopify backend (spot check)
- [ ] Revenue matches Shopify backend (spot check)
- [ ] AOV around $2,199 (expected product price)

### Automation Status:
- [ ] ✓ Automation fully deployed
- [ ] ✓ All triggers active and running
- [ ] ✓ All APIs connected and working
- [ ] ✓ All data flows established
- [ ] ✓ Formulas calculating correctly

---

## ONGOING DAILY TASKS (Sept 2 onwards)

### 5:45 PM CDT (if manual GA entry):
- [ ] Open Google Analytics
- [ ] Check today's visitors by campaign
- [ ] Check today's conversions/signups by campaign
- [ ] Enter into Daily Tracking sheet
- [ ] **Time: 5 minutes**

### 6:00-7:15 PM CDT (Automatic):
- [ ] Automation runs automatically
- [ ] No action needed
- [ ] You can monitor in Executions log if desired

### Daily Evening (any time after 7:15 PM):
- [ ] Open Google Sheet
- [ ] Review day's performance:
  - [ ] Total visitors
  - [ ] Total orders
  - [ ] Total revenue
  - [ ] Top performing channel
  - [ ] Any anomalies or issues
- [ ] Add notes to Notes column if needed
- [ ] **Time: 3-5 minutes**

### Every Sunday at 10:00 AM:
- [ ] Automation generates weekly analysis automatically
- [ ] Review Weekly Analysis tab:
  - [ ] Week's total revenue
  - [ ] Best performing channel
  - [ ] Week's average conversion rate
- [ ] Plan adjustments for next week based on data
- [ ] **Time: 10 minutes**

---

## TROUBLESHOOTING

### If Data Doesn't Appear by 7:30 PM:

1. **Check Executions Log**:
   - Go to Apps Script
   - Click "Executions"
   - Look for red X marks = failures
   - Click on failed execution to see error

2. **Common Errors**:
   - "Invalid API key" → Check Shopify/Klavioy credentials
   - "Sheet not found" → Verify sheet tab names are correct
   - "Authorization error" → Re-run setupAllTriggers()

3. **Quick Fixes**:
   - [ ] Refresh Google Sheet (F5 or Cmd+R)
   - [ ] Re-run setupAllTriggers()
   - [ ] Check that sheet tabs exist with exact names

### If Automated Trigger Doesn't Run at Expected Time:

1. [ ] Check time zone is correct (CDT = UTC-5)
2. [ ] Verify trigger exists in Triggers view
3. [ ] Check for any permission errors
4. [ ] Try running function manually to test

### If Shopify Data is Missing:

1. [ ] Verify access token hasn't expired
2. [ ] Check shop URL is: `suppliesarelimited.myshopify.com`
3. [ ] Confirm app has `read_orders` permission
4. [ ] Look for auth errors in execution log

### If Klavioy Data is Missing:

1. [ ] Verify API key is correct
2. [ ] Check Klavioy account has data to pull
3. [ ] Confirm account is active (not suspended)
4. [ ] Look for API key errors in execution log

---

## CRITICAL CONTACTS

**If something breaks:**

1. Check troubleshooting section above
2. Review execution logs in Apps Script
3. Verify all credentials are still valid
4. Re-run `setupAllTriggers()` if triggers disappeared

**Automation Backup:**

If automation fails and can't be fixed quickly:
- [ ] Fall back to manual data entry
- [ ] Each evening: Manually enter GA, Shopify, Klavioy data
- [ ] Formulas still work automatically
- [ ] Not ideal but launch won't be blocked

---

## FINAL SIGN-OFF

Before declaring ready:

- [ ] All checklist items completed
- [ ] All tests passed
- [ ] All credentials validated
- [ ] All triggers confirmed
- [ ] Manual workflow documented
- [ ] Team aware of launch schedule
- [ ] Backup plan confirmed

**Status: READY FOR LAUNCH**

**Deployment Window**: September 2, 2026, 5:45 PM - 6:00 PM CDT

**Go-Live Confirmation**: September 2, 2026, 7:30 PM CDT

---

**Good luck with the Supplies Are Limited launch!**

For questions or issues, reference the AUTOMATION_SETUP_GUIDE.md for detailed troubleshooting.
