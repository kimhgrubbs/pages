# Social Posting Automation Quick-Start Guide
## How to Post with Make.com & Content360

---

## TL;DR - In 5 Steps

1. **One-time Setup** (takes 1 hour):
   - [ ] Connect Instagram & Facebook to Content360
   - [ ] Generate API key in Content360
   - [ ] Create webhook in Make.com
   - [ ] Create scenario in Make.com to route to Content360

2. **Import Content** (30 minutes):
   - [ ] Copy all 36 posts to Google Sheets
   - [ ] Verify dates/times
   - [ ] Verify captions and hashtags

3. **Schedule Posts** (ongoing, automatic):
   - [ ] Content360 publishes automatically
   - [ ] Mon/Wed/Fri @ 9 AM ET
   - [ ] No manual action needed

4. **Monitor** (5 min/day):
   - [ ] Check Instagram/Facebook for post
   - [ ] Respond to comments
   - [ ] Log metrics in Google Sheets

5. **Troubleshoot** (if needed):
   - [ ] Check Make.com execution log
   - [ ] Re-authenticate platforms if auth expired
   - [ ] Contact support if persistent errors

---

## Daily Operations Checklist

### Before 9:30 AM ET (After Post)
- [ ] Check if post appeared on Instagram
- [ ] Check if post appeared on Facebook
- [ ] Verify caption displays correctly
- [ ] Verify hashtags are clickable
- [ ] Verify media (image/video) loads
- [ ] Verify link works (click to test)
- [ ] Respond to first 3-5 comments

### 3 Hours After Post (12 PM ET on posting day)
- [ ] Check engagement count:
  - Number of likes
  - Number of comments
  - Number of saves (if visible)
- [ ] Calculate engagement rate
- [ ] Log metrics in Google Sheets
- [ ] Respond to additional comments
- [ ] Check if links showing clicks in Google Analytics

### 24 Hours After Post (Next Day 9 AM ET)
- [ ] Note final engagement for post
- [ ] Review comments for customer questions
- [ ] Respond to any unanswered questions
- [ ] Check if post generated any clicks/sales

---

## Weekly Tasks

### Every Sunday (5 PM ET)

**1. Weekly Summary** (10 minutes):
- [ ] Did all 3 posts publish? (should be 100%)
- [ ] Were any posts late or missed?
- [ ] Were there any errors?
- [ ] List any issues encountered

**2. Engagement Analysis** (10 minutes):
- [ ] Total likes from 3 posts: [number]
- [ ] Average likes per post: [calculation]
- [ ] Total comments: [number]
- [ ] Best performing post: [which one & why]
- [ ] Worst performing post: [which one & why]

**3. Traffic Analysis** (10 minutes):
- [ ] Google Analytics: clicks from instagram/social
- [ ] Email signups from link clicks: [count]
- [ ] Orders traced to Instagram: [count]
- [ ] Dollar value from social traffic: $[amount]

**4. Platform Health Check** (5 minutes):
- [ ] Make.com: any errors? (check scenario logs)
- [ ] Content360: all platforms still connected?
- [ ] API keys valid and not expired?
- [ ] OAuth tokens expiring soon?

**5. Update Tracking Sheet** (5 minutes):
- [ ] Add week's summary to "Weekly Results" tab
- [ ] Update running totals (36-post campaign)
- [ ] Note any changes needed for next week
- [ ] Document any learnings

---

## Monthly Tasks

### 1st of Every Month

**1. Full System Audit** (20 minutes):
- [ ] Make.com: all scenarios still active/running?
- [ ] Content360: all platforms still connected?
- [ ] API Key expiration: check and note date
- [ ] Instagram OAuth token: check expiration
- [ ] Facebook OAuth token: check expiration
- [ ] LinkedIn OAuth token (if using): check expiration
- [ ] Any persistent errors? (review logs)

**2. Token Refresh** (10 minutes):
- [ ] Any tokens expiring soon (within 30 days)?
- [ ] Refresh expiring tokens proactively
- [ ] Document new expiration dates
- [ ] Update credentials file

**3. Performance Review** (15 minutes):
- [ ] Compare this month vs previous month:
  - Total posts: [count]
  - Total engagement: [count]
  - Average engagement rate: [%]
  - Total clicks from social: [count]
  - Email captures: [count]
  - Orders from social: [count]
- [ ] Trend analysis: improving or declining?
- [ ] Best types of content (Reel vs Carousel vs Video)?
- [ ] Best hashtags (which get most reach)?

**4. Plan Adjustments** (10 minutes):
- [ ] Any changes to posting schedule?
- [ ] Any content themes that aren't working?
- [ ] New platforms to add?
- [ ] New features to enable?

---

## Manual Post Submission (For Content Outside 36 Posts)

### Option 1: Google Sheets (Easiest)

If using Google Sheets as content source:
1. Open Google Sheet: "SAL Content Queue"
2. Add new row at bottom with:
   - **Post ID**: Unique name (e.g., "Extra_Sept10_Reel")
   - **Caption**: Your caption text
   - **Hashtags**: Comma-separated #hashtags
   - **Media URL**: Link to video or image
   - **Platforms**: instagram,facebook (or others)
   - **Schedule Time**: 2026-09-10 09:00 ET (or desired time)
   - **Status**: Leave blank
3. Make.com will automatically detect new row and post
4. Status column will auto-fill when posted

**Time required**: 2-3 minutes

### Option 2: Content360 Web Interface

If you have Content360 access:
1. Log into Content360.com
2. Click "Create Post" or "New Post" or "+" button
3. Fill in:
   - Caption
   - Hashtags
   - Upload media or paste media URL
   - Select platforms (Instagram, Facebook, etc.)
   - Set schedule time
4. Click "Schedule" or "Publish"
5. Post appears in calendar

**Time required**: 3-5 minutes

### Option 3: Make.com Webhook (For API users)

If you have Make.com webhook URL:

```bash
curl -X POST https://hook.make.com/[your-id] \
  -H "Content-Type: application/json" \
  -d '{
    "caption": "Your caption here",
    "hashtags": "#Hashtag1 #Hashtag2 #Hashtag3",
    "media_url": "https://example.com/image.jpg",
    "media_type": "image",
    "platforms": ["instagram", "facebook"],
    "schedule_time": "2026-09-10T09:00:00-04:00"
  }'
```

**Time required**: 1-2 minutes (if you're comfortable with command line)

---

## Troubleshooting Guide

### "Post Didn't Appear"

**What to check**:
1. Wait 10 minutes (sometimes takes time to process)
2. Refresh Instagram page (might be cached)
3. Check Make.com scenario execution log:
   - Click Scenarios → [your scenario name]
   - Click "Execution log" tab
   - Look for today's run (should be green if successful)
   - If red, click to read error message

**Common causes & fixes**:
| Error | Fix |
|-------|-----|
| "401 Unauthorized" | Re-authenticate platforms in Content360 |
| "Invalid API Key" | Regenerate API key in Content360 settings |
| "Rate limit exceeded" | Wait 1 hour, then retry |
| "Media not found" | Verify media URL is accessible and not broken |
| "Invalid caption format" | Check for special characters, try simpler text |

**Last resort**: Post manually to Instagram directly (takes 5 minutes)

### "Caption Looks Wrong"

**What to fix**:
1. Line breaks may not display as written
2. Instagram shortens very long captions
3. Some special characters may not display

**Solution**:
1. Log into Content360
2. Click on post in calendar
3. Edit caption
4. Fix formatting issues
5. Republish or wait for next scheduled time

### "Hashtags Not Working"

**Problem**: Hashtags appear but don't link to hashtag page

**Causes**:
1. Typo in hashtag
2. Hashtag is "shadowbanned" (blocked by Instagram)
3. Too many hashtags (Instagram allows 30 max)

**Solution**:
1. Check spelling against original list
2. Search hashtag on Instagram directly:
   - Go to Instagram search
   - Type hashtag
   - If it shows posts → hashtag works
   - If no results → hashtag is banned
3. Replace banned hashtags with similar alternatives

**Reference - Verified Working Hashtags**:
```
#BackupPower ✓
#F5000LFP ✓
#EnergyIndependence ✓
#PreparednessProducts ✓
#OffGrid ✓
#PremiumPrep ✓
#Homesteading ✓
#GridResilience ✓
#Sustainability ✓
```

### "Engagement Is Very Low"

**Normal?**: 
- New posts take time to get engagement
- First 1-2 hours shows initial response
- Engagement often peaks at 24-48 hours

**Why might it be low**:
1. Posting time isn't optimal for your audience
2. Caption doesn't have strong hook
3. Hashtags not working (see above)
4. Image/video quality not high
5. Post type not resonating (maybe Carousel works better than Reel)

**What to do**:
1. Respond quickly to every comment (shows activity, helps algorithm)
2. Share post to Stories (adds extra visibility)
3. Next week, try different posting time (8 AM instead of 9 AM)
4. Next week, try different post type (Carousel if been Reels)
5. Review top posts (what resonated?) and mirror that style

### "Video Won't Upload"

**Check video specs**:
```
Format: MP4 ✓ (not MOV, AVI, WMV)
Codec: H.264 ✓ (not HEVC)
Aspect Ratio: 9:16 for Reels ✓
Max Size: 500MB ✓
Duration: 15-30 seconds ✓
Resolution: 1080 x 1920px minimum ✓
```

**If specs are correct**:
1. Try uploading to Content360 again
2. If still fails, try uploading directly to Instagram as test
3. If still fails, re-encode video:
   - Download CapCut (free)
   - Import video
   - Export as "Instagram Reel"
   - Upload that version

### "Links Not Tracking"

**Problem**: Click links in posts but don't see clicks in Google Analytics

**Cause**: UTM parameters might be wrong or Google Analytics filter issue

**Check**:
1. Verify link format in post:
   ```
   SuppliesAreLimited.com/?utm_source=instagram&utm_medium=social&utm_campaign=week1_mon_f5000
   ```
2. In Google Analytics, check:
   - Acquisition → Source/Medium
   - Filter by Source = "instagram"
   - Should show sessions/clicks from today
3. Wait 24 hours for data to populate (sometimes delayed)
4. Check if any filters excluding Instagram traffic

**Fix**:
- Verify UTM parameters are exact
- Test link manually in browser
- Wait longer for analytics to populate
- Check Google Analytics admin for filters

---

## Key Success Metrics

### Daily
- Post published within 5 minutes of 9 AM ET
- No errors in Make.com logs
- Post appears on all selected platforms
- Caption, hashtags, links display correctly

### Weekly
- 3/3 posts published successfully (100%)
- 0 errors in system
- 75+ total engagement (likes + comments + saves)
- 20+ clicks from Instagram to website
- 2+ new followers

### Monthly
- 12/12 posts published (100%)
- 300+ total engagement
- 80+ clicks from Instagram
- 10+ email captures
- 3+ orders from social traffic

### 12-Week Campaign
- 36/36 posts published (100%)
- 1,200+ total engagement
- 300+ website clicks
- 40+ email captures
- 15+ orders
- 50+ new followers

---

## Emergency - Complete System Failure

**If Make.com, Content360, AND Buffer all fail** (unlikely but possible):

### Manual Instagram Posting (5 minutes per post)
1. Open Instagram.com
2. Click Create button (+)
3. Select Reel or Carousel
4. Upload media
5. Add caption (copy from post reference)
6. Add hashtags (copy from post reference)
7. Click Schedule (if future) or Post
8. Select time if needed

### Manual Facebook Posting (3 minutes per post)
1. Go to Facebook page: Supplies Are Limited
2. Click Create Post
3. Upload media
4. Add caption
5. Click Schedule or Post
6. Done

**For 36 posts**: Manual posting would take ~4 hours if all automation fails

**Prevention**: That's why we have Buffer as backup AND Make.com/Content360 redundancy

---

## Contact & Support

### If You Need Help

**For Make.com issues**:
- Make.com docs: https://www.make.com/docs
- Make.com support: support@make.com
- Check scenario execution log first (usually shows problem)

**For Content360 issues**:
- Check Content360 documentation
- Contact Content360 support
- Check API response for error details

**For general automation questions**:
- See `MAKE_CONTENT360_CONFIGURATION.md` (detailed setup)
- See `MAKE_CONTENT360_WORKFLOW.md` (how it works)
- See `MAKE_CONTENT360_CURRENT_STATE.md` (current status)

**For specific post content questions**:
- See `ALL_36_POSTS_BUFFER_REFERENCE.md` (all posts listed)

---

**Last Updated**: September 6, 2026  
**Next Review**: When automation issues arise or schedule changes
