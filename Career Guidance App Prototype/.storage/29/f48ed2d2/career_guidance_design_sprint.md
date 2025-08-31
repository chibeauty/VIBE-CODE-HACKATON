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
## Step 5: Design System Tokens (JSON)

```json
{
  "colors": {
    "primary": "#2563EB",
    "primaryDark": "#1E40AF", 
    "primaryLight": "#60A5FA",
    "accent": "#10B981",
    "accentDark": "#059669",
    "success": "#16A34A",
    "error": "#DC2626",
    "warning": "#D97706",
    "info": "#0EA5E9",
    "text": "#0F172A",
    "textSecondary": "#475569",
    "textMuted": "#64748B",
    "bg": "#FFFFFF",
    "bgSecondary": "#F8FAFC",
    "surface": "#FFFFFF",
    "surfaceElevated": "#F1F5F9",
    "border": "#E2E8F0",
    "borderLight": "#F1F5F9",
    "gradient": {
      "primary": "linear-gradient(135deg, #2563EB 0%, #10B981 100%)",
      "secondary": "linear-gradient(135deg, #1E40AF 0%, #059669 100%)",
      "accent": "linear-gradient(135deg, #60A5FA 0%, #34D399 100%)"
    }
  },
  "typography": {
    "fontFamily": "Inter, system-ui, -apple-system, sans-serif",
    "h1": {
      "size": 32,
      "lineHeight": 40,
      "weight": 700,
      "letterSpacing": "-0.02em"
    },
    "h2": {
      "size": 24,
      "lineHeight": 32,
      "weight": 600,
      "letterSpacing": "-0.01em"
    },
    "h3": {
      "size": 20,
      "lineHeight": 28,
      "weight": 600,
      "letterSpacing": "0em"
    },
    "h4": {
      "size": 18,
      "lineHeight": 26,
      "weight": 600,
      "letterSpacing": "0em"
    },
    "body": {
      "size": 16,
      "lineHeight": 24,
      "weight": 400,
      "letterSpacing": "0em"
    },
    "bodySmall": {
      "size": 14,
      "lineHeight": 20,
      "weight": 400,
      "letterSpacing": "0em"
    },
    "caption": {
      "size": 12,
      "lineHeight": 16,
      "weight": 500,
      "letterSpacing": "0.02em"
    },
    "button": {
      "size": 16,
      "lineHeight": 24,
      "weight": 500,
      "letterSpacing": "0em"
    }
  },
  "spacing": [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
  "radius": {
    "sm": 8,
    "md": 12,
    "lg": 16,
    "xl": 24,
    "full": 9999
  },
  "elevation": {
    "none": {
      "boxShadow": "none"
    },
    "sm": {
      "boxShadow": "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
    },
    "md": {
      "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    },
    "lg": {
      "boxShadow": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    },
    "xl": {
      "boxShadow": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  },
  "focusRing": {
    "width": 2,
    "color": "rgba(37, 99, 235, 0.4)",
    "offset": 2
  },
  "breakpoints": {
    "sm": 360,
    "md": 768,
    "lg": 1024,
    "xl": 1280
  },
  "animation": {
    "duration": {
      "fast": "150ms",
      "normal": "300ms",
      "slow": "500ms"
    },
    "easing": {
      "default": "cubic-bezier(0.4, 0, 0.2, 1)",
      "in": "cubic-bezier(0.4, 0, 1, 1)",
      "out": "cubic-bezier(0, 0, 0.2, 1)",
      "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
    }
  }
}
```

---
## Step 6: Component Inventory & Specifications

### Core Components

#### Button Component
**Purpose:** Primary actions, navigation, form submissions  
**Props:** `variant` (primary|secondary|outline|ghost), `size` (sm|md|lg), `disabled`, `loading`, `fullWidth`  
**States:**
- Default: Primary blue with white text
- Hover: Darker blue background, subtle scale transform
- Active: Pressed state with inner shadow
- Focus: Focus ring with 2px blue outline
- Disabled: Muted colors, no interactions
- Loading: Spinner with disabled state

**Responsive Rules:** Full width on mobile (<768px), auto width on desktop

---

#### Input Component  
**Purpose:** Text input, email, password fields
**Props:** `type`, `placeholder`, `label`, `error`, `helperText`, `required`, `disabled`
**States:**
- Default: Light border, placeholder text
- Focus: Blue border, focus ring, label animation
- Error: Red border, error message below
- Success: Green border, checkmark icon
- Disabled: Muted background, no interactions

**Responsive Rules:** Larger touch targets on mobile (44px min height)

---

#### Select Component
**Purpose:** Dropdown selections, filters
**Props:** `options`, `placeholder`, `multiple`, `searchable`, `disabled`
**States:**
- Default: Dropdown arrow, placeholder
- Open: Expanded options list, search if enabled
- Selected: Highlighted option, checkmark
- Focus: Keyboard navigation support

---

#### Chip Component
**Purpose:** Tags, filters, selected options
**Props:** `label`, `removable`, `selected`, `variant` (default|success|warning|error)
**States:**
- Default: Light background, border
- Selected: Primary color background
- Hover: Subtle background change
- Removable: X icon with hover state

---

#### QuizCard Component
**Purpose:** Assessment questions display
**Props:** `question`, `options`, `questionNumber`, `totalQuestions`, `onAnswer`
**States:**
- Default: Question with option buttons
- Selected: Highlighted chosen option
- Completed: All options disabled, next button enabled
- Loading: Skeleton while loading next question

**Responsive Rules:** Stack options vertically on mobile, grid on desktop

---

#### LikertScale Component
**Purpose:** Rating scale questions (1-5, Strongly Disagree to Strongly Agree)
**Props:** `question`, `scale`, `labels`, `value`, `onChange`
**States:**
- Default: Unselected radio buttons with labels
- Selected: Highlighted selection with visual feedback
- Hover: Preview selection state

---

#### RecommendationCard Component
**Purpose:** Display career recommendations
**Props:** `title`, `description`, `confidenceScore`, `demandLevel`, `salaryRange`, `onViewDetails`
**States:**
- Default: Card with gradient border, key info
- Hover: Subtle lift animation, CTA highlight
- Loading: Skeleton placeholder
- Premium: Lock icon for premium features

**Responsive Rules:** Full width on mobile, grid layout on desktop

---

#### ResourceCard Component
**Purpose:** Learning resources, courses, articles
**Props:** `title`, `type`, `duration`, `difficulty`, `provider`, `isPremium`
**States:**
- Default: Resource info with type badge
- Premium: Lock overlay for premium content
- Completed: Checkmark and progress indicator
- Hover: Preview information

---

#### Stepper Component
**Purpose:** Multi-step processes (onboarding, assessment)
**Props:** `steps`, `currentStep`, `completedSteps`
**States:**
- Completed: Green checkmark
- Current: Blue highlight, active indicator
- Upcoming: Muted appearance
- Error: Red indicator for failed steps

---

#### PaywallPanel Component
**Purpose:** Feature upgrade prompts
**Props:** `features`, `currentPlan`, `upgradePlan`, `onUpgrade`
**States:**
- Default: Feature comparison, upgrade CTA
- Loading: Processing upgrade request
- Error: Payment or upgrade failure message

---

#### CheckoutButton Component (IntaSend)
**Purpose:** Payment processing integration
**Props:** `amount`, `currency`, `planId`, `onSuccess`, `onError`
**States:**
- Default: "Complete Payment" with secure badges
- Loading: Processing payment with spinner
- Success: Confirmation with success icon
- Error: Retry option with error message

---

#### Alert Component
**Purpose:** System messages, notifications
**Props:** `type` (success|error|warning|info), `title`, `message`, `dismissible`
**States:**
- Success: Green background, checkmark icon
- Error: Red background, error icon
- Warning: Orange background, warning icon
- Info: Blue background, info icon

---

#### Skeleton Component
**Purpose:** Loading states for content
**Props:** `variant` (text|card|avatar|button), `width`, `height`, `lines`
**States:**
- Animated: Subtle shimmer effect
- Static: Placeholder blocks

**Responsive Rules:** Adapt skeleton sizes to match actual content on different screens

---
## Step 7: High-Fidelity UI Specifications

### Screen 1: Landing Page
**Layout Hierarchy:**
1. **Header (64px height):** Logo left, "Login" button right
2. **Hero Section (viewport height):** 
   - H1: "Discover Your Perfect Career Path" (32px, center)
   - Subtitle: "AI-powered guidance in just 3 minutes" (18px, muted)
   - Primary CTA: "Start Free Assessment" (56px height, gradient button)
   - Trust indicator: "Join 10,000+ students" (14px, below CTA)
3. **Features Section (3-column grid on desktop, stacked mobile):**
   - Icons: Assessment, Recommendations, Roadmaps
   - Each feature: Icon (48px), title (20px), description (16px)
4. **Social Proof:** Student testimonials with photos and universities
5. **Footer:** Links, contact, social media

**Spacing:** 32px section gaps, 16px element spacing, 8px text line spacing
**Interactions:** Hover animations on CTA, smooth scroll to sections
**Microcopy:** 
- Hero: "Your future starts with the right career choice"
- CTA: "Start Free Assessment" → hover: "Get My Career Match"

---

### Screen 2: Quick Career Quiz
**Layout Hierarchy:**
1. **Progress Header (80px):** 
   - Progress bar (8px height, gradient fill)
   - "Question 3 of 10" (14px, right aligned)
   - Time remaining: "~2 minutes left" (12px, muted)
2. **Question Card (centered, max 480px width):**
   - Question number badge (top left, 24px circle)
   - Question text (24px, bold, center aligned)
   - Answer options (4 buttons, 56px height each, 16px spacing)
3. **Navigation (fixed bottom):**
   - "Previous" button (left, secondary)
   - "Next" button (right, primary, disabled until answer selected)

**Spacing:** 24px card padding, 16px between options, 32px from edges
**Interactions:** 
- Option selection: Blue border, checkmark animation
- Next button: Enabled state transition with color change
- Progress bar: Smooth fill animation on question advance

**Success/Error Messages:**
- Success: "Great choice! Moving to next question..."
- Error: "Please select an answer to continue"

---

### Screen 3: Recommendations Dashboard
**Layout Hierarchy:**
1. **Header (120px):**
   - "Your Career Matches" (28px, bold)
   - Confidence explanation: "Based on your assessment" (16px, muted)
   - Filter chips: Industry, Salary, Location (32px height)
2. **Recommendation Grid:**
   - Cards: 2 columns mobile, 3 columns desktop
   - Each card (320px width, auto height):
     - Career title (20px, bold)
     - Confidence score (circular progress, top right)
     - Key skills needed (3 chips max)
     - Salary range (16px, accent color)
     - "View Details" CTA (40px height)
3. **Bottom Actions:**
   - "Retake Assessment" (secondary button)
   - "Get Premium Insights" (primary button, gradient)

**Spacing:** 16px card padding, 24px grid gaps, 12px internal spacing
**Interactions:**
- Card hover: Lift effect (4px shadow), CTA color change
- Filter chips: Toggle selection with color feedback
- Confidence score: Animated circular progress on load

**Empty State:** "No matches found. Try adjusting your filters or retaking the assessment."

---

### Screen 4: Learning Roadmap (Premium)
**Layout Hierarchy:**
1. **Header (100px):**
   - Career title (24px, bold)
   - Estimated timeline: "6-12 months" (16px, accent)
   - Progress: "2 of 8 skills completed" (14px, muted)
2. **Skill Timeline (vertical on mobile, horizontal on desktop):**
   - Each milestone: 
     - Skill name (18px, bold)
     - Progress indicator (circular, percentage)
     - Resource count: "5 courses, 12 articles" (14px)
     - "Start Learning" CTA (if not started)
3. **Resource Panel (expandable sections):**
   - Course cards with provider logos
   - Estimated time and difficulty level
   - Premium badge for paid content
4. **Progress Tracking:**
   - Overall completion percentage
   - Next milestone highlight
   - Achievement badges earned

**Spacing:** 20px timeline spacing, 16px card padding, 8px badge spacing
**Interactions:**
- Timeline: Scroll snapping to milestones
- Resource expansion: Smooth accordion animation
- Progress updates: Real-time percentage changes

**Microcopy:**
- Milestone completion: "🎉 Skill unlocked! You're making great progress."
- Next step: "Ready for the next challenge?"

---

### Screen 5: Paywall/Checkout Integration
**Layout Hierarchy:**
1. **Feature Comparison (split screen):**
   - Free tier (left): Basic features list, muted styling
   - Premium tier (right): Advanced features, gradient border, "Most Popular" badge
2. **Pricing Section (centered):**
   - Plan options: Monthly ($15), Annual ($120, "Save 33%" badge)
   - Currency: Local currency display (NGN, KES, ZAR)
   - Money-back guarantee: "30-day guarantee" badge
3. **IntaSend Integration:**
   - Selected plan summary
   - Payment form (embedded IntaSend widget)
   - Security badges: SSL, encryption icons
   - Total cost breakdown with taxes
4. **Trust Indicators:**
   - User testimonials specific to premium features
   - Success stats: "Premium users get 3x better job matches"

**Spacing:** 24px section padding, 16px feature spacing, 32px between tiers
**Interactions:**
- Plan selection: Border highlight, smooth transition
- Payment form: Real-time validation, loading states
- Success: Confetti animation, redirect to premium dashboard

**Microcopy:**
- Upgrade CTA: "Unlock Your Full Potential"
- Payment security: "Your payment is secure and encrypted"
- Success message: "Welcome to Premium! Your career journey just got supercharged."

**Error Handling:**
- Payment failure: "Payment unsuccessful. Please try again or use a different method."
- Network error: "Connection issue. Your payment is safe. Retrying..."

---
## Step 8: Prototype Click Map & User Flow

### Primary Navigation Flow
```
Landing Page
├── "Start Free Assessment" → Sign Up
├── "Login" → Login Screen
└── "Learn More" → Features Section (scroll)

Sign Up
├── Form submission → Onboarding Welcome
├── "Sign in with Google" → OAuth → Onboarding Welcome  
├── "Already have account?" → Login Screen
└── Back button → Landing Page

Login Screen
├── Successful login → Dashboard (if assessment complete) | Onboarding (if new)
├── "Forgot password?" → Password Reset
├── "Create account" → Sign Up
└── Back button → Landing Page

Onboarding Welcome
├── "Get Started" → Goal Setting
├── "Skip Tour" → Quick Quiz
└── Progress: Step 1 of 3

Goal Setting (Onboarding Step 2)
├── Goal selection → Preferences Setting
├── "Back" → Welcome
└── Progress: Step 2 of 3

Preferences Setting (Onboarding Step 3)
├── "Complete Setup" → Quick Quiz
├── "Back" → Goal Setting
└── Progress: Step 3 of 3

Quick Career Quiz
├── Answer selection → Next Question (Q2-Q10)
├── "Previous" → Previous Question
├── Question 10 "Finish" → Processing → Recommendations
└── "Save & Exit" → Dashboard (incomplete state)

Recommendations Dashboard
├── Career card "View Details" → Career Detail View
├── "Get Premium Insights" → Paywall
├── "Retake Assessment" → Quick Quiz (reset)
├── Filter selection → Filtered results
└── Bottom nav → Profile | Statistics

Career Detail View
├── "Get Learning Roadmap" → Paywall (if free user) | Roadmap (if premium)
├── "Save Career" → Saved to profile
├── "Share" → Share modal
└── "Back" → Recommendations Dashboard

Paywall Screen
├── "Start Free Trial" → Checkout (trial plan)
├── "Upgrade Now" → Checkout (selected plan)
├── "Maybe Later" → Recommendations (limited features)
└── Plan selection → Update pricing display

Checkout (IntaSend Integration)
├── Payment success → Payment Success → Premium Dashboard
├── Payment failure → Error state → Retry options
├── "Change Plan" → Paywall
└── "Cancel" → Previous screen

Learning Roadmap (Premium)
├── Skill milestone → Resource list expansion
├── "Start Course" → External course link (new tab)
├── Progress checkbox → Update completion status
├── "Download PDF" → Roadmap export
└── Bottom nav → Dashboard | Profile

Profile Dashboard
├── "Edit Profile" → Profile Settings
├── "Assessment History" → Past assessments list
├── "Billing" → Subscription management
├── "Achievements" → Achievement details
└── "Logout" → Landing Page

Statistics Dashboard
├── Progress charts → Detailed analytics
├── "Compare with Peers" → Comparison view (premium)
├── "Export Data" → Data export options
└── Time period selector → Update chart data
```

### Error Recovery Paths
```
Network Errors
├── "Retry" → Attempt action again
├── "Go Offline" → Cached content mode
└── "Contact Support" → Support modal

Assessment Timeout
├── "Resume Assessment" → Continue from last question
├── "Start Over" → Reset to Question 1
└── "Save Progress" → Return to dashboard

Payment Failures
├── "Try Again" → Retry same payment method
├── "Different Method" → Alternative payment options
├── "Contact Support" → Payment support
└── "Cancel" → Return to paywall

No Recommendations Found
├── "Retake Assessment" → Reset quiz
├── "Broaden Criteria" → Adjust filters
├── "Get Help" → Support chat
└── "Explore All Careers" → Full career database
```

### Back/Escape Behavior
- **Hardware back button (mobile):** Previous screen in navigation stack
- **Browser back:** Respects navigation history, saves form progress
- **Modal escape:** Close modal, return to underlying screen
- **Assessment exit:** Save progress, confirm before losing answers
- **Payment exit:** Clear sensitive data, return to plan selection

---
