# Make.com & Content360 Configuration Guide
## Complete Setup Instructions

---

## Table of Contents
1. [Pre-Setup Checklist](#pre-setup-checklist)
2. [Make.com Account Configuration](#makecom-account-configuration)
3. [Content360 Account Configuration](#content360-account-configuration)
4. [API Credentials Setup](#api-credentials-setup)
5. [Make.com Scenario Creation](#makecom-scenario-creation)
6. [Content360 Platform Integration](#content360-platform-integration)
7. [Testing & Validation](#testing--validation)
8. [Troubleshooting](#troubleshooting)

---

## Pre-Setup Checklist

Before starting configuration, verify you have:

### Access Requirements
- [ ] Make.com account access (email: kimhgrubbs@gmail.com)
- [ ] Content360 account access (same email)
- [ ] Admin/owner level access to both accounts
- [ ] Access to generate API keys and webhooks
- [ ] Ability to connect third-party apps

### Content Requirements
- [ ] All 36 posts ready in markdown format
  - **Location**: `/home/user/pages/SAL_AUTOMATION_PROJECT/agents/ALL_36_POSTS_BUFFER_REFERENCE.md`
- [ ] All media files (videos and images) accessible
  - [ ] 12 Reel videos (Mondays)
  - [ ] 12 Carousel image sets (Wednesdays) - 5 images each
  - [ ] 12 Testimonial videos (Fridays)
- [ ] All UTM parameters configured correctly
- [ ] All hashtags verified and finalized

### Technical Requirements
- [ ] Modern web browser (Chrome, Firefox, Safari)
- [ ] Secure password manager for credentials
- [ ] Text editor for credential storage
- [ ] Local credentials folder ready at: `/SAL_AUTOMATION_PROJECT/credentials/`

---

## Make.com Account Configuration

### Step 1: Access Make.com Dashboard

1. Open browser and go to https://www.make.com
2. Click "Sign In" (top right)
3. Enter email: `kimhgrubbs@gmail.com`
4. Enter password
5. Click "Sign In"
6. Complete any 2FA verification if prompted

**Verify**: You should see Make.com dashboard with "Scenarios" tab visible

### Step 2: Review Existing Scenarios

**Action**: Audit all existing scenarios to understand current setup

1. Click "Scenarios" in left sidebar
2. For each scenario, note:
   - **Scenario Name**: [Record exact name]
   - **Status**: Active/Inactive/Error
   - **Trigger Type**: Schedule/Webhook/App Event
   - **Connected Apps**: [List all modules]
   - **Last Run**: [Timestamp]
   - **Scenario ID**: [From URL or details]

**Common Scenarios You May Find**:
- `Instagram Auto-Post` - Posts to Instagram
- `Buffer Integration` - Syncs with Buffer
- `Google Sheets Content` - Reads from Sheets
- `Klavioy Trigger` - Email automation
- `Daily Report` - Sends summary emails

**Document**: Save findings in `/SAL_AUTOMATION_PROJECT/documentation/make_scenarios_audit.md`

### Step 3: Connect Required Apps

Make.com needs authorization with platforms to post content. Some apps may already be connected.

**Action**: Verify these apps are installed and authorized:

#### 3a: Instagram App
1. Click "Apps" in left sidebar
2. Search for "Instagram"
3. If not listed, click "Browse All"
4. Find "Instagram" and click "Add"
5. Click "Authorize" when prompted
6. Log in with Instagram account (@suppliesarelimited)
7. Grant permissions for posting
8. Confirm connection

**Verify**: Status shows "Connected" with account name

#### 3b: Facebook App
1. Click "Apps" in left sidebar
2. Search for "Facebook"
3. Find "Facebook" and click "Add" (if not already connected)
4. Click "Authorize"
5. Log in with Facebook business account
6. Select business page: "Supplies Are Limited"
7. Grant permissions for posting
8. Confirm connection

**Verify**: Status shows "Connected" with page name

#### 3c: HTTP Module (Built-in)
1. This is built into Make.com - no installation needed
2. Used for webhook receivers and API calls
3. Verify in Scenario editor - available in module list

#### 3d: Google Sheets (Optional but Recommended)
1. Click "Apps" in left sidebar
2. Search for "Google Sheets"
3. Click "Add"
4. Authorize with Google account
5. Grant sheet access permissions
6. Confirm connection

**Purpose**: Allows reading content from Google Sheets directly

#### 3e: LinkedIn (if expanding beyond Instagram/Facebook)
1. Click "Apps" in left sidebar
2. Search for "LinkedIn"
3. Click "Add"
4. Authorize with business account
5. Grant posting permissions
6. Confirm connection

**Purpose**: Adds LinkedIn to cross-posting capability

#### 3f: X/Twitter (if expanding)
1. Click "Apps" in left sidebar
2. Search for "X" or "Twitter"
3. Click "Add"
4. Authorize with business account
5. Grant posting permissions
6. Confirm connection

**Purpose**: Adds Twitter/X to cross-posting capability

### Step 4: Generate Webhook URLs

Make.com webhooks allow external systems to send content to Make.com for distribution.

**Action**: Create a webhook receiver scenario

1. Click "Create New Scenario"
2. Select "Webhooks" as trigger
3. In modules panel, search "Webhooks"
4. Click "Custom Webhook"
5. Click "Add"
6. Name the webhook: "Content360 Webhook Receiver"
7. Click "Save"
8. Make.com generates unique webhook URL - copy it
9. **Store safely**: Save to `/SAL_AUTOMATION_PROJECT/credentials/make_webhook_url.txt`

**Format of webhook URL**:
```
https://hook.make.com/[unique-identifier]
```

**This URL goes to**:
- Content360 API configuration (for receiving posted content)
- Or direct submission form (for manual posting)

### Step 5: Configure API Rate Limits

Make.com has rate limits. Configure appropriately:

1. Click "Settings" (bottom left)
2. Click "Account"
3. Look for "API Rate Limits"
4. Set limits:
   - **Per-second requests**: 10-20 (depending on plan)
   - **Concurrent scenarios**: 5-10
   - **Queue timeout**: 300 seconds

**Note**: Exact limits depend on Make.com plan. Premium plans have higher limits.

**For 36 posts posting 3x/week**: Current limits should be sufficient

---

## Content360 Account Configuration

### Step 1: Access Content360 Dashboard

1. Open browser and go to https://www.content360.com
2. Click "Sign In"
3. Enter email: `kimhgrubbs@gmail.com`
4. Enter password
5. Click "Sign In"
6. Complete any verification if prompted

**Verify**: You see Content360 dashboard with "Platforms", "Calendar", "Publish" tabs

### Step 2: Connect Social Platforms

Content360 distributes posts to multiple platforms. Each must be individually authorized.

#### 2a: Connect Instagram

1. Click "Settings" or "Integrations" tab
2. Click "Add Platform" or "Connect New Account"
3. Select "Instagram"
4. Click "Authorize"
5. Log in with Instagram account (@suppliesarelimited)
6. Grant Content360 permission to:
   - Post content
   - View analytics
   - Manage hashtags
7. Confirm connection
8. Verify account shows: "@suppliesarelimited - Connected ✓"

**Save Connection Details**:
- Platform: Instagram
- Account: @suppliesarelimited
- Permission Level: Post + Analytics
- Connected Date: [Today's date]

#### 2b: Connect Facebook

1. Click "Add Platform" or "Connect New Account"
2. Select "Facebook"
3. Click "Authorize"
4. Log in with Facebook business account
5. Select business page: "Supplies Are Limited"
6. Grant permissions:
   - Post content
   - View page insights
   - Manage page
7. Confirm connection
8. Verify page shows: "Supplies Are Limited - Connected ✓"

**Save Connection Details**:
- Platform: Facebook
- Account: Supplies Are Limited (page)
- Permission Level: Post + Analytics
- Connected Date: [Today's date]

#### 2c: Connect LinkedIn (Optional - for expanded reach)

1. Click "Add Platform"
2. Select "LinkedIn"
3. Click "Authorize"
4. Log in with LinkedIn business account
5. Select company page
6. Grant permissions
7. Confirm connection

**Purpose**: Adds LinkedIn to cross-posting. Use for B2B content when relevant.

#### 2d: Connect Threads (Optional - Meta ecosystem)

1. Click "Add Platform"
2. Select "Threads"
3. Click "Authorize"
4. Verify connection
5. Confirm

**Purpose**: Adds Threads (Meta's Twitter alternative) to distribution

#### 2e: Connect TikTok (Optional - if pursuing TikTok audience)

1. Click "Add Platform"
2. Select "TikTok"
3. Click "Authorize"
4. Log in with TikTok business account
5. Grant permissions
6. Confirm

**Note**: TikTok has stricter requirements. May need business account approval.

### Step 3: Generate API Key

Content360 API requires authentication key.

1. Click "Settings"
2. Click "API" or "Developer"
3. Click "Generate API Key"
4. Copy the key: `[long-string-of-characters]`
5. **Store securely**: Save to `/SAL_AUTOMATION_PROJECT/credentials/content360_api_key.txt`

**API Key Format**:
```
Content360-API-Key: [key-value-here]
```

**Keep Safe**: Never share this key. It allows posting to all connected platforms.

### Step 4: Get Organization & Account IDs

Content360 API calls need organization and account identifiers.

1. Click "Settings"
2. Look for "Organization" or "Account" section
3. Find and copy:
   - **Organization ID**: [Copy this]
   - **Account ID**: [Copy this]
   - **Workspace ID** (if shown): [Copy this]
4. **Store**: Save to `/SAL_AUTOMATION_PROJECT/credentials/content360_ids.txt`

**Format**:
```
Organization ID: [value]
Account ID: [value]
Workspace ID: [value]
Content360 API Endpoint: https://api.content360.com/v1/
```

### Step 5: Configure Posting Settings

Set default rules for all posts.

1. Click "Settings"
2. Click "Posting Defaults" or "Preferences"
3. Configure:
   - **Default Timezone**: Eastern Time (ET)
   - **Auto-save Drafts**: ON
   - **Analytics Tracking**: ON
   - **Cross-platform Optimization**: ON
   - **Hashtag Management**: ENABLE
   - **Caption Formatting**: PRESERVE (don't auto-shorten)
4. Click "Save"

### Step 6: Set Up Calendar View

This helps visualize all scheduled posts.

1. Click "Calendar" tab
2. Click "Settings" (calendar options)
3. Configure:
   - **View Mode**: Month + Week (toggle-able)
   - **Show Analytics**: ON
   - **Timezone Display**: ET
   - **Color-code by Platform**: ON
4. Save settings

---

## API Credentials Setup

### Secure Credential Storage

Create secure local storage for all API credentials.

**Directory**: `/SAL_AUTOMATION_PROJECT/credentials/`

**Files to create**:

#### 1. `make_webhook_url.txt`
```
Make.com Webhook URL
=====================

Webhook Name: Content360 Webhook Receiver
Webhook URL: https://hook.make.com/[your-unique-id]

Purpose: Receives POST requests from Content360 with new content
Method: POST
Headers: Content-Type: application/json

Created: [Today's date]
```

#### 2. `make_api_credentials.txt`
```
Make.com API Credentials
========================

Account Email: kimhgrubbs@gmail.com
Account Status: Active
API Documentation: https://www.make.com/en/help/developer

Rate Limits:
- Requests per second: [Check your plan]
- Concurrent scenarios: [Check your plan]
- Queue timeout: 300 seconds

Scenario Status Check Endpoint:
https://make.com/api/v1/scenarios/[scenario-id]/status

Authentication: OAuth token (auto-managed in UI)
```

#### 3. `content360_api_key.txt`
```
Content360 API Credentials
==========================

API Key: [Your 64-character key here]
Base Endpoint: https://api.content360.com/v1/
Account Email: kimhgrubbs@gmail.com
Organization ID: [Your org ID]
Account ID: [Your account ID]

Example API Call:
curl -H "Authorization: Bearer [api-key]" https://api.content360.com/v1/posts

Keep this file PRIVATE - never commit to git
```

#### 4. `platform_access_tokens.txt`
```
Platform Access Tokens
======================

Instagram (@suppliesarelimited):
- Status: Connected in Content360
- Expires: [Check in settings]
- Permissions: Post, Analytics, Hashtag Management

Facebook (Supplies Are Limited page):
- Status: Connected in Content360
- Expires: [Check in settings]
- Permissions: Post, Page Analytics, Page Management

LinkedIn (if connected):
- Status: [Connected/Not Connected]
- Expires: [Check in settings]
- Permissions: [List permissions]

Threads (if connected):
- Status: [Connected/Not Connected]

TikTok (if connected):
- Status: [Connected/Not Connected]

Note: OAuth tokens typically expire 60-90 days after connection
Recommendation: Check monthly and refresh if needed
```

#### 5. `.gitignore` (Prevent accidental commit)
```
# Credentials - NEVER commit these
*.txt
!.gitignore
credentials/
!credentials/.gitignore

# Sensitive files
.env
.env.local
*.key
*.pem
*.p12
```

### Credential Access Permissions

Set folder permissions to restrict access:

```bash
# Linux/Mac: Restrict to owner only
chmod 700 /SAL_AUTOMATION_PROJECT/credentials/
chmod 600 /SAL_AUTOMATION_PROJECT/credentials/*.txt

# Verify only owner can read:
ls -la /SAL_AUTOMATION_PROJECT/credentials/
```

### Credential Rotation Schedule

OAuth tokens expire. Set reminders:

1. **Monthly Review**: Check all token expiration dates
2. **Refresh Before Expiration**: Refresh tokens 1-2 weeks before expiry
3. **Emergency Refresh**: If post fails due to auth error, refresh immediately

**Reminder Dates**:
- [ ] 1st of every month - Check all tokens
- [ ] 2 weeks before expiration - Refresh (exact dates TBD)

---

## Make.com Scenario Creation

### Scenario 1: Content360 Webhook Receiver

This scenario receives content from Content360 API and formats it for distribution.

#### Step 1: Create Scenario

1. Click "Create New Scenario"
2. Name it: `Content360 Webhook Receiver`
3. Set module 1: Webhooks → Custom Webhook
4. Click "Add"

#### Step 2: Configure Webhook Trigger

1. Name webhook: "Content360 Incoming Post"
2. Leave other settings default
3. Click "Save"
4. Copy webhook URL and store in credentials
5. Click "Next"

#### Step 3: Add Content Router Module

1. Click "+" to add module
2. Search "Router" or "Flow"
3. Select "Router"
4. This allows different paths based on content type
5. Click "Add"

#### Step 4: Add Conditional Paths

Create separate paths for different content types:

**Path 1: Instagram/Facebook Post**
1. On Router, create first path: "Instagram Post"
2. Add module: Instagram → Create a Media Item
3. Configure fields:
   - **Media Type**: Based on webhook (image/video)
   - **Caption**: From webhook payload
   - **Hashtags**: From webhook payload
   - **Link**: From webhook payload (in caption)
4. Click "Save"

**Path 2: Multi-Platform Post**
1. On Router, create second path: "Multi-Platform"
2. Add modules for each platform:
   - Instagram → Create Media
   - Facebook → Create Post
   - (LinkedIn → Create Post, if connected)
   - (Threads → Create Post, if connected)
3. Each uses content from webhook with platform-specific formatting
4. Click "Save"

#### Step 5: Add Error Handling

1. Click "+" to add module
2. Search "Router"
3. Add error path
4. Add module: Email → Send Email
5. Configure:
   - **To**: kimhgrubbs@gmail.com
   - **Subject**: "Make.com Posting Error"
   - **Body**: Error details from system
6. Click "Save"

#### Step 6: Test Scenario

1. Click "Test"
2. Send test webhook payload (example below)
3. Verify modules execute correctly
4. Check errors
5. Fix any issues
6. Click "Save and Run"

**Test Webhook Payload**:
```json
{
  "post_type": "instagram_carousel",
  "caption": "Premium preparedness: Power + Water + Food.\n\nWhen systems fail, your life stays normal.\n\nSwipe to see what actual resilience looks like →",
  "hashtags": "#PreparednessProducts #EnergyIndependence #Homesteading",
  "image_urls": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
    "https://example.com/image4.jpg",
    "https://example.com/image5.jpg"
  ],
  "platforms": ["instagram", "facebook"],
  "scheduled_time": "2026-09-04T09:00:00-04:00",
  "utm_link": "SuppliesAreLimited.com/?utm_source=instagram&utm_medium=social&utm_campaign=week1_wed_prep"
}
```

### Scenario 2: Google Sheets Content Trigger (Optional)

This scenario reads from Google Sheets and automatically posts when triggered.

#### Step 1: Create Scenario
1. Click "Create New Scenario"
2. Name: `Google Sheets to Content360`
3. Set trigger: Google Sheets → New Row Added
4. Click "Add"

#### Step 2: Configure Google Sheets Trigger

1. Connect to Google Sheets account
2. Select spreadsheet: "SAL Automation Content Queue"
3. Select sheet: "Content to Post"
4. Configure columns:
   - **A**: Post ID (auto-increment)
   - **B**: Caption
   - **C**: Hashtags
   - **D**: Image URLs (comma-separated)
   - **E**: Video URL (optional)
   - **F**: Platforms (comma-separated: instagram,facebook)
   - **G**: Scheduled Time (YYYY-MM-DD HH:MM:SS ET format)
   - **H**: Status (will be filled by scenario)

#### Step 3: Format Content

1. Add module: Text → Replace (optional)
   - Format captions to match platform requirements
   - Handle line breaks correctly
   - Clean up hashtags

#### Step 4: Send to Content360

1. Add module: HTTP → Make a Request
2. Configure:
   - **URL**: `https://api.content360.com/v1/posts`
   - **Method**: POST
   - **Headers**:
     ```
     Authorization: Bearer [content360_api_key]
     Content-Type: application/json
     ```
   - **Body**: (JSON format matching Content360 API spec)

#### Step 5: Update Google Sheets Status

1. Add module: Google Sheets → Update Cell
2. Configure:
   - **Column H (Status)**: Update to "Posted" or "Scheduled"
   - **Add Timestamp**: When posted

### Scenario 3: Daily Scheduled Post (Recurring)

This scenario posts on a regular schedule (e.g., Mon/Wed/Fri at 9 AM ET).

#### Step 1: Create Scenario
1. Click "Create New Scenario"
2. Name: `Daily Content Post - 9 AM ET`
3. Set trigger: Schedule
4. Click "Add"

#### Step 2: Configure Schedule Trigger

1. Set frequency: Custom
2. Configure:
   - **Days**: Monday, Wednesday, Friday
   - **Time**: 09:00 (9 AM)
   - **Timezone**: Eastern Time (ET)
   - **Repeat**: Weekly until [end date]
3. Click "Save"

#### Step 3: Add Content Lookup

1. Add module: Airtable or Google Sheets → Search Records
2. Configure:
   - **Lookup**: Get next post scheduled for today
   - **Order**: By ID ascending (FIFO - first in, first out)
   - **Limit**: 1 record

#### Step 4: Post to Platforms

1. Add module: Content360 → Create Post (if available)
   Or HTTP → Make a Request
2. Use content from lookup module
3. Configure for each platform (Instagram, Facebook, etc.)
4. Click "Save"

---

## Content360 Platform Integration

### Step 1: Configure Post Format

Content360 requires specific JSON format for API posts.

**Standard Post Format**:
```json
{
  "title": "Post Title or ID",
  "content": {
    "text": "Caption text with line breaks preserved",
    "hashtags": ["#BackupPower", "#F5000LFP", "#EnergyIndependence"],
    "url": "https://SuppliesAreLimited.com/?utm_source=instagram&utm_medium=social&utm_campaign=week1_mon_f5000"
  },
  "media": {
    "type": "video", // or "image", "carousel"
    "url": "https://cdn.example.com/video.mp4",
    "alt_text": "Product demonstration video"
  },
  "platforms": ["instagram", "facebook"],
  "publish_settings": {
    "schedule_type": "specific_time",
    "publish_time": "2026-09-02T09:00:00-04:00",
    "timezone": "America/New_York"
  },
  "performance_tracking": {
    "track_clicks": true,
    "track_conversions": true,
    "utm_source": "instagram",
    "utm_medium": "social",
    "utm_campaign": "week1_mon_f5000"
  }
}
```

### Step 2: Configure Bulk Import

For importing all 36 posts at once:

1. In Content360, look for "Import" or "Bulk Upload"
2. Choose import format:
   - [ ] CSV file
   - [ ] JSON file
   - [ ] API batch
3. Prepare file with all 36 posts
4. Upload and verify
5. Click "Confirm Import"

**CSV Format Example**:
```
Post ID | Caption | Hashtags | Media URL | Post Type | Platform | Schedule Time
Week1_Mon | "This is what energy independence looks like..." | "#BackupPower #F5000LFP" | https://... | video | instagram,facebook | 2026-09-02 09:00 ET
```

### Step 3: Set Approval Workflow (Optional)

If requiring approval before posting:

1. Click "Settings"
2. Click "Workflow"
3. Enable "Approval Required"
4. Set approval groups: (you)
5. Configure notification:
   - Email notification when pending approval
   - 24-hour auto-publish if not approved (optional)

### Step 4: Configure Analytics Tracking

1. Click "Analytics" or "Settings"
2. Enable tracking for:
   - Clicks
   - Conversions
   - Engagement (likes, comments, shares)
   - Reach and impressions
   - Follower growth
3. Verify Google Analytics integration (if needed)
4. Save

---

## Testing & Validation

### Test 1: Single Post to Single Platform

**Objective**: Verify basic posting works

**Steps**:
1. Create test post in Content360
2. Select Instagram only
3. Set schedule: In 5 minutes
4. Click "Schedule" or "Publish"
5. Wait for scheduled time
6. Check @suppliesarelimited Instagram
7. Verify post appears with correct:
   - [ ] Caption
   - [ ] Hashtags
   - [ ] Image/video
   - [ ] Link in caption

**Result**: ✓ Post visible on Instagram with correct formatting

### Test 2: Single Post to Multiple Platforms

**Objective**: Verify cross-platform posting

**Steps**:
1. Create test post in Content360
2. Select: Instagram + Facebook
3. Set schedule: In 5 minutes
4. Click "Schedule"
5. Wait for scheduled time
6. Check both platforms:
   - @suppliesarelimited (Instagram)
   - Supplies Are Limited page (Facebook)
7. Verify formatting matches

**Result**: ✓ Post appears on both platforms

### Test 3: Video Reel Posting

**Objective**: Verify video posts work (critical for Mondays)

**Steps**:
1. Select test video from media library (or upload)
2. Create post in Content360
3. Set type: Reel/Video
4. Add caption + hashtags
5. Select: Instagram + Facebook
6. Schedule for 5 minutes
7. Monitor posting
8. Check Instagram for Reel appearance
9. Check if plays with sound
10. Verify caption displays correctly

**Result**: ✓ Reel posts and plays on Instagram

### Test 4: Carousel Posting

**Objective**: Verify multi-image carousel posts (critical for Wednesdays)

**Steps**:
1. Select test carousel images (5 images)
2. Create post in Content360
3. Set type: Carousel
4. Add main caption
5. Select: Instagram + Facebook
6. Schedule for 5 minutes
7. Monitor posting
8. Check Instagram carousel
9. Verify all 5 images appear in correct order
10. Test swipe functionality on mobile

**Result**: ✓ Carousel posts with all images in correct order

### Test 5: Hashtag & Link Handling

**Objective**: Verify hashtags work and links are clickable

**Steps**:
1. Create post with hashtags: #BackupPower #F5000LFP
2. Add link: SuppliesAreLimited.com/?utm_...
3. Schedule post
4. After posting, verify:
   - [ ] Hashtags are clickable on Instagram/Facebook
   - [ ] Link is clickable and goes to correct URL
   - [ ] Link includes correct UTM parameters
   - [ ] Google Analytics shows the click

**Result**: ✓ All hashtags and links work correctly

### Test 6: Scheduling at Specific Time

**Objective**: Verify posts publish at exact scheduled time

**Steps**:
1. Note current time: [HH:MM]
2. Create test post
3. Schedule for exactly 5 minutes from now
4. Click "Schedule"
5. Note content in calendar
6. Wait for scheduled time
7. Refresh Instagram at exact scheduled time
8. Verify post appears within 1 minute of scheduled time

**Result**: ✓ Post publishes within 1 minute of scheduled time

### Test 7: Error Handling

**Objective**: Verify system handles posting errors gracefully

**Steps**:
1. Intentionally create invalid post (e.g., missing media)
2. Try to schedule
3. System should show error message
4. Verify error is descriptive
5. Fix error
6. Try again
7. Post should succeed

**Result**: ✓ System provides helpful error messages

### Test 8: Platform-Specific Formatting

**Objective**: Verify captions display correctly on each platform

**Steps**:
1. Create post with:
   - Line breaks in caption
   - Emojis (e.g., 🔋)
   - Multiple hashtags
   - Long URL
2. Post to Instagram
3. Check formatting on:
   - [ ] Mobile web
   - [ ] Mobile app
   - [ ] Desktop web
4. Verify no broken formatting

**Result**: ✓ Captions display correctly on all views

---

## Troubleshooting

### Issue: Posts Not Appearing on Platform

**Symptoms**: Post scheduled but doesn't appear on Instagram/Facebook

**Causes**:
1. Platform authorization expired
2. Account permissions changed
3. Content360 rate-limited by platform
4. Network connection failure

**Solutions**:
1. Check Content360 platform connections
2. Re-authorize Instagram/Facebook in Content360
3. Verify API key is valid
4. Check Make.com scenario logs for errors
5. Try posting single image (simpler than video)
6. Wait 5-10 minutes (platform processing delay)

**Prevention**:
- Monthly token refresh
- Monitor scenario execution logs
- Set up alerting for posting failures

### Issue: Hashtags Not Working

**Symptoms**: Hashtags appear in post but don't link/work

**Causes**:
1. Hashtag is shadowbanned
2. Typo in hashtag
3. Platform-specific hashtag restrictions
4. Too many hashtags

**Solutions**:
1. Verify spelling
2. Search hashtag on platform to confirm it works
3. Reduce hashtag count to 8-10
4. Remove any special characters
5. Test hashtag separately first

**Relevant Hashtags**:
- #BackupPower ✓
- #F5000LFP ✓
- #EnergyIndependence ✓
- #PreparednessProducts ✓
- #OffGrid ✓

### Issue: Video/Reel Not Uploading

**Symptoms**: Video file won't upload to Content360 or platforms

**Causes**:
1. File too large (>500MB for Instagram)
2. Wrong video codec (need H.264)
3. Wrong aspect ratio (need 9:16 for Reels)
4. Network upload interrupted
5. File corrupted

**Solutions**:
1. Check video file specs:
   ```
   Duration: 15-30 seconds ✓
   Aspect Ratio: 9:16 (vertical) ✓
   Resolution: 1080 x 1920px minimum ✓
   File Size: < 500MB ✓
   Codec: H.264 ✓
   ```
2. Re-encode video in CapCut or Adobe
3. Retry upload via Content360 web UI
4. Check internet connection speed
5. Contact Content360 support if persists

### Issue: Links in Posts Not Tracking

**Symptoms**: UTM parameters in links not showing clicks in Google Analytics

**Causes**:
1. UTM parameters incorrect
2. Google Analytics not configured to track social source
3. Link clicked but JavaScript disabled in browser
4. Google Analytics filter excluding traffic source

**Solutions**:
1. Verify UTM format is correct:
   ```
   ?utm_source=instagram&utm_medium=social&utm_campaign=week1_mon_f5000
   ```
2. Check Google Analytics:
   - Acquisition → Source/Medium
   - Filter by "instagram / social"
3. Test link manually in browser
4. Wait 24 hours for data to populate
5. Check Google Analytics Admin for filters

### Issue: API Key Not Working

**Symptoms**: Error when trying to use Content360 API

**Error Message**: "401 Unauthorized" or "Invalid API Key"

**Solutions**:
1. Verify API key is correct
   ```
   Check: /SAL_AUTOMATION_PROJECT/credentials/content360_api_key.txt
   ```
2. Regenerate API key in Content360:
   - Settings → API
   - Click "Regenerate Key"
   - Copy new key and update credential file
3. Verify key in API header format:
   ```
   Authorization: Bearer [key-value]
   ```
4. Check if key has expired (typically 1 year)
5. Verify API endpoint is correct:
   ```
   https://api.content360.com/v1/
   ```

### Issue: Webhook Not Receiving Posts

**Symptoms**: Make.com scenario listening on webhook but no data arriving

**Causes**:
1. Webhook URL incorrect in Content360
2. Firewall blocking webhook
3. Make.com scenario not listening
4. Content360 not configured to send webhooks

**Solutions**:
1. Verify webhook URL in Make.com:
   - Copy exact URL from Make.com scenario
   - Store in credentials: `make_webhook_url.txt`
2. Verify webhook configured in Content360:
   - Settings → Webhooks or Integrations
   - Add webhook URL pointing to Make.com
   - Verify it's enabled (not disabled)
3. Test webhook manually:
   ```bash
   curl -X POST https://hook.make.com/[id] \
     -H "Content-Type: application/json" \
     -d '{"test":"data"}'
   ```
4. Check Make.com scenario execution logs:
   - Click scenario
   - Click "Execution log"
   - Look for incoming webhook calls

### Issue: Rate Limiting / Too Many Requests

**Symptoms**: Posting fails with "Rate limit exceeded" error

**Causes**:
1. Posting too many times per second
2. Multiple Make.com scenarios running simultaneously
3. Content360 API rate limits exceeded
4. Platform (Instagram/Facebook) rate limiting

**Solutions**:
1. Add delays between posts (1-2 minutes minimum)
2. Ensure only one Make.com scenario runs at a time
3. Space out the 36 posts over 12 weeks (not all at once)
4. Follow this schedule:
   - 3 posts per week (Mon/Wed/Fri)
   - 1-2 minute delay between platform posts
   - 24-hour delay between similar content types

5. Implement exponential backoff in Make.com:
   - If request fails, wait 5 seconds
   - If fails again, wait 30 seconds
   - If fails again, wait 5 minutes
   - Alert user after 3 failures

---

## Success Criteria

By end of configuration phase:

- [x] Make.com account fully set up
- [x] Content360 account fully set up
- [x] All platform connections verified
- [x] API credentials generated and stored securely
- [x] All 8 test cases passed
- [x] Make.com scenarios created and tested
- [x] Content360 webhook receiving data correctly
- [x] Error handling implemented
- [x] Monitoring and alerting configured
- [x] Backup procedure documented

**When ready**: Proceed to bulk import of 36 posts.

---

**Last Updated**: September 6, 2026  
**Next Phase**: MAKE_CONTENT360_WORKFLOW.md
