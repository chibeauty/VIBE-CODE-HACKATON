# Environment Setup Guide - Career Guidance Assistant

## Overview
This guide helps you configure environment variables and deploy the Career Guidance Assistant to Bolt.new with proper monitoring and rollback capabilities.

## Prerequisites
- GitHub repository with the project code
- Supabase project set up
- IntaSend merchant account
- Bolt.new account

## Step 1: Supabase Configuration

### 1.1 Get Supabase Credentials
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the following values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Anon/Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 1.2 Verify Database Schema
Ensure your Supabase project has the required tables:
```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'career_paths', 'quizzes', 'recommendations', 'payments');
```

### 1.3 Configure Row Level Security
Verify RLS policies are active:
```sql
-- Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = true;
```

## Step 2: IntaSend Payment Setup

### 2.1 Get IntaSend Credentials
1. Log in to [IntaSend Dashboard](https://dashboard.intasend.com)
2. Navigate to **Developers** → **API Keys**
3. Copy your credentials:
   - **API Key**: `ISSecretKey_test_...` (test) or `ISSecretKey_live_...` (production)
   - **Publishable Key**: `ISPubKey_test_...` or `ISPubKey_live_...`

### 2.2 Configure Webhook Endpoint
1. In IntaSend Dashboard, go to **Webhooks**
2. Add webhook URL: `https://your-domain.bolt.new/api/intasend_webhook`
3. Select events: `checkout.session.completed`, `checkout.session.expired`
4. Copy the **Webhook Secret** for signature verification

### 2.3 Test Payment Integration
```bash
# Test webhook endpoint locally
curl -X POST http://localhost:3000/api/intasend_webhook \
  -H "Content-Type: application/json" \
  -H "X-IntaSend-Signature: test-signature" \
  -d '{"event": "checkout.session.completed", "data": {"id": "test"}}'
```

## Step 3: Environment Variables Configuration

### 3.1 Create Environment File
Create a `.env.production` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# IntaSend Configuration
INTASEND_API_KEY=your_intasend_api_key
INTASEND_WEBHOOK_SECRET=your_intasend_webhook_secret

# Application Configuration
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
NEXT_PUBLIC_APP_URL=https://career-guidance.bolt.new

# Optional Configuration
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### 3.2 Bolt.new Environment Setup
1. Go to your Bolt.new project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable from the list above
4. Mark sensitive variables as **Secret** (SERVICE_ROLE_KEY, API_KEY, JWT_SECRET, WEBHOOK_SECRET)

## Step 4: GitHub Integration

### 4.1 Connect Repository
1. In Bolt.new dashboard, go to **Deployments** → **GitHub**
2. Connect your GitHub account
3. Select repository: `your-username/career-guidance-assistant`
4. Set deployment branch: `main`

### 4.2 Configure Auto-Deploy
```yaml
# .github/workflows/deploy.yml
name: Deploy to Bolt.new

on:
  push:
    branches: [main]
    paths-ignore: ['README.md', 'docs/**', '*.md']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      
      - name: Deploy to Bolt.new
        uses: bolt-new/deploy-action@v1
        with:
          token: ${{ secrets.BOLT_DEPLOY_TOKEN }}
          project-id: ${{ secrets.BOLT_PROJECT_ID }}
```

## Step 5: Health Check Endpoints

### 5.1 API Health Check
The following endpoint should be accessible after deployment:

```
GET https://career-guidance.bolt.new/api/health
Response: { "status": "ok", "timestamp": "2024-01-15T10:30:00Z" }
```

### 5.2 Supabase Connection Check
```
GET https://career-guidance.bolt.new/api/supabase-health
Response: { "status": "connected", "database": "ok", "auth": "ok" }
```

### 5.3 IntaSend Webhook Test
```
POST https://career-guidance.bolt.new/api/intasend_webhook
Headers: X-IntaSend-Signature: test-signature
Response: { "received": true }
```

## Step 6: Deployment Verification Checklist

### 6.1 Pre-Deployment Checks
- [ ] All environment variables configured in Bolt.new
- [ ] GitHub repository connected and webhook active
- [ ] Supabase project accessible and RLS policies active
- [ ] IntaSend webhook endpoint configured
- [ ] SSL certificate provisioned
- [ ] Domain DNS configured (if using custom domain)

### 6.2 Post-Deployment Verification
- [ ] Application loads at public URL
- [ ] User registration/login works
- [ ] Quiz assessment completes successfully
- [ ] Recommendations generate within 3 seconds
- [ ] Payment checkout redirects to IntaSend
- [ ] Webhook receives payment confirmations
- [ ] Database operations work correctly
- [ ] Error monitoring captures issues

### 6.3 Performance Verification
- [ ] Lighthouse score > 90 for Performance
- [ ] First Contentful Paint < 2 seconds
- [ ] Time to Interactive < 3 seconds
- [ ] Cumulative Layout Shift < 0.1
- [ ] Mobile responsiveness verified

## Step 7: Monitoring & Alerts Setup

### 7.1 Error Monitoring
Bolt.new automatically provides:
- Real-time error tracking
- Performance monitoring
- Uptime monitoring
- Custom alerts

### 7.2 Custom Monitoring Endpoints
Add these to your application for enhanced monitoring:

```typescript
// pages/api/health.ts
export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    environment: process.env.NODE_ENV
  });
}

// pages/api/supabase-health.ts
import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    res.status(200).json({
      status: 'connected',
      database: error ? 'error' : 'ok',
      auth: 'ok',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'error',
      error: error.message
    });
  }
}
```

## Step 8: Rollback Procedures

### 8.1 Automatic Rollback
Bolt.new automatically rolls back if:
- Build fails
- Health checks fail for 5 minutes
- Error rate exceeds 5% for 2 minutes

### 8.2 Manual Rollback
1. Go to Bolt.new dashboard
2. Navigate to **Deployments** → **History**
3. Select previous stable deployment
4. Click **Rollback to this version**

### 8.3 Emergency Procedures
```bash
# If you need to quickly disable the application
# Set maintenance mode via environment variable
MAINTENANCE_MODE=true

# Or redirect traffic to a static maintenance page
# Update DNS to point to maintenance.career-guidance.com
```

## Step 9: Demo Link & Submission

### 9.1 Public Demo URL
After successful deployment, your demo will be available at:
```
https://career-guidance.bolt.new
```

### 9.2 Demo Credentials
For hackathon judges, provide test credentials:
```
Demo User:
Email: demo@careerpath.com
Password: Demo123!

Test Payment:
Use IntaSend test cards for payment flow demonstration
```

### 9.3 Submission Package
Include in your hackathon submission:
- **Live Demo**: https://career-guidance.bolt.new
- **GitHub Repository**: https://github.com/your-username/career-guidance-assistant
- **Demo Video**: Screen recording of complete user flow
- **Technical Documentation**: This deployment guide

## Step 10: Troubleshooting

### 10.1 Common Deployment Issues

**Build Failures:**
```bash
# Check build logs in Bolt.new dashboard
# Common fixes:
npm run build  # Test locally first
npm run lint   # Fix linting errors
npm run type-check  # Fix TypeScript errors
```

**Environment Variable Issues:**
- Verify all required variables are set in Bolt.new dashboard
- Check variable names match exactly (case-sensitive)
- Ensure secret variables are marked as "Secret"

**Database Connection Issues:**
- Verify Supabase project is active
- Check RLS policies allow public access where needed
- Test connection with Supabase CLI: `supabase status`

**Payment Integration Issues:**
- Verify IntaSend webhook URL is correct
- Check webhook secret matches environment variable
- Test with IntaSend sandbox credentials first

### 10.2 Performance Issues
```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Check for large dependencies
npm ls --depth=0 --long

# Optimize images and assets
# Use next/image for automatic optimization
```

### 10.3 Security Issues
- Ensure all API keys are marked as secrets
- Verify HTTPS is enforced
- Check CSP headers are properly configured
- Test authentication flows thoroughly

## Step 11: Maintenance & Updates

### 11.1 Regular Maintenance
- **Weekly**: Check error logs and performance metrics
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Review and optimize database queries

### 11.2 Scaling Considerations
- Monitor Supabase usage and upgrade plan if needed
- Consider CDN optimization for global users
- Implement caching strategies for frequently accessed data

### 11.3 Backup Procedures
- Supabase automatically backs up your database
- Export user data monthly for additional safety
- Keep deployment configurations in version control

---

## Quick Start Commands

```bash
# 1. Clone and setup
git clone https://github.com/your-username/career-guidance-assistant
cd career-guidance-assistant
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your actual values

# 3. Test locally
npm run dev
npm run test
npm run build

# 4. Deploy to Bolt.new
# Push to main branch - auto-deployment will trigger
git add .
git commit -m "feat: initial deployment"
git push origin main

# 5. Verify deployment
curl https://career-guidance.bolt.new/api/health
```

## Support Contacts
- **Bolt.new Support**: support@bolt.new
- **Supabase Support**: support@supabase.com  
- **IntaSend Support**: support@intasend.com
- **Project Team**: team@careerpath.com

---

**Deployment Status**: Ready for production deployment
**Estimated Setup Time**: 30-45 minutes
**Demo URL**: https://career-guidance.bolt.new (after deployment)