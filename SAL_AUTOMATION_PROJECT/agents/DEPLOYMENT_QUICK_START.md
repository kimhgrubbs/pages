# Klavioy Deployment - Quick Start Guide

## TL;DR

The automated deployment blocked due to environment proxy restrictions, but **complete documentation and all scripts are ready**. Execute from your workstation to deploy the 6-email automation.

---

## One-Time Setup (5 minutes)

### Step 1: Copy Files to Your Workstation
```bash
# From your computer, get these files from the project:
# /home/user/pages/SAL_AUTOMATION_PROJECT/agents/klavioy_deployment_guide.md
```

### Step 2: Ensure Prerequisites
```bash
# Verify you have these installed:
which curl    # Should return /usr/bin/curl or similar
which jq      # Should return /usr/bin/jq or similar

# Install if needed:
# macOS: brew install curl jq
# Linux: sudo apt-get install curl jq
# Windows: Use WSL and run Linux commands
```

### Step 3: Test HTTPS Access
```bash
curl -s https://a.klaviyo.com/ -o /dev/null -w "%{http_code}\n"
# Should return: 200 or 301 (not 403)
```

---

## Execution Order

### Credentials
```
API Key: pk_SvmBdA_3d1ce04623d5c304f31a5ec5ea1c655126
Email: kimhgrubbs@gmail.com
Account: SuppliesAreLimited
```

### Execute Tasks in This Order

#### Task 1: Verify API Access (2 min)
Location: `klavioy_deployment_guide.md` > Task 1 section
```bash
# Copy and run the entire "Test Connection Script"
# Expected output: HTTP 200 responses
```
**Document**: Note any errors

#### Task 2: Create Email List (2 min)
Location: `klavioy_deployment_guide.md` > Task 2 section
```bash
# Copy and run the "Create or Verify Email List Script"
# Expected output: LIST_ID (looks like "list_XxXxXx...")
```
**Document**: Save LIST_ID - you'll need it for next steps

#### Task 3: Deploy 6 Emails (10 min)
Location: `klavioy_deployment_guide.md` > Task 3 section
```bash
# Copy and run each of the 6 email creation scripts
# Expected output: 6 EMAIL_IDs (each looks like "email_XxXxXx...")
```
**Document**: Save all 6 EMAIL_IDs in a text file

#### Task 4: Create Automation Flow (5 min)
Location: `klavioy_deployment_guide.md` > Task 4 section
```bash
# Copy the "Create Automation Flow Script"
# Update: Replace LIST_ID and EMAIL_IDs with your saved values
# Run the script
# Expected output: FLOW_ID (looks like "flow_XxXxXx...")
```
**Document**: Save FLOW_ID

#### Task 5: Test Delivery (30 sec + 30 days monitoring)
Location: `klavioy_deployment_guide.md` > Task 5 section
```bash
# Copy and run the "Test Email Delivery Script"
# Update: Replace LIST_ID with your saved value
# This adds kimhgrubbs@gmail.com to test the automation
# Expected: Flow will trigger, Email 1 arrives immediately
```
**Monitor**: Check email inbox over next 30 days:
- Day 0: Email 1 (immediate)
- Day 1: Email 2
- Day 3: Email 3
- Day 7: Email 4
- Day 14: Email 5
- Day 30: Email 6

#### Task 6: Activate for Production (30 sec)
Location: `klavioy_deployment_guide.md` > Task 6 section
```bash
# Copy the "Enable Flow Script"
# Update: Replace FLOW_ID with your saved value
# Run to activate the flow for all new subscribers
```
**Verify**: Flow status changes to "active"

---

## Troubleshooting Quick Reference

### API Key Not Working
- Copy API key: `pk_SvmBdA_3d1ce04623d5c304f31a5ec5ea1c655126`
- Verify no extra spaces or quotes
- Check key hasn't expired in Klavioy account settings

### HTTPS Connection Blocked
- Your network/firewall is blocking a.klaviyo.com
- Try: VPN, different network, or contact IT

### Missing jq Command
```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt-get install jq

# Windows (use WSL)
wsl apt-get install jq
```

### JSON Parse Errors
- Some responses may not have pretty formatting
- Remove `| jq '.'` from the end of curl commands to see raw response

---

## Important Placeholders to Replace

When running scripts from Task 4 onwards, replace these:

```bash
# After Task 2 (List creation), replace:
LIST_ID="your_list_id_here"
# With your actual list ID from Task 2 output

# After Task 3 (Email creation), replace:
EMAIL_1_ID="your_email_1_id"
EMAIL_2_ID="your_email_2_id"
EMAIL_3_ID="your_email_3_id"
EMAIL_4_ID="your_email_4_id"
EMAIL_5_ID="your_email_5_id"
EMAIL_6_ID="your_email_6_id"
# With actual email IDs from Task 3 outputs

# After Task 4 (Flow creation), replace:
FLOW_ID="your_flow_id_here"
# With actual flow ID from Task 4 output
```

---

## Expected Timeline

- **Execution**: ~20 minutes (Tasks 1-6)
- **Testing**: 30 days (verify email delivery)
- **Total**: 30 days + 20 minutes

---

## Files You Need

All scripts are in this single file:
```
/home/user/pages/SAL_AUTOMATION_PROJECT/agents/klavioy_deployment_guide.md
```

Other supporting files:
```
/home/user/pages/SAL_AUTOMATION_PROJECT/agents/klavioy_deployment_report.md
/home/user/pages/SAL_AUTOMATION_PROJECT/agents/DEPLOYMENT_QUICK_START.md (this file)
```

---

## Success Indicators

✓ Task 1: API returns 200 OK  
✓ Task 2: LIST_ID received  
✓ Task 3: 6 EMAIL_IDs received  
✓ Task 4: FLOW_ID received, status "paused"  
✓ Task 5: Email 1 arrives in inbox immediately  
✓ Task 6: Flow activated, status "active"

---

## Rollback Procedure

If something goes wrong:
1. Pause the flow in Klavioy dashboard
2. Delete the test subscriber (kimhgrubbs@gmail.com)
3. Modify and rerun problematic task
4. Contact Klavioy support if API errors persist

---

## Support Resources

- Klavioy Docs: https://developers.klavioy.com/
- API Status: https://status.klaviyo.com/
- Contact Support: support@klaviyo.com

---

## Next: Start with Task 1

Go to: `klavioy_deployment_guide.md` > Task 1 > "Test Connection Script"

Copy that entire bash script and run it in your terminal.

Expected: HTTP 200 responses to 3 API calls
