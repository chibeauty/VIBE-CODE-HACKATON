# Career Guidance Assistant - 48-Hour Design Sprint

## Project Overview
**Project:** Career Guidance Assistant – Smarter career choices for students  
**Theme:** AI + Low-Code, Monetizable, Real-World Impact  
**Target Regions:** Nigeria, Kenya, South Africa  
**Primary KPI:** Time-to-recommendation ≤ 3 minutes; clear premium upgrade path  
**Stack:** MGX (design), Supabase (auth/db), IntaSend (payments), Cursor AI (dev), Rork.app (PM), Bolt.new (deploy)

## Design Constraints
- Mobile-first, responsive design
- 8-pt grid system
- WCAG AA contrast compliance
- Lightweight screens for fast development handoff
- Trustworthy, minimal paywall integration

## Target Market
- **Regions:** Nigeria, Kenya, South Africa
- **Price Points:** $5-15 subscription tiers
- **Primary Majors:** Tech, Health, Business, Creative Arts
- **Brand Tone:** Friendly yet professional

---

## Step 1: Clarification Complete
Based on provided context, proceeding with:
- Target regions: NG/KE/ZA (confirmed)
- Price points: $5-15 subscription tiers (confirmed)
- Primary majors: Tech, Health, Business, Creative Arts (confirmed)
- Brand tone: Friendly yet professional (confirmed)

---
## Step 2: Personas & Jobs-to-be-Done

### Persona 1: Sarah - The Ambitious Senior Student
**Demographics:** 21, Final year Computer Science student, University of Cape Town, South Africa  
**Goals:** 
- Land a high-paying tech job at a reputable company
- Build a competitive skill portfolio
- Network with industry professionals

**Pain Points:**
- Overwhelmed by career options in tech
- Unsure which skills employers actually value
- Limited access to industry mentors

**Success Definition:** Securing a software engineering role with 40k+ ZAR starting salary within 3 months of graduation

**Top 3 Tasks:**
1. Complete comprehensive career assessment to identify strengths
2. Access curated learning roadmaps for target roles
3. Connect with alumni and industry professionals

---

### Persona 2: James - The Career Switcher
**Demographics:** 26, Marketing graduate working in retail, Lagos, Nigeria  
**Goals:**
- Transition into a more fulfilling, higher-paying career
- Gain relevant skills without quitting current job
- Understand realistic career transition timelines

**Pain Points:**
- Limited time for career exploration due to work commitments
- Confusion about which skills transfer to new industries
- Fear of making wrong career decisions

**Success Definition:** Successfully transitioning to a digital marketing or business analyst role within 12 months

**Top 3 Tasks:**
1. Take quick career fit assessments during breaks
2. Access bite-sized learning content for skill building
3. Get personalized career transition roadmaps

---

### Persona 3: Amara - The Budget-Conscious Explorer
**Demographics:** 19, Second-year Business student, University of Nairobi, Kenya  
**Goals:**
- Explore different career paths before specializing
- Access quality career guidance on a student budget
- Build foundational skills early in academic journey

**Pain Points:**
- Limited financial resources for premium career services
- Uncertainty about future career direction
- Need for flexible, self-paced learning options

**Success Definition:** Gaining clarity on career direction and building relevant skills within available budget

**Top 3 Tasks:**
1. Access free career exploration tools and assessments
2. Get affordable premium insights when needed
3. Track progress and skill development over time

---
## Step 3: Information Architecture & Core Flows

### Sitemap Structure
```
Career Guidance Assistant
├── Landing Page
├── Authentication
│   ├── Sign Up
│   ├── Login
│   └── Password Reset
├── Onboarding
│   ├── Welcome Tour
│   ├── Goal Setting
│   └── Initial Preferences
├── Assessment Hub
│   ├── Quick Career Quiz (3 min)
│   ├── Skills Assessment
│   ├── Personality Test
│   └── Interest Inventory
├── Recommendations Dashboard
│   ├── Career Matches
│   ├── Confidence Scores
│   ├── Demand Analytics
│   └── Similar Profiles
├── Learning Roadmaps
│   ├── Skill Development Paths
│   ├── Course Recommendations
│   ├── Timeline Planning
│   └── Progress Tracking
├── Premium Features (Paywall)
│   ├── Detailed Analytics
│   ├── 1-on-1 Mentoring
│   ├── Industry Insights
│   └── Advanced Assessments
├── Payment & Billing
│   ├── Plan Selection
│   ├── IntaSend Checkout
│   ├── Payment Success
│   └── Subscription Management
└── Profile & Settings
    ├── Personal Information
    ├── Assessment History
    ├── Achievements
    └── Account Settings
```

### Core Entities
- **User:** Profile, preferences, assessment history, subscription status
- **Assessment:** Questions, answers, scoring algorithms, results
- **Career:** Title, description, skills required, demand score, salary range
- **Recommendation:** Career match, confidence score, reasoning, next steps
- **Roadmap:** Learning path, milestones, resources, timeline
- **Subscription:** Plan type, features, billing cycle, payment status

### Primary User Flow
1. **Landing** → Sign up → Onboarding → Goal setting
2. **Quick Quiz** → [3 min assessment] → Immediate recommendations
3. **Recommendations** → Explore careers → View roadmap → Hit paywall
4. **Paywall** → Plan selection → IntaSend payment → Premium access
5. **Premium** → Detailed analytics → Mentoring booking → Progress tracking

### Recovery Paths
- **Assessment incomplete:** Save progress, resume later
- **Payment failure:** Retry payment, contact support, alternative methods
- **No recommendations:** Retake assessment, broaden criteria, contact support
- **Technical errors:** Offline mode, retry mechanisms, error reporting

---
