# SAL Discord Server Configuration Reference

Quick reference guide for server settings, channel list, and role permissions.

---

## SERVER SETTINGS AT A GLANCE

| Setting | Value | Purpose |
|---------|-------|---------|
| **Name** | Supplies Are Limited Community | Clear, mission-aligned |
| **Description** | Understanding supply chains. Building resilience. Together. | Sets tone on join screen |
| **Region** | US (Eastern) | Optimize for user latency |
| **Verification Level** | Medium (Email required) | Reduce bot/spam accounts |
| **Content Filter** | Medium | Catch spam/profanity without over-filtering |
| **2FA Requirement** | No | Keep barrier to entry low |
| **Default Notification** | All messages | Engage early members |
| **Explicit Content Filter** | Medium | Standard moderation |

---

## COMPLETE CHANNEL LIST & ORGANIZATION

### Category 1: Welcome & Orientation

| Channel | Purpose | Permissions |
|---------|---------|-------------|
| **#welcome** | Mission, values, how to start. Pinned: welcome message + guidelines. | Moderator posts only. Everyone can view. |
| **#introductions** | Members introduce themselves. Entry point for psychological safety. | Community Member can post & view. Verified can post & view. |
| **#faq** | Growing document of community questions and answers. | Moderator posts FAQ. Members can start threads. |

**Setup:** 
- Pin welcome message in #welcome
- Pin community guidelines in #welcome
- Post introduction prompt in #introductions
- Post 2-3 initial FAQs in #faq

---

### Category 2: Supply Chain Intelligence

| Channel | Purpose | Permissions |
|---------|---------|-------------|
| **#supply-chain-alerts** | Weekly data posts. Beef, wheat, energy, fertilizer, honey. Sourced, clear. | Moderator posts alerts. Members can reply in threads. |
| **#market-discussion** | Ongoing discussion of supply trends. Local observations, questions, connections. | Verified can post. Community Member can view. |
| **#resources** | Curated links: USDA data, commodity tracking, agricultural reports, research. | Moderator posts resources. Members can suggest in threads. |

**Slow Mode:** Enable 1 message/10 seconds in #supply-chain-alerts and #market-discussion (can be disabled later if community stabilizes)

---

### Category 3: Strategy & Psychology

| Channel | Purpose | Permissions |
|---------|---------|-------------|
| **#decision-making** | Psychological frameworks. System 1/2 thinking, reducing anxiety, building agency. | Verified can post. Community Member can view. |
| **#planning-together** | Members share strategies, ask for input, learn from each other. Collective problem-solving. | Verified can post. Community Member can view. |
| **#research-library** | Psychology papers, behavioral research, evidence-based frameworks. Curated depth. | Moderator posts, members suggest. Thread discussions. |

**Setup:** 
- Post first framework post in #decision-making on Week 1, Wednesday
- Start first #planning-together discussion prompt: "What decision are you wrestling with?"

---

### Category 4: Action & Progress

| Channel | Purpose | Permissions |
|---------|---------|-------------|
| **#first-steps** | Weekly thread: "What are you doing this week?" Small, concrete actions. Baseline pricing, sourcing, learning. | Verified can post. Community Member can view. |
| **#wins-and-progress** | Celebrate wins (big and small). Build agency. Share what's working. Culture of success. | Verified can post. Community Member can view. |
| **#local-solutions** | Share local resources. Farmer's markets, co-ops, bulk suppliers, community gardens, networks. | Verified can post. Community Member can view. |

**Setup:**
- Post first #first-steps thread on launch day
- Create #wins-and-progress highlight posts as members achieve things

---

### Category 5: Community & Connection

| Channel | Purpose | Permissions |
|---------|---------|-------------|
| **#member-stories** | Member spotlights. How they got started, what they've learned. Deep personal context. | Members can post (eventually), Moderator creates features. |
| **#biohoods** | Community resilience projects, neighborhood collaboration, local networks forming. | Verified can post. Community Member can view. |
| **#introduce-others** | Members bring friends to community. Warm introductions, breaking isolation. | Verified can post. Community Member can view. |

**Setup:**
- Start member spotlight interviews in Week 2
- Create first #biohoods regional thread as members from same region emerge

---

### Category 6: Support & Questions

| Channel | Purpose | Permissions |
|---------|---------|-------------|
| **#ask-anything** | No-judgment space. Collective problem-solving. Safety for uncertainty. | Community Member can post (everyone). |
| **#technical-help** | Platform help. Discord navigation, SAL resource questions. | Community Member can post (everyone). |

**Setup:**
- Post first prompt in #ask-anything on launch day
- These channels are entry points—keep them welcoming

---

### Category 7: Announcements

| Channel | Purpose | Permissions |
|---------|---------|-------------|
| **#announcements** | New content, events, official updates from Supplies Are Limited. One-way messaging. | Moderator posts only. Everyone can view. |

**Setup:**
- Reserve for important updates, not daily chat
- Post launch announcements here

---

## ROLE CONFIGURATION

### Role: @Moderator

**Color:** Purple (#7289da or similar)

**Permissions (Admin Level):**
- Manage Server
- Manage Roles
- Manage Channels
- Manage Messages (pin/delete/edit)
- Moderate Members (timeout/ban)
- Manage Threads
- Send Messages in All Channels
- Mention @everyone/@here/@role

**Who Gets This:** 2-3 trusted team members

**Responsibilities:**
- Welcome members
- Moderate discussions
- Post seed content on schedule
- Manage community guidelines
- Report to leadership on community health

---

### Role: @Verified

**Color:** Green (#43b581 or similar)

**Permissions:**
- View Channels
- Send Messages
- Send Messages in Threads
- Create Public Threads
- Edit Own Messages
- Read Message History
- Mention @everyone (optional, disable if spam risk)

**Who Gets This:** Any member who introduces themselves in #introductions

**How It's Assigned:**
- Manual assignment by moderator (first week)
- Can be automated if Discord bot available (later)
- Right-click member → Add Role

---

### Role: @Community Member

**Color:** Gray (#808080 or similar)

**Permissions:**
- View Channels (limited to #welcome, #introductions, #faq, #ask-anything, #technical-help)
- Send Messages (only in #introductions, #ask-anything, #technical-help)
- Read Message History
- React to Messages

**Who Gets This:** Default role on join

**How It's Assigned:** Automatic (default role)

**Purpose:** New members can introduce themselves and ask questions before exploring full community. Prevents lurking and builds participation.

---

## PERMISSION SETTINGS BY CHANNEL

### Public Channels (Community Member Can View)
- #welcome
- #introductions
- #faq
- #supply-chain-alerts
- #market-discussion
- #resources
- #decision-making
- #planning-together
- #research-library
- #first-steps
- #wins-and-progress
- #local-solutions
- #member-stories
- #biohoods
- #introduce-others
- #ask-anything
- #technical-help
- #announcements

### Posting Restricted to Moderator
- #welcome (mod posts only, discussions in threads if enabled)
- #announcements (mod posts only)
- #faq (mod posts, threads enabled)

### Posting Open to Community Member
- #ask-anything
- #introductions
- #technical-help

### Posting Open to Verified
- #first-steps
- #planning-together
- #market-discussion
- #decision-making
- #wins-and-progress
- #local-solutions
- #introduce-others
- #biohoods
- #member-stories (eventually)

### Slow Mode Enabled
- #supply-chain-alerts (1 msg/10 sec initially)
- #market-discussion (1 msg/10 sec initially)
- #first-steps (1 msg/10 sec initially, can disable after Week 1)

---

## INITIAL PIN MESSAGES

### Pin in #welcome (2 Pins)

**Pin 1: Welcome Message** (See DISCORD_SETUP_COPY_READY_CONTENT.md)
```
Welcome to Supplies Are Limited Community.

You're here because you've noticed something: the world is changing...
[Full welcome message]
```

**Pin 2: Community Guidelines** (See DISCORD_SETUP_COPY_READY_CONTENT.md)
```
SAL COMMUNITY GUIDELINES

What We Welcome:
✓ Questions (especially "I don't understand...")
[Full guidelines]
```

### Optional Pins

**#introductions**
- Introductions prompt (helps new members understand format)

**#faq**
- Not a pin (channel itself is the FAQ, updated as questions emerge)

---

## DISCORD BOT CONFIGURATION (Optional, Later)

If using a Discord bot for moderation/welcome automation:

**Welcome Bot:**
- Sends welcome DM to new members
- Auto-assigns Community Member role
- Prompts them to introduce themselves

**Moderator Utilities:**
- !pin [message] (quick pinning)
- !mute [member] (timeout)
- !ban [member] (removal)
- Auto-responses for common questions

**Note:** Start without bot. Build culture manually. Add bot if it scales beyond 200+ members and moderation becomes time-consuming.

---

## CHANNEL CREATION ORDER (For Setup Day)

1. Create all categories first (better organization)
2. Create Welcome & Orientation channels
3. Create Supply Chain Intelligence channels
4. Create Strategy & Psychology channels
5. Create Action & Progress channels
6. Create Community & Connection channels
7. Create Support & Questions channels
8. Create Announcements channel
9. Set all permissions
10. Post core messages (welcome, guidelines, introductions prompt, FAQ)
11. Test as new member

---

## TESTING CHECKLIST (Before Launch)

### As Admin
- [ ] All channels created and visible
- [ ] All roles created
- [ ] Permissions look correct (test by role)
- [ ] Pinned messages visible in #welcome
- [ ] Slow mode enabled
- [ ] Server name/description/icon correct

### As Verified Member
- [ ] Can see all channels
- [ ] Can post in #first-steps, #planning-together, etc.
- [ ] Can reply to posts
- [ ] Can create threads

### As Community Member (New Account)
- [ ] Can see #welcome, #introductions, #faq, #ask-anything, #technical-help
- [ ] Can't see #first-steps, #planning-together, etc. (restricted)
- [ ] Can post in #introductions
- [ ] Can post in #ask-anything
- [ ] Welcome message is visible and easy to find

### Mobile
- [ ] Server loads correctly on phone
- [ ] Channels are legible
- [ ] Can post messages
- [ ] Permissions work same as desktop

---

## MAINTENANCE SETTINGS

**Review Monthly:**
- Member growth rate (should be steady, not explosive)
- Activity rate (40%+ of members posting monthly)
- Retention of early members (70%+ still active)
- Moderation incidents (should be rare)
- Slow mode effectiveness (disable if community is stable)

**Adjust As Needed:**
- Add channels if themes emerge (regional groups, interest groups)
- Adjust permissions if abuse patterns appear
- Add moderators as community grows
- Update pinned messages as FAQs grow

**Archive Channels:**
- Only if conversation patterns show channel is dead for 2+ months
- Never delete—archive instead (preserves history)

---

## QUICK REFERENCE: What Goes Where

**Supply data/trends** → #supply-chain-alerts + #market-discussion
**Resource links** → #resources
**Psychological frameworks** → #decision-making
**Strategy questions** → #planning-together
**Weekly actions** → #first-steps
**Wins/progress** → #wins-and-progress
**Local suppliers/resources** → #local-solutions
**Member spotlights** → #member-stories
**Neighborhood projects** → #biohoods
**Basic questions** → #ask-anything
**Technical help** → #technical-help
**Official updates** → #announcements

---

## GROWTH MILESTONES & SCALING

**At 100 Members:**
- Consider adding a #general channel for off-topic chat
- Identify and recruit 1-2 additional moderators
- Create regional/interest subgroups if organizing naturally

**At 250 Members:**
- Consider Discord server directory or categories reorganization
- Establish clear moderation team with role divisions
- Create content calendar (external to Discord)
- Start archived "learning library" of best discussions

**At 500+ Members:**
- Consider splitting into multiple servers (by region or topic)
- Implement more sophisticated bot automation
- Establish community council or leadership team
- Create external resources hub (website with links, guides)

---

**This server is designed to stay intimate and mission-aligned as it grows. Keep the culture at the center—structure follows.**
