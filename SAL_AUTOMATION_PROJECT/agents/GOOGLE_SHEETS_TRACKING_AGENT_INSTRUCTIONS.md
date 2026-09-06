# Google Sheets Tracking Automation Agent - Complete Instructions

## Mission
Create and deploy the "Supplies Are Limited - Sept Launch Tracking" Google Sheet with full Apps Script automation for daily data collection and reporting.

## Context
- User: kimhgrubbs@gmail.com
- Data sources: Google Analytics, Shopify, Klavioy
- Update times: 6:00 PM, 6:30 PM, 7:00 PM CDT daily
- Timezone: America/Chicago

## Tasks (Complete ALL in order)

### 1. Create Google Sheet
- Create new Google Sheet
- Name: "Supplies Are Limited - Sept Launch Tracking"
- Share with: kimhgrubbs@gmail.com (editor access)
- Create 4 tabs:
  * Daily Tracking
  * Email Metrics
  * Daily Summary
  * Weekly Analysis

### 2. Set Up Daily Tracking Sheet Structure
**Columns:**
- A: Date (YYYY-MM-DD format)
- B: Channel (LinkedIn, Substack, Email, Direct, etc.)
- C: Traffic Source (specific campaign/email)
- D: Visitors (unique visitors from GA)
- E: Email Signups (new subscribers)
- F: Orders (completed purchases)
- G: Revenue (total $ from that channel)
- H: AOV (Average Order Value = Revenue ÷ Orders)
- I: Conversion Rate (Orders ÷ Visitors × 100)
- J: Notes (observations)

**Formatting:**
- Header row: Bold, blue background
- Currency columns: Format as $ (USD)
- Percentage column: Format as percentage (%)
- Date column: Format as YYYY-MM-DD

### 3. Add Formulas
**AOV Column (H):**
```
=IF(F2=0, 0, G2/F2)
```

**Conversion Rate Column (I):**
```
=IF(D2=0, 0, (F2/D2)*100)
```

**Daily Totals (bottom row):**
```
=SUM(D2:D100)  [repeat for each column]
```

### 4. Deploy Apps Script Automation
- Access Sheet → Extensions → Apps Script
- Copy AppsScript_LaunchTracking.gs code
- Configure with these credentials:
  * GA_PROPERTY_ID: [User to provide]
  * GA_DATA_STREAM: [User to provide]
  * SHOPIFY_SHOP_URL: suppliesarelimited.myshopify.com
  * SHOPIFY_ACCESS_TOKEN: [User to provide]
  * KLAVIOY_API_KEY: pk_SvmBdA_3d1ce04623d5c304f31a5ec5ea1c655126
  * TIMEZONE: America/Chicago
  * SHEET_NAME_DAILY: Daily Tracking
  * SHEET_NAME_EMAIL: Email Metrics
  * SHEET_NAME_SUMMARY: Daily Summary
  * SHEET_NAME_WEEKLY: Weekly Analysis

### 5. Set Up Automated Triggers
- Create trigger: fetchGoogleAnalyticsData() @ 6:00 PM CDT daily
- Create trigger: fetchShopifyData() @ 6:30 PM CDT daily
- Create trigger: fetchKlavioyData() @ 7:00 PM CDT daily
- Create trigger: calculateFormulas() @ 7:15 PM CDT daily
- Create trigger: generateDailySummary() @ 7:30 PM CDT daily

### 6. Test Automation
- Manually run fetchGoogleAnalyticsData()
- Verify data appears in Daily Tracking sheet
- Manually run fetchShopifyData()
- Verify order data appears
- Manually run fetchKlavioyData()
- Verify email metrics appear
- Check that formulas calculate correctly

### 7. Set Up Email Metrics Tab
**Columns:**
- A: Date
- B: New Signups
- C: Email Opens
- D: Click Rate
- E: Conversion Rate
- F: Revenue

**Data Source:** Klavioy API (automated daily pull)

### 8. Set Up Daily Summary Tab
**Daily Summary Report Contents:**
- Date
- Total Visitors (sum of all channels)
- Total Signups
- Total Orders
- Total Revenue
- Top Channel (by revenue)
- Top Content Piece
- Key Metrics (avg conversion rate, avg AOV)
- Notes for review

**This should auto-populate from Daily Tracking data**

### 9. Set Up Weekly Analysis Tab
**Weekly Analysis (every Sunday @ 10:00 AM):**
- Week number
- Weekly Totals (visitors, signups, orders, revenue)
- Best Day (highest revenue)
- Best Channel (highest ROI)
- Best Content (highest converting post)
- Trends (up/down from previous week)
- Recommendations (what to optimize)
- Next Week Plan (what to test)

### 10. Error Handling & Logging
- Create Logs sheet for troubleshooting
- Log all API calls and responses
- Log any data pull failures
- Create alerts for:
  * Failed API calls
  * No data returned
  * Unusual patterns in data

### 11. Quality Assurance
- Verify data is pulling from all three sources
- Check that dates are correct
- Verify formulas are calculating
- Confirm email reports are sending
- Test with sample data

### 12. Documentation
- Screenshot of complete sheet structure
- Record all API credentials used (securely)
- Document all formulas
- Create user guide for reading/interpreting data
- Document troubleshooting steps

## Expected Outcome
✓ Google Sheet created and fully configured
✓ Apps Script deployed with all credentials
✓ Daily automated data pulls active (6-7:30 PM CDT)
✓ All formulas calculating correctly
✓ Test data verified and working
✓ Email reports configured

## Data Sources Configuration

### Google Analytics
- Need: GA4 Property ID and Data Stream ID
- Data: Visitors, signups, traffic source, campaign
- Update: 6:00 PM CDT daily

### Shopify
- API URL: suppliesarelimited.myshopify.com
- Endpoint: /admin/api/2024-01/orders.json
- Authentication: Access token (needs to be created in Shopify)
- Data: Order count, total revenue, product breakdown
- Update: 6:30 PM CDT daily

### Klavioy
- API Key: pk_SvmBdA_3d1ce04623d5c304f31a5ec5ea1c655126
- Endpoint: https://a.klaviyo.com/api/v1/
- Data: Email opens, clicks, conversions, new subscribers
- Update: 7:00 PM CDT daily

## Success Criteria
- Sheet created and accessible
- All columns and formulas in place
- Apps Script deployed without errors
- Data pulls working from all three sources
- Daily updates happening at scheduled times
- Email summaries being generated
- No data gaps or errors in logs

## Failure Recovery
If API data won't pull:
1. Check API credentials are correct
2. Verify accounts have proper permissions
3. Test API calls manually first
4. Check API rate limits not exceeded
5. Review error logs for specific issues

If formulas not calculating:
1. Check cell references are correct
2. Verify data types match formula expectations
3. Test formula in single cell first
4. Check for circular references

## Deadline
Complete by: Saturday, September 7, 2026, 11:00 PM CDT

## Critical Note
This system requires three API credentials from external services. User may need to generate:
- Shopify Custom App access token (from Shopify admin)
- Google Analytics Property ID (from GA4 admin)
- Shopify API credentials may already exist from previous setup
