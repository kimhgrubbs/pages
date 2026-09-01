# SUPPLIES ARE LIMITED — QA & LAUNCH CHECKLIST
## Master Verification System | Nothing Ships Without Approval

---

## PART 1: PRE-LAUNCH VERIFICATION (All Items Must Be Checked)

### **PHASE 1: BRAND & MESSAGING (Sept 1)**

#### **Brand Voice Consistency**
- [ ] All marketing copy uses consistent tone (sophisticated, not salesy)
- [ ] No brand voice conflicts between channels
- [ ] Terminology is consistent (e.g., "backup power" not "emergency generator")
- [ ] Professional language throughout (no buzzwords, no slang)

**Verification**: Read all pieces aloud, note any tone mismatches

---

#### **Product Accuracy**
- [ ] All specifications are accurate (5,120Wh, 4,000W, 5,000+ cycles)
- [ ] No exaggerated claims (all claims have data backing)
- [ ] Product name spelling consistent (Pecron F5000LFP)
- [ ] Price is current ($2,199)
- [ ] Warranty info correct (5-year, not more)
- [ ] Stock status accurate (12 units or current count)

**Verification**: Cross-reference product spec sheet, website data, inventory count

---

#### **No Legal/Compliance Issues**
- [ ] No health claims (nothing says "will keep you healthy")
- [ ] No ROI guarantees (we show estimates, not promises)
- [ ] No testimonials without consent (only use approved customer stories)
- [ ] No false comparisons (all competitor claims defensible)
- [ ] Terms & conditions mention affiliate products clearly if applicable

**Verification**: Read through any claims a lawyer would question

---

### **PHASE 2: LINK VERIFICATION (Critical - Prevents Past Errors)**

#### **Every Single URL Must Be Tested**

**LinkedIn Post 1:**
- [ ] Link: `SuppliesAreLimited.com/products/pecron-f5000lfp?utm_source=linkedin&utm_medium=social&utm_campaign=sept_launch`
- [ ] Click the link (manually, from phone + desktop)
- [ ] Product page loads correctly
- [ ] Product image shows (if applicable)
- [ ] Add to cart / checkout works
- [ ] Form accepts input
- [ ] No 404 errors
- [ ] Page loads in <3 seconds

**Repeat for EVERY post, email, newsletter link**

**Critical Check**: Does link go to SuppliesAreLimited.com (not Amazon, not general checkout)?

---

#### **UTM Parameter Verification**

**Format**: `?utm_source=[platform]&utm_medium=social&utm_campaign=[campaign]`

Examples:
```
SuppliesAreLimited.com/products/pecron-f5000lfp?utm_source=linkedin&utm_medium=social&utm_campaign=sept_launch ✓

SuppliesAreLimited.com/products/pecron-f5000lfp?utm_source=substack&utm_medium=email&utm_campaign=newsletter_week1 ✓

SuppliesAreLimited.com/products/pecron-f5000lfp?utm_source=reddit&utm_medium=social&utm_campaign=r_prepping ✓

SuppliesAreLimited.com/products/pecron-f5000lfp ✗ (Missing UTM - can't track source)

SuppliesAreLimited.com/shop ✗ (Generic, doesn't go to product)
```

**Verification Checklist** (for every link):
- [ ] URL starts with SuppliesAreLimited.com (not affiliate, not external)
- [ ] URL includes product-specific path (/products/pecron-f5000lfp)
- [ ] UTM source is correct (matches platform)
- [ ] UTM medium is correct (social, email, etc.)
- [ ] UTM campaign is correct (identifies the campaign)
- [ ] No typos in URL
- [ ] URL doesn't include personal data
- [ ] Link shorteners NOT used (we need to see full UTM)

**Process**: Copy every link into spreadsheet, click each one, verify loads correctly

---

### **PHASE 3: FORM & EMAIL VERIFICATION**

#### **Email Signup Form**
- [ ] Form appears on landing page
- [ ] Form has Name field (required)
- [ ] Form has Email field (required)
- [ ] Submit button works (test with real email)
- [ ] Confirmation message appears after submit
- [ ] Email actually arrives (check inbox)
- [ ] Email sends from correct address (no spam flags)
- [ ] Form captures in Klaviyo (verify in dashboard)
- [ ] Automation triggers (welcome email sends)

**Verification**: Create test account, receive email, confirm Klaviyo shows signup

---

#### **Email Deliverability**
- [ ] All 6 welcome sequence emails tested
- [ ] Each email sends from correct account (no "noreply@" if possible)
- [ ] Subject lines show correctly (no truncation on mobile)
- [ ] Email formatting looks good (test on phone + desktop)
- [ ] Links in emails work (click each one)
- [ ] Unsubscribe link works (legally required)
- [ ] No spam trigger words (check with spam detector)
- [ ] Test with Gmail, Outlook, Apple Mail

**Verification Process**: Send to yourself, check multiple clients, verify links work

---

### **PHASE 4: PAYMENT & CHECKOUT**

#### **E-Commerce Function**
- [ ] Add to cart works (test with F5000)
- [ ] Checkout page loads
- [ ] Shipping address fields work
- [ ] Payment processing works (test with real card or test mode)
- [ ] Order confirmation email sends
- [ ] Order shows in admin dashboard
- [ ] Inventory updates correctly (12 units → 11 units after purchase)
- [ ] No duplicate orders (common checkout error)
- [ ] Refund process is documented (if needed)

**Verification**: Make test purchase, confirm receipt email, check inventory

---

#### **Critical Infrastructure Issue Check**
- [ ] "Shop Now" button goes to product page, NOT general checkout
- [ ] Affiliate products clearly separated from direct sales
- [ ] No confusion between Amazon affiliate items and house products
- [ ] Customer can't accidentally buy wrong product

**Historical Reference**: This was the $0 revenue error. Verify it's fixed.

---

### **PHASE 5: MOBILE RESPONSIVENESS**

#### **Test on Real Devices**
- [ ] Landing page looks professional on iPhone (portrait & landscape)
- [ ] Landing page looks professional on Android
- [ ] Landing page looks professional on iPad
- [ ] Buttons are clickable (44px minimum hit target)
- [ ] Text is readable (no tiny fonts)
- [ ] Images load properly (don't break layout)
- [ ] Forms are usable on mobile
- [ ] Email looks good on mobile (most opens are mobile)

**Verification**: Use phone to visit site, try on 3+ different devices

---

### **PHASE 6: PERFORMANCE & SPEED**

#### **Page Load Speed**
- [ ] Landing page loads in <3 seconds (desktop)
- [ ] Landing page loads in <5 seconds (mobile 4G)
- [ ] No broken images (red X's)
- [ ] No console errors (open dev tools, check)
- [ ] Video/animations don't slow page
- [ ] Page score >80 on Google PageSpeed Insights

**Verification**: Test with Google PageSpeed Insights, check performance metrics

---

### **PHASE 7: ANALYTICS & TRACKING**

#### **Google Analytics Setup**
- [ ] Google Analytics connected to website
- [ ] UTM parameters tracking correctly (verify in GA reports)
- [ ] Email form captures in GA events
- [ ] Purchase tracking set up (can see which channel drove sale)
- [ ] Conversion goal created (track email signup)
- [ ] Dashboard created (weekly performance view)

**Verification**: Make test purchase, verify appears in GA within 24 hours

---

#### **Klaviyo Integration**
- [ ] Klaviyo account connected
- [ ] Signup form connected to Klaviyo list
- [ ] Welcome automation is active
- [ ] All 6 emails in sequence
- [ ] Triggers are set correctly (immediate, +1 day, etc.)
- [ ] Unsubscribe works
- [ ] Test signup receives all 6 emails on schedule

**Verification**: Sign up as test user, track emails over 30 days

---

### **PHASE 8: SOCIAL MEDIA PLATFORM SETUP**

#### **LinkedIn**
- [ ] Profile is complete (bio, profile picture, company info)
- [ ] Links to SuppliesAreLimited.com in bio
- [ ] Can schedule posts (or posting manually)
- [ ] Hashtag strategy defined (don't over-use)

**Verification**: Visit profile from outside account, confirm looks professional

---

#### **Substack**
- [ ] Publication created
- [ ] Publication name matches brand
- [ ] Publication bio describes content
- [ ] Links to SuppliesAreLimited.com in bio
- [ ] Branding is consistent (colors, fonts)
- [ ] Email templates set up
- [ ] Archive of past issues accessible

**Verification**: Visit Substack page, try subscribing, confirm email works

---

#### **Reddit**
- [ ] Account created (if not already)
- [ ] Joined all target communities (r/Prepping, etc.)
- [ ] Read community rules for each
- [ ] Profile links to SuppliesAreLimited.com (in bio, not posts)
- [ ] Understand participation norms (don't spam)

**Verification**: Visit profile, confirm it looks professional and links work

---

### **PHASE 9: FINAL BRAND CHECK**

#### **Consistency Across All Channels**
- [ ] Logo consistent everywhere (if used)
- [ ] Colors consistent (gold #d4a476, dark #0d1b2a)
- [ ] Typography consistent (professional fonts only)
- [ ] Messaging consistent (same value prop across channels)
- [ ] Contact info consistent (email, phone if used)
- [ ] Brand voice consistent (same tone everywhere)

**Verification**: Screenshots of each channel, compare side-by-side

---

#### **No Brand Mistakes**
- [ ] Typos: 0 (spell-check everything)
- [ ] Grammatical errors: 0 (read aloud, use grammar checker)
- [ ] Broken links: 0 (click every link)
- [ ] Missing images: 0 (verify all load)
- [ ] Wrong links: 0 (verify all go to SuppliesAreLimited.com)
- [ ] Inconsistent product names: 0 (use "Pecron F5000LFP" everywhere)

**Verification**: Read every piece aloud, have another person proofread

---

## PART 2: DAILY LAUNCH CHECKLIST (Sept 2-7)

### **Monday, Sept 2 (Landing Page + LinkedIn Post 1)**

**Morning (8am):**
- [ ] Landing page URL works (click it)
- [ ] All links on page verified
- [ ] Email form tested (receive test email)
- [ ] Mobile responsive confirmed
- [ ] No technical errors

**Midday (12pm):**
- [ ] LinkedIn Post 1 scheduled/published
- [ ] Link verified to work
- [ ] UTM parameters correct
- [ ] Post reads professionally
- [ ] Go live notification sent

**Evening (5pm):**
- [ ] Monitor social performance (initial engagement)
- [ ] Check website traffic (Google Analytics)
- [ ] Monitor email signups (Klaviyo)
- [ ] Log in tracking spreadsheet

**Daily Success Metrics:**
- Landing page: Live, no errors ✓
- LinkedIn: 1 post published, initial engagement happening
- Email signups: At least 5-10 (first day conservative)

---

### **Tuesday, Sept 3 (Klaviyo + Substack)**

**Morning (8am):**
- [ ] Klaviyo welcome sequences tested (go through all 6 emails)
- [ ] Email 1 arrives immediately ✓
- [ ] Email 2 arrives +1 day ✓
- [ ] All emails send from correct address
- [ ] Unsubscribe works on all emails

**Midday (12pm):**
- [ ] Substack newsletter published
- [ ] Email goes out to subscribers (if any)
- [ ] Link in newsletter verified
- [ ] Formatting looks good on mobile
- [ ] Archive page shows newsletter

**Evening (5pm):**
- [ ] Track Substack performance (opens, clicks)
- [ ] Monitor email signups (should jump from Substack)
- [ ] Log all metrics in tracking sheet

**Daily Success Metrics:**
- Klaviyo: All 6 emails tested, automation active ✓
- Substack: First newsletter live
- Email signups: 50-100 (Substack boost expected)
- Revenue: $0-2,200 (first possible sales)

---

### **Wednesday-Friday, Sept 4-6**

**Daily Morning Check (8am):**
- [ ] All systems operational (no downtime)
- [ ] Landing page loads
- [ ] Email is sending
- [ ] Social posts scheduled/published
- [ ] No error messages

**Daily Metrics Check (5pm):**
- [ ] Traffic by source (which channel winning?)
- [ ] Email signups (how many, from where?)
- [ ] Conversions (any sales? which source?)
- [ ] Performance summary in tracking sheet

**Thursday (Day 4):**
- [ ] Klaviyo Email 2 sends (verify +1 day from first signup)
- [ ] LinkedIn Post 2 published
- [ ] Monitor engagement
- [ ] Adjust Post 2 if needed (test different messaging)

**Friday (Day 5):**
- [ ] LinkedIn Post 3 published
- [ ] Monitor all channels
- [ ] Prepare Week 2 content

---

### **Saturday-Sunday, Sept 7-8**

**Saturday:**
- [ ] Week 1 performance review
- [ ] Analyze what worked (which posts, which channel, which messaging)
- [ ] Analyze what didn't work
- [ ] Create Week 2 adjustments based on data

**Sunday:**
- [ ] Plan Week 2 content (based on Week 1 learnings)
- [ ] Prepare LinkedIn Posts 4-6
- [ ] Prepare Substack Newsletter 2
- [ ] Final verification before Week 2 launch

---

## PART 3: WEEKLY PERFORMANCE REVIEW TEMPLATE

### **Week 1 Summary (Sept 2-7)**

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| LinkedIn Visitors | 200-300 | _____ | [ ] Hit target |
| Email Signups (Total) | 150-250 | _____ | [ ] Hit target |
| Substack Subscribers | 50-100 | _____ | [ ] Hit target |
| Website Visitors | 400-600 | _____ | [ ] Hit target |
| Direct Conversions | 2-4 | _____ | [ ] Hit target |
| Revenue | $4,400-8,800 | _____ | [ ] Hit target |

---

### **Channel Performance Breakdown**

| Channel | Visitors | Email Signups | Conversions | Revenue | ROI |
|---------|----------|---------------|-------------|---------|-----|
| LinkedIn | _____ | _____ | _____ | _____ | _____ |
| Substack | _____ | _____ | _____ | _____ | _____ |
| Email | _____ | — | _____ | _____ | _____ |
| Reddit | _____ | _____ | _____ | _____ | _____ |
| Direct/Organic | _____ | _____ | _____ | _____ | _____ |

---

### **What Worked (Double Down)**

**Highest Performing Content:**
- Post/Email/Newsletter: _____
- Topic/Theme: _____
- Why it worked: _____
- Plan for Week 2: Post more of this

---

### **What Didn't Work (Kill It)**

**Lowest Performing Content:**
- Post/Email/Newsletter: _____
- Topic/Theme: _____
- Why it failed: _____
- Plan for Week 2: Replace with different angle

---

### **Customer Feedback (If Applicable)**

**Positive Feedback:**
- _____
- _____

**Questions/Objections:**
- _____
- _____

**Action for Week 2:**
- _____

---

## PART 4: ESCALATION PROTOCOL (If Something Goes Wrong)

### **Scenario 1: Link is Broken**

**If you click a link and get 404 or error:**
1. Stop immediately (don't let users hit broken link)
2. Screenshot the error
3. Report to me with screenshot
4. I fix link, test, re-publish with fixed URL
5. Resume once verified

**Prevention**: Every link clicked by you before content goes live

---

### **Scenario 2: Email Not Sending**

**If Klaviyo sequences don't send:**
1. Check Klaviyo dashboard (is automation active?)
2. Verify email addresses are correct
3. Check spam folder (might be filtered)
4. If still broken, pause automation
5. I troubleshoot, test, resume

**Prevention**: Test all emails 24 hours before going live

---

### **Scenario 3: Form Not Capturing**

**If email signups don't appear in Klaviyo:**
1. Verify form is on landing page
2. Test signup (create test account)
3. Check Klaviyo list for test account
4. If not there, integration is broken
5. Pause form, fix integration

**Prevention**: Test form before publishing

---

### **Scenario 4: Sales Drop Off**

**If conversion rate drops mid-week:**
1. Check if there are product/shipping issues
2. Check if there are website errors
3. Check if content quality dropped
4. Analyze which source dried up (LinkedIn? Email?)
5. Investigate and fix

**Prevention**: Daily monitoring prevents this

---

## FINAL LAUNCH APPROVAL

**All items above must be checked before ANY content publishes.**

**Sign-Off Checklist:**

Before Sept 2, 8am launch:
- [ ] Brand messaging approved
- [ ] All links tested and working
- [ ] Forms tested and working
- [ ] Analytics connected
- [ ] Mobile responsive confirmed
- [ ] Payment processing tested
- [ ] All platforms set up
- [ ] No typos or errors
- [ ] You have approved all content

**Once all items checked**, we launch and execute daily.

---

## TRACKING YOUR SUCCESS

**You'll have real-time visibility:**
- Daily revenue by channel
- Daily traffic by source
- Daily email signups
- Weekly performance review
- Monthly strategy review

**No guessing. No "planning."**
**Just execution, measurement, and optimization.**

This is the system that stops the cycle of redos.

Are you ready to review the collateral and approve for launch?
