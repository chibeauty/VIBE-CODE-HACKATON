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
## Step 4: Low-Fidelity Wireframe Plan

### MVP Screen List with Priority Elements

#### 1. Landing Page
**Main Sections:** Hero, value proposition, social proof, CTA
**Priority Elements:** 
- Primary CTA: "Start Your Career Journey" (High)
- Trust indicators: User testimonials, success stats (Medium)
- Feature preview: "3-minute assessment" highlight (High)

#### 2. Sign Up Screen
**Main Sections:** Registration form, social auth, terms
**Priority Elements:**
- Email/password fields with validation (High)
- Google/social login options (Medium)
- Clear privacy policy link (High)
- "Already have account?" login link (Medium)

#### 3. Login Screen
**Main Sections:** Login form, password recovery, sign up link
**Priority Elements:**
- Email/password with remember me (High)
- Forgot password link (Medium)
- Social login consistency (Medium)

#### 4. Onboarding Welcome
**Main Sections:** App tour, goal setting, expectations
**Priority Elements:**
- Skip option for returning users (Medium)
- Progress indicator (3 steps) (High)
- Clear value proposition reminder (High)

#### 5. Quick Career Quiz
**Main Sections:** Question display, progress bar, navigation
**Priority Elements:**
- Large, readable question text (High)
- Clear answer options with visual feedback (High)
- Progress indicator showing time remaining (High)
- Back/Next navigation with validation (Medium)

#### 6. Recommendations Dashboard
**Main Sections:** Career cards, filters, detailed view
**Priority Elements:**
- Career match cards with confidence scores (High)
- Filter by industry/salary/location (Medium)
- "View Details" CTA for each recommendation (High)
- Retake assessment option (Low)

#### 7. Career Detail View
**Main Sections:** Career overview, skills needed, roadmap preview
**Priority Elements:**
- Job description and growth potential (High)
- Required skills with user's current level (High)
- "Get Learning Roadmap" CTA (Premium) (High)
- Salary range and job demand data (Medium)

#### 8. Paywall Screen
**Main Sections:** Feature comparison, pricing, testimonials
**Priority Elements:**
- Clear feature differentiation (Free vs Premium) (High)
- Pricing with local currency (High)
- "Start Free Trial" or "Upgrade Now" CTA (High)
- Money-back guarantee badge (Medium)

#### 9. Payment Checkout
**Main Sections:** Plan summary, IntaSend integration, security badges
**Priority Elements:**
- Selected plan confirmation (High)
- IntaSend payment form integration (High)
- Security and trust indicators (High)
- Total cost with tax breakdown (High)

#### 10. Learning Roadmap
**Main Sections:** Skill progression, resources, timeline
**Priority Elements:**
- Visual skill tree or timeline (High)
- Resource links (courses, articles, videos) (High)
- Progress tracking checkboxes (Medium)
- Estimated completion time (Medium)

#### 11. Profile Dashboard
**Main Sections:** User info, assessment history, achievements
**Priority Elements:**
- Assessment completion status (High)
- Subscription status and billing (High)
- Achievement badges and progress (Medium)
- Account settings access (Medium)

### State Variations for Each Screen
- **Loading States:** Skeleton screens, progress indicators, spinner overlays
- **Empty States:** No recommendations, no assessment history, no achievements
- **Error States:** Network errors, payment failures, assessment timeouts
- **Success States:** Assessment completed, payment successful, roadmap unlocked

---
