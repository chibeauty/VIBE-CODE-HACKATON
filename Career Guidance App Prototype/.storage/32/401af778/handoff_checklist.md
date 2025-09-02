# Development Handoff Checklist - Career Guidance Assistant

## Pre-Development Setup

### 1. Environment Configuration
- [ ] **Cursor AI Setup**: Install Cursor with TypeScript and React extensions
- [ ] **Supabase Project**: Create new Supabase project for Career Guidance Assistant
- [ ] **IntaSend Account**: Set up IntaSend merchant account for payment processing
- [ ] **Bolt.new Deployment**: Prepare deployment pipeline configuration
- [ ] **MGX Integration**: Connect design system to development workflow

### 2. Database Schema (Supabase)
```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  full_name VARCHAR(255),
  country VARCHAR(3), -- NG, KE, ZA
  university VARCHAR(255),
  major VARCHAR(255),
  graduation_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessments table
CREATE TABLE assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'quick_quiz', 'skills', 'personality'
  status VARCHAR(20) DEFAULT 'in_progress', -- 'in_progress', 'completed'
  responses JSONB,
  results JSONB,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Career recommendations table
CREATE TABLE recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
  career_title VARCHAR(255) NOT NULL,
  confidence_score DECIMAL(3,2), -- 0.00 to 1.00
  demand_level VARCHAR(20), -- 'low', 'medium', 'high'
  salary_range_min INTEGER,
  salary_range_max INTEGER,
  currency VARCHAR(3),
  skills_required JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_type VARCHAR(50) NOT NULL, -- 'free', 'premium_monthly', 'premium_annual'
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'cancelled', 'expired'
  intasend_subscription_id VARCHAR(255),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learning roadmaps table
CREATE TABLE roadmaps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recommendation_id UUID REFERENCES recommendations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  milestones JSONB,
  progress JSONB,
  estimated_duration_months INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Authentication Setup (Supabase Auth)
- [ ] **Email/Password Auth**: Configure email authentication
- [ ] **Google OAuth**: Set up Google social login
- [ ] **Password Reset**: Implement forgot password flow
- [ ] **Email Verification**: Enable email confirmation
- [ ] **Row Level Security**: Configure RLS policies for data protection

## API Contracts & Endpoints

### Authentication Endpoints
```typescript
// Sign up
POST /auth/signup
Body: { email: string, password: string, fullName: string, country: string }
Response: { user: User, session: Session }

// Sign in
POST /auth/signin
Body: { email: string, password: string }
Response: { user: User, session: Session }

// Sign out
POST /auth/signout
Response: { success: boolean }
```

### Assessment Endpoints
```typescript
// Start new assessment
POST /api/assessments
Body: { type: 'quick_quiz' | 'skills' | 'personality' }
Response: { assessmentId: string, questions: Question[] }

// Submit assessment answers
POST /api/assessments/:id/submit
Body: { answers: Answer[] }
Response: { assessmentId: string, results: AssessmentResults }

// Get assessment results
GET /api/assessments/:id/results
Response: { recommendations: Recommendation[] }
```

### Recommendations Endpoints
```typescript
// Get user recommendations
GET /api/recommendations?userId=:userId
Response: { recommendations: Recommendation[] }

// Get career details
GET /api/careers/:careerTitle
Response: { career: CareerDetails, roadmap?: Roadmap }
```

### Payment Endpoints (IntaSend Integration)
```typescript
// Create checkout session
POST /api/payments/checkout
Body: { planType: string, currency: string }
Response: { checkoutUrl: string, sessionId: string }

// Handle payment webhook
POST /api/payments/webhook
Body: IntaSend webhook payload
Response: { received: boolean }

// Get subscription status
GET /api/subscriptions/:userId
Response: { subscription: Subscription }
```

## Component Implementation Guide

### 1. Design System Integration
- [ ] **Install Shadcn/ui**: `npx shadcn-ui@latest init`
- [ ] **Configure Tailwind**: Import design tokens from `/career_guidance_design_sprint.md`
- [ ] **Set up Theme Provider**: Implement dark/light mode support
- [ ] **Typography Setup**: Configure Inter font family

### 2. Core Components to Build

#### Button Component (`/components/ui/Button.tsx`)
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

#### QuizCard Component (`/components/QuizCard.tsx`)
```typescript
interface QuizCardProps {
  question: string;
  options: string[];
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string;
  onAnswer: (answer: string) => void;
}
```

#### RecommendationCard Component (`/components/RecommendationCard.tsx`)
```typescript
interface RecommendationCardProps {
  title: string;
  description: string;
  confidenceScore: number;
  demandLevel: 'low' | 'medium' | 'high';
  salaryRange: { min: number; max: number; currency: string };
  skillsRequired: string[];
  onViewDetails: () => void;
  isPremium?: boolean;
}
```

#### PaywallPanel Component (`/components/PaywallPanel.tsx`)
```typescript
interface PaywallPanelProps {
  currentPlan: 'free' | 'premium';
  features: { free: string[]; premium: string[] };
  pricing: { monthly: number; annual: number };
  onUpgrade: (planType: string) => void;
}
```

### 3. Page Components

#### Landing Page (`/pages/Landing.tsx`)
- Hero section with gradient background
- Feature showcase (3-column grid)
- Social proof testimonials
- CTA buttons with hover animations

#### Assessment Flow (`/pages/Assessment.tsx`)
- Progress indicator component
- Question navigation (back/next)
- Auto-save functionality
- Results processing screen

#### Dashboard (`/pages/Dashboard.tsx`)
- Recommendation grid layout
- Filter functionality
- Premium feature locks
- Empty states handling

## Performance Optimization

### 1. Code Splitting
- [ ] **Lazy Loading**: Implement React.lazy for route-based code splitting
- [ ] **Dynamic Imports**: Load assessment questions dynamically
- [ ] **Bundle Analysis**: Use webpack-bundle-analyzer to optimize bundle size

### 2. Loading States
- [ ] **Skeleton Components**: Implement for all major content areas
- [ ] **Progressive Loading**: Load critical content first
- [ ] **Offline Support**: Cache assessment progress locally

### 3. Image Optimization
- [ ] **Next.js Image**: Use optimized image components
- [ ] **WebP Format**: Serve modern image formats
- [ ] **Lazy Loading**: Implement intersection observer for images

## Accessibility Checklist

### 1. WCAG AA Compliance
- [ ] **Color Contrast**: Ensure 4.5:1 ratio for normal text, 3:1 for large text
- [ ] **Focus Management**: Visible focus indicators on all interactive elements
- [ ] **Keyboard Navigation**: Full keyboard accessibility
- [ ] **Screen Reader Support**: Proper ARIA labels and semantic HTML

### 2. Mobile Accessibility
- [ ] **Touch Targets**: Minimum 44px touch target size
- [ ] **Zoom Support**: Content readable at 200% zoom
- [ ] **Orientation Support**: Works in portrait and landscape
- [ ] **Reduced Motion**: Respect prefers-reduced-motion setting

## Testing Strategy

### 1. Unit Testing
- [ ] **Component Tests**: Jest + React Testing Library
- [ ] **API Tests**: Test all endpoint responses
- [ ] **Utility Functions**: Test assessment scoring algorithms

### 2. Integration Testing
- [ ] **Authentication Flow**: Complete signup/signin process
- [ ] **Assessment Flow**: End-to-end quiz completion
- [ ] **Payment Flow**: IntaSend integration testing (sandbox)

### 3. Performance Testing
- [ ] **Lighthouse Scores**: Target 90+ for Performance, Accessibility, SEO
- [ ] **Core Web Vitals**: Optimize LCP, FID, CLS metrics
- [ ] **Mobile Performance**: Test on low-end devices

## Security Implementation

### 1. Data Protection
- [ ] **Input Validation**: Sanitize all user inputs
- [ ] **SQL Injection Prevention**: Use parameterized queries
- [ ] **XSS Protection**: Implement Content Security Policy
- [ ] **HTTPS Enforcement**: Force secure connections

### 2. Authentication Security
- [ ] **Password Hashing**: Use bcrypt with salt
- [ ] **Session Management**: Secure JWT token handling
- [ ] **Rate Limiting**: Prevent brute force attacks
- [ ] **CSRF Protection**: Implement CSRF tokens

## Deployment Checklist

### 1. Environment Variables
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# IntaSend Configuration
INTASEND_PUBLIC_KEY=your_intasend_public_key
INTASEND_SECRET_KEY=your_intasend_secret_key
INTASEND_WEBHOOK_SECRET=your_webhook_secret

# Application Configuration
NEXTAUTH_URL=your_domain
NEXTAUTH_SECRET=your_nextauth_secret
```

### 2. Bolt.new Deployment
- [ ] **Build Configuration**: Optimize production build
- [ ] **Environment Setup**: Configure production environment variables
- [ ] **Domain Setup**: Configure custom domain
- [ ] **SSL Certificate**: Enable HTTPS
- [ ] **CDN Configuration**: Set up content delivery network

### 3. Monitoring & Analytics
- [ ] **Error Tracking**: Implement Sentry or similar
- [ ] **Performance Monitoring**: Set up Core Web Vitals tracking
- [ ] **User Analytics**: Track key user actions and conversions
- [ ] **Payment Monitoring**: Track payment success/failure rates

## Launch Preparation

### 1. Content Management
- [ ] **Career Database**: Populate with African job market data
- [ ] **Assessment Questions**: Create culturally relevant questions
- [ ] **Learning Resources**: Curate region-specific learning content
- [ ] **Success Stories**: Gather student testimonials

### 2. Payment Configuration
- [ ] **Currency Support**: Configure NGN, KES, ZAR pricing
- [ ] **Tax Calculation**: Implement local tax requirements
- [ ] **Payment Methods**: Enable mobile money options
- [ ] **Subscription Management**: Set up billing cycles

### 3. Marketing Integration
- [ ] **SEO Optimization**: Meta tags, structured data
- [ ] **Social Sharing**: Open Graph and Twitter Card support
- [ ] **Email Templates**: Transactional email design
- [ ] **Referral System**: Track user acquisition sources

## Post-Launch Monitoring

### 1. Key Metrics Dashboard
- [ ] **User Engagement**: Assessment completion rates
- [ ] **Conversion Metrics**: Free to premium upgrade rates
- [ ] **Performance Metrics**: Page load times, error rates
- [ ] **Business Metrics**: Revenue, churn, user growth

### 2. Feedback Collection
- [ ] **User Surveys**: In-app feedback collection
- [ ] **Support System**: Help desk integration
- [ ] **Feature Requests**: User feedback tracking
- [ ] **Bug Reporting**: Error reporting system

## Development Timeline

### Week 1: Foundation
- Days 1-2: Environment setup, database schema, authentication
- Days 3-4: Core components, design system integration
- Days 5-7: Landing page, signup/login flows

### Week 2: Core Features
- Days 8-10: Assessment flow, question management
- Days 11-12: Recommendations engine, results display
- Days 13-14: Dashboard, user profile management

### Week 3: Premium Features
- Days 15-17: Paywall implementation, IntaSend integration
- Days 18-19: Learning roadmaps, premium content
- Days 20-21: Testing, bug fixes, optimization

### Week 4: Launch Preparation
- Days 22-24: Performance optimization, accessibility audit
- Days 25-26: Content population, final testing
- Days 27-28: Deployment, monitoring setup, soft launch

## Success Criteria

### Technical KPIs
- [ ] **Performance**: Lighthouse score 90+ across all metrics
- [ ] **Accessibility**: WCAG AA compliance verified
- [ ] **Mobile Experience**: Perfect responsive design on all devices
- [ ] **Security**: No critical vulnerabilities in security audit

### Business KPIs
- [ ] **Time to Recommendation**: ≤ 3 minutes average
- [ ] **Conversion Rate**: 15%+ free to premium conversion
- [ ] **User Engagement**: 70%+ assessment completion rate
- [ ] **Payment Success**: 95%+ payment processing success rate

### User Experience KPIs
- [ ] **User Satisfaction**: 4.5+ star rating
- [ ] **Support Tickets**: <5% of users require support
- [ ] **Feature Adoption**: 80%+ of premium users use roadmaps
- [ ] **Regional Adaptation**: Positive feedback from all target countries

---

## Emergency Contacts & Resources

**Technical Support:**
- Supabase Support: support@supabase.com
- IntaSend Support: support@intasend.com
- Cursor AI Community: Discord/GitHub

**Project Resources:**
- Design System: `/career_guidance_design_sprint.md`
- Copy Kit: `/copy_kit.md`
- Component Specs: Reference design sprint documentation
- API Documentation: Supabase auto-generated docs

**Deployment Resources:**
- Bolt.new Documentation: docs.bolt.new
- Performance Monitoring: web.dev/vitals
- Accessibility Testing: axe-core, WAVE tools