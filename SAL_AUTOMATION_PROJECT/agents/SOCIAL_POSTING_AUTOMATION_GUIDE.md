# Social Posting Automation Guide
## How to Use Make.com + Content360 for Automated Posts

**Date**: September 6, 2026  
**Status**: Complete & Ready  
**For**: Non-technical users

---

## Quick Start (3 Minutes)

### Option 1: Post Via Google Sheets (Easiest)

1. Open Google Sheet: "SAL Content Import Queue"
2. Add a new row with:
   - Date: 2026-09-10
   - Time: 09:00
   - Caption: "Your post text here"
   - Hashtags: #tag1 #tag2 #tag3
   - Platforms: instagram, facebook
   - Media URL: https://...image.jpg
3. Save the sheet
4. **Done!** Make.com automatically posts at the scheduled time

### Option 2: Post Via Content360 Dashboard (Full Control)

1. Log into Content360: https://content360.com/dashboard
2. Click "Create Post"
3. Enter caption and add image
4. Select platforms (Instagram, Facebook, LinkedIn, Threads)
5. Pick schedule date/time: 2026-09-10 @ 09:00 AM
6. Click "Schedule Post"
7. **Done!** Post will go live at the scheduled time

---

## Complete Workflow

### Workflow for Monday Posts (Product Features)

**What to post:**
- Reel or video (30-60 seconds)
- Focus on product features
- Example: "This is what energy independence looks like"

**Step-by-step:**
1. Prepare 30-60 second video of product
2. Record or download video file
3. Upload to Google Drive or accessible URL
4. In Google Sheets add:
   - Date: Next Monday
   - Time: 09:00
   - Caption: Feature description
   - Hashtags: #Preparedness #EnergyIndependence #Products
   - Platforms: instagram, facebook
   - Media URL: [your video URL]
5. Save → **Automatically posts Monday at 9 AM ET**

### Workflow for Wednesday Posts (Educational)

**What to post:**
- Carousel (3-5 slides) or multi-image
- Focus on tips, education, how-to content
- Example: "3 reasons why backup power matters"

**Step-by-step:**
1. Prepare 3-5 images or slides
2. Upload to Google Drive or accessible URL
3. In Google Sheets add:
   - Date: Next Wednesday
   - Time: 09:00
   - Caption: Educational content
   - Hashtags: #Tips #HowTo #Preparedness
   - Platforms: instagram, facebook
   - Media URL: [your image URL]
5. Save → **Automatically posts Wednesday at 9 AM ET**

### Workflow for Friday Posts (Social Proof)

**What to post:**
- Customer testimonial or success story video/image
- Focus on real results
- Example: "Success Story: How one family prepared"

**Step-by-step:**
1. Prepare customer testimonial (video or image + quote)
2. Upload to Google Drive
3. In Google Sheets add:
   - Date: Next Friday
   - Time: 09:00
   - Caption: Customer story
   - Hashtags: #Success #CustomerStory #Results
   - Platforms: instagram, facebook
   - Media URL: [your testimonial URL]
4. Save → **Automatically posts Friday at 9 AM ET**

---

## Common Tasks

### Task 1: Schedule a Post for Next Week

**Method A (Easiest - Google Sheets):**
```
1. Open Google Sheet
2. Fill in one row:
   - Date: 2026-09-15 (your target date)
   - Time: 09:00
   - Caption: "Your post text"
   - Hashtags: "#tag1 #tag2"
   - Platforms: "instagram, facebook"
   - Media URL: "https://..."
3. Save
4. Post automatically goes live at 9 AM ET on that date
```

**Method B (Full Control - Content360):**
```
1. Go to https://content360.com/dashboard
2. Click "Create Post"
3. Add caption
4. Add media
5. Set date to 2026-09-15
6. Set time to 09:00
7. Select platforms
8. Click "Schedule"
9. Post goes live at scheduled time
```

### Task 2: Post Immediately (Not Scheduled)

**Content360:**
```
1. Go to https://content360.com/dashboard
2. Click "Create Post"
3. Add caption and media
4. Choose "Publish Now" instead of "Schedule"
5. Click "Post"
6. Post goes live immediately to all platforms
```

**Note**: Immediate posting is not recommended during launch (schedules 9 AM ET posts).

### Task 3: View Post Performance

**Google Sheets:**
```
1. Open "SAL Content360 Activity Log"
2. Scroll to most recent posts
3. Check columns:
   - Status: "Published" = successful
   - Platforms: Shows where posted
   - Error Message: If blank = no errors
```

**Content360 Dashboard:**
```
1. Go to https://content360.com/dashboard
2. Click "Analytics" or "Reports"
3. View by platform:
   - Instagram: Likes, Comments, Shares, Reach
   - Facebook: Engagement, Reach, Post type performance
   - Threads: Likes, Replies, Reposts
   - Twitter: Likes, Retweets, Replies
```

### Task 4: Edit or Delete a Scheduled Post

**Google Sheets (Before Posting):**
```
1. Open "SAL Content Import Queue"
2. Find the row with your post
3. Edit the data in any column
4. Save
5. Make.com picks up changes and updates Content360
6. Post still goes at scheduled time with new content
```

**Content360 (Before Posting):**
```
1. Go to https://content360.com/dashboard
2. Find post in "Scheduled" tab
3. Click "Edit"
4. Make changes to caption/image/platforms
5. Click "Save"
6. Post updates with new content
```

**Content360 (Delete Scheduled Post):**
```
1. Go to https://content360.com/dashboard
2. Find post in "Scheduled" tab
3. Click "..." menu
4. Click "Delete"
5. Confirm deletion
6. Post removed from schedule
```

### Task 5: Add New Platform (e.g., LinkedIn, Twitter)

**Step 1: Connect Platform in Content360**
```
1. Go to https://content360.com/dashboard
2. Settings → Connected Accounts
3. Click "Connect New Platform"
4. Choose platform (LinkedIn/Twitter/TikTok)
5. Authorize with platform
6. Confirm connection successful
```

**Step 2: Update Google Sheets Format**
```
1. Open "SAL Content Import Queue"
2. In Platforms column, add new platform:
   "instagram, facebook, linkedin"  ← add "linkedin"
3. Save
```

**Step 3: Test with One Post**
```
1. Create test post in Content360
2. Add all platforms including new one
3. Post immediately ("Publish Now")
4. Verify appears on new platform within 5 minutes
5. If successful, proceed with scheduled posts
```

### Task 6: Handle Failed Posts

**If a post fails to publish:**

**Check 1: Verify in Google Sheets**
```
1. Open "SAL Content360 Activity Log"
2. Find the failed post
3. Check "Status" column - says "Error"?
4. Check "Error Message" column for details
```

**Check 2: Verify Platform Connection**
```
1. Go to https://content360.com/dashboard
2. Settings → Connected Accounts
3. Check if platform shows "Connected" or "Expired"
4. If "Expired" - click "Reconnect" and re-authorize
```

**Check 3: Review Post Content**
```
1. Is caption over 300 characters? → Shorten
2. Is video over 25MB? → Compress
3. Do hashtags include banned words? → Remove
4. Is image wrong format? → Convert to JPG/PNG
```

**Check 4: Retry**
```
1. Fix the issue (content/connection)
2. Re-post in Content360
3. Select "Publish Now" or schedule new time
4. Verify successful posting
```

---

## Troubleshooting

### Problem: Post didn't post at scheduled time

**Causes & Solutions:**
```
✗ Platform not connected
  → Go to Content360 Settings → Check all platform connections
  → Reconnect if showing "Expired"

✗ Scheduled time was in past
  → Use future dates/times only
  → "09:00" means 9:00 AM ET (Eastern Time)

✗ Content360 API down
  → Check Content360 status page
  → Try manual post via dashboard
  → Fall back to Buffer if needed

✗ Make.com scenario disabled
  → Go to Make.com dashboard
  → Check if scenario is paused
  → Re-enable if needed
```

### Problem: Post published but captions look wrong on platform

**Causes & Solutions:**
```
✗ Character limit exceeded
  → Instagram/Twitter have character limits
  → Solution: Shorten captions

✗ Hashtags not formatting correctly
  → Ensure hashtags: #tag1 #tag2 #tag3 (no spaces between)
  → Solution: Check hashtag format in post

✗ Line breaks not preserved
  → Some platforms strip formatting
  → Solution: Preview post before scheduling

✗ Media not uploading
  → Check file size (under 25MB)
  → Check format (JPG, PNG, MP4)
  → Solution: Re-upload with correct format
```

### Problem: Can't log into Content360

**Solutions:**
```
1. Verify email is correct (kimhgrubbs@gmail.com)
2. Click "Forgot Password" to reset
3. Check spam folder for password email
4. Try incognito/private browser window
5. Contact Content360 support if still blocked
```

### Problem: Make.com webhook not working

**Solutions:**
```
1. Verify Google Sheets has the correct format
2. Check all required columns exist
3. Verify Make.com scenario is enabled
4. Check Make.com execution logs for errors
5. Manually test in Content360 dashboard as workaround
```

---

## Daily Checklist

### Every Morning (8:00 AM ET)

- [ ] Check "SAL Content360 Activity Log" for any errors
- [ ] Verify today's scheduled post is in queue
- [ ] Check platform connections in Content360
- [ ] Review calendar for upcoming posts (this week)

### Every Evening (6:00 PM ET)

- [ ] Verify today's posts published successfully
- [ ] Check engagement metrics (likes, comments, shares)
- [ ] Note any platform-specific issues
- [ ] Document learnings for next week

### Weekly (Sunday 10:00 AM)

- [ ] Export weekly analytics from Content360
- [ ] Review top-performing posts
- [ ] Analyze platform-specific performance
- [ ] Plan optimizations for next week
- [ ] Schedule next week's content

---

## Emergency Procedures

### If Content360 Is Down

**Immediate Action:**
1. Stop posting via Make.com
2. Switch to Buffer for emergency posting
3. All 36 posts already in Buffer
4. Log into Buffer and manually publish today's post
5. Post takes ~30 minutes to publish manually

**Contact:**
- Content360 Support: support@content360.com
- Wait for service restoration
- Resume automated posting when back online

### If Make.com Is Down

**Immediate Action:**
1. Post manually using Content360 dashboard
2. Takes ~5 minutes per post
3. Or use Buffer (fallback platform)

**Contact:**
- Make.com Support: support@make.com
- Check Make.com status page
- Resume automation when back online

### If All Systems Down

**Fallback Option:**
1. Use Meta Business Suite (Facebook/Instagram)
2. Use LinkedIn native scheduling
3. Use Threads app directly
4. All native platforms allow manual scheduling
5. Estimated time: 30 minutes for one post

---

## API Reference (For Developers)

### Make.com Webhook URL
```
URL: https://hook.make.com/[YOUR-UNIQUE-ID]
Method: POST
Required Fields:
  - caption (string, 1-300 chars)
  - hashtags (string, #tag1 #tag2 format)
  - platforms (array: instagram, facebook, linkedin, threads, twitter)
  - schedule_date (YYYY-MM-DD format)
  - schedule_time (HH:MM format, 24-hour)
  - media_url (HTTPS URL to image)
```

### Content360 API
```
Base URL: https://api.content360.com/v1/
Authentication: Bearer {API_KEY}
Endpoint: POST /content/create

Request Body:
{
  "title": "Post title",
  "body": "Post body",
  "tags": "#tag1 #tag2",
  "platforms": {
    "instagram": true,
    "facebook": true
  },
  "schedule": {
    "datetime": "2026-09-09T09:00:00-04:00"
  }
}

Response:
{
  "status": "success",
  "content_id": "c_12345"
}
```

---

**Guide Status**: Complete  
**Last Updated**: September 6, 2026  
**Support Email**: kimhgrubbs@gmail.com
