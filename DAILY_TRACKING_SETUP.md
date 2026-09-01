# DAILY TRACKING SPREADSHEET — Setup Instructions

## CREATE IN GOOGLE SHEETS

**File Name**: `Supplies Are Limited - Sept Launch Tracking`

**Shared with**: Team access (optional)

---

## COLUMNS TO CREATE

| Column | Type | Description |
|--------|------|-------------|
| **Date** | Date | YYYY-MM-DD format |
| **Channel** | Text | LinkedIn, Substack, Email, Direct, Organic, etc. |
| **Traffic Source** | Text | Specific campaign (Post 1, Newsletter 1, Welcome, etc.) |
| **Visitors** | Number | Unique visitors from Google Analytics |
| **Email Signups** | Number | New subscribers from that channel |
| **Orders** | Number | Completed purchases from that channel |
| **Revenue** | Currency | Total $ from that channel |
| **AOV** | Currency | Average Order Value (Revenue ÷ Orders) |
| **Conversion Rate** | Percentage | (Orders ÷ Visitors) × 100 |
| **Notes** | Text | Observations, issues, performance notes |

---

## HOW TO POPULATE DAILY

**Each Evening (6pm CDT recommended)**:

### Step 1: Get Google Analytics Data
- Go to Google Analytics
- Filter by date (today)
- Filter by campaign (utm_campaign)
- Record: Visitors, Email Signups (if tracked via event)

### Step 2: Get Shopify Data
- Go to Shopify → Orders
- Filter by date
- Count orders from today
- Sum revenue from today
- Calculate AOV (Revenue ÷ Orders)

### Step 3: Get Email Data
- Go to Klavioy
- Check today's email opens, clicks, and conversions
- Record signups and orders

### Step 4: Log Everything
- Enter date, channel, traffic source
- Input visitors, signups, orders, revenue
- Calculate conversion rate
- Add notes (what's working, what isn't)

---

## SAMPLE DATA ROW

| Date | Channel | Traffic Source | Visitors | Email Signups | Orders | Revenue | AOV | Conv. Rate | Notes |
|------|---------|-----------------|----------|--------------|--------|---------|-----|-----------|-------|
| 2026-09-02 | LinkedIn | Post 1 | 52 | 9 | 1 | $2,199 | $2,199 | 1.92% | Strong engagement, good CTR |
| 2026-09-02 | Substack | Newsletter 1 | 38 | 7 | 1 | $2,199 | $2,199 | 2.63% | Solid opens, good conversion |
| 2026-09-02 | Email | Welcome | 45 | — | 0 | $0 | — | 0% | Sets up for future emails |
| **TOTALS** | | | **135** | **16** | **2** | **$4,398** | **$2,199** | **1.48%** | Day 1 launch success |

---

## GOOGLE SHEETS SETUP (Step-by-Step)

### Create the Sheet:
1. Go to Google Sheets
2. Click "Create new spreadsheet"
3. Name it: `Supplies Are Limited - Sept Launch Tracking`
4. Create the columns listed above

### Format for Easy Reading:
- **Header row**: Bold, blue background
- **Currency column**: Format as currency ($)
- **Percentage column**: Format as percentage (%)
- **Date column**: Format as YYYY-MM-DD

### Add Formulas (Optional but Helpful):
```
For AOV in column H:
=IF(D2=0, 0, F2/D2)

For Conversion Rate in column I:
=IF(C2=0, 0, (D2/C2)*100)

For Daily Totals (last row):
=SUM(C2:C100)  [repeat for each column]
```

---

## WHERE TO GET DATA EACH DAY

### Google Analytics:
- **URL**: analytics.google.com
- **Navigate**: Acquisition → Campaigns → All Campaigns
- **Filter**: Date range (today), Campaign (exact match)
- **Export**: Visitors, Email Signups

### Shopify:
- **URL**: suppliesarelimited.myshopify.com/admin/orders
- **Filter**: Date (today)
- **Data**: Order count, total revenue

### Klavioy:
- **URL**: klaviyo.com → Flows → [Flow Name]
- **Data**: Email opens, clicks, conversions, new subscribers

---

## DAILY INSIGHTS TO TRACK

### Morning Review (8am):
- Which channel brought the most visitors overnight?
- Any conversion spikes or anomalies?
- Email open rates vs. historical average?

### Evening Update (6pm):
- What was the day's total revenue?
- Which platform converted best (highest AOV or conversion rate)?
- Any technical issues or blockers?

### Weekly Summary (Sunday):
- Which channel had the highest ROI?
- Which content performed best?
- What should we adjust for Week 2?

---

## EXPECTED BENCHMARKS (Premium/Soft Survivalism Audience)

| Metric | Target | Notes |
|--------|--------|-------|
| **Visitors/Day** | 100-200 | Growing as awareness builds |
| **Email Signup Rate** | 5-10% | High-income professionals convert well |
| **Conversion Rate** | 1-3% | Premium products, higher AOV = lower volume |
| **AOV** | $2,000-2,500 | F5000 system ($2,199 base) |
| **Revenue/Day** | $2,200-6,600 | 1-3 orders × $2,200 AOV |

---

## WEEKLY OPTIMIZATION PROCESS

**Every Sunday at 10am:**

1. **Review the Week**
   - Which platform won? (highest revenue)
   - Which content won? (highest conversion rate)
   - Which time of day performs best?

2. **Identify Patterns**
   - LinkedIn posts: morning or evening?
   - Email opens: which subject lines worked?
   - Newsletter: what content drove clicks?

3. **Plan Adjustments**
   - Double down on winning channel
   - Test variations on underperformers
   - Adjust posting times based on data

4. **Next Week's Focus**
   - Increase winning channel frequency
   - Pause or modify underperforming content
   - A/B test new approaches

---

## SHARING & PERMISSIONS

**Recommended Sharing**:
- You (editor)
- Any team members tracking data (editors)
- Anyone reviewing results (viewers)

**Link to Share**: [Get shareable link from Google Sheets]

---

## COMMON ISSUES & FIXES

| Issue | Solution |
|-------|----------|
| Data not syncing | Refresh Google Analytics, wait 4-6 hours for data to populate |
| No conversions tracked | Check Shopify UTM parameter settings, verify UTM in links |
| Email data missing | Confirm Klavioy integration with Shopify, check email list has proper tagging |
| Visitors but no signups | Email form might be broken—check form submission in Google Analytics events |

---

## GO LIVE CHECKLIST

Before starting daily tracking:

- [ ] Google Sheets created and named
- [ ] All columns set up
- [ ] Formulas entered (if using them)
- [ ] Formatting applied (bold, colors, currency)
- [ ] Access shared with team (if applicable)
- [ ] First day's data template ready
- [ ] Daily process time blocked (6pm CDT)

**Status**: Ready to populate starting Sept 2, 2026

