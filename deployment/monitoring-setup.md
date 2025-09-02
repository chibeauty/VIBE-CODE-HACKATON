# Monitoring & Observability Setup

## Overview
This guide sets up comprehensive monitoring for the Career Guidance Assistant deployment on Bolt.new.

## 1. Built-in Bolt.new Monitoring

### Automatic Metrics
Bolt.new provides these metrics out of the box:
- **Response Times**: API and page load performance
- **Error Rates**: 4xx and 5xx error tracking
- **Uptime**: Service availability monitoring
- **Traffic**: Request volume and patterns

### Dashboard Access
1. Go to [Bolt.new Dashboard](https://bolt.new/dashboard)
2. Select "career-guidance-assistant" project
3. Navigate to **Monitoring** tab
4. View real-time metrics and alerts

## 2. Custom Application Metrics

### Key Performance Indicators
```typescript
// Track in your application
const metrics = {
  // User Engagement
  quiz_completion_rate: 'Percentage of users completing assessment',
  recommendation_generation_time: 'Time to generate career recommendations',
  user_retention_rate: 'Users returning within 7 days',
  
  // Business Metrics
  free_to_premium_conversion: 'Conversion rate from free to paid',
  payment_success_rate: 'Successful payment processing rate',
  average_session_duration: 'Time users spend in application',
  
  // Technical Metrics
  api_response_times: 'Average API response times',
  database_query_performance: 'Supabase query execution times',
  error_rates_by_endpoint: 'Error rates per API endpoint'
}
```

### Implementation Example
```typescript
// lib/analytics.ts
export const trackEvent = (event: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // Track custom events
    console.log('Event:', event, properties)
    
    // In production, send to your analytics service
    // analytics.track(event, properties)
  }
}

// Usage in components
trackEvent('quiz_completed', {
  userId: user.id,
  completionTime: Date.now() - startTime,
  questionsAnswered: answers.length
})
```

## 3. Error Tracking & Alerting

### Error Categories
- **Critical**: Payment failures, authentication issues
- **High**: Database connection errors, API timeouts
- **Medium**: Validation errors, user input issues
- **Low**: UI glitches, non-blocking warnings

### Alert Configuration
```yaml
# Bolt.new Alert Rules
alerts:
  - name: "High Error Rate"
    condition: "error_rate > 5% for 2 minutes"
    severity: critical
    notification: email
  
  - name: "Slow Response Time"
    condition: "avg_response_time > 5000ms for 5 minutes"
    severity: high
    notification: email
  
  - name: "Payment Failures"
    condition: "payment_error_rate > 2% for 1 minute"
    severity: critical
    notification: email + slack
  
  - name: "Database Connection Issues"
    condition: "supabase_health_check fails for 3 minutes"
    severity: critical
    notification: email + slack
```

## 4. Performance Monitoring

### Core Web Vitals Tracking
```typescript
// lib/performance.ts
export const trackWebVitals = (metric: any) => {
  const { name, value, id } = metric
  
  // Track Core Web Vitals
  if (['FCP', 'LCP', 'CLS', 'FID', 'TTFB'].includes(name)) {
    console.log(`${name}: ${value}`)
    
    // Send to monitoring service
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, value, id })
    })
  }
}

// pages/_app.tsx
import { trackWebVitals } from '@/lib/performance'

export function reportWebVitals(metric: any) {
  trackWebVitals(metric)
}
```

### Database Performance
```sql
-- Monitor slow queries in Supabase
SELECT 
  query,
  mean_exec_time,
  calls,
  total_exec_time
FROM pg_stat_statements 
WHERE mean_exec_time > 1000  -- Queries taking > 1 second
ORDER BY mean_exec_time DESC;
```

## 5. Business Intelligence Dashboard

### Key Metrics to Track
```typescript
// Dashboard metrics
const dashboardMetrics = {
  // User Metrics
  total_users: 'Total registered users',
  active_users_daily: 'Daily active users',
  active_users_weekly: 'Weekly active users',
  user_retention_7d: '7-day user retention rate',
  
  // Engagement Metrics
  assessments_completed: 'Total assessments completed',
  avg_assessment_time: 'Average time to complete assessment',
  recommendations_viewed: 'Career recommendations viewed',
  roadmaps_accessed: 'Learning roadmaps accessed',
  
  // Revenue Metrics
  total_revenue: 'Total revenue generated',
  monthly_recurring_revenue: 'MRR from subscriptions',
  conversion_rate: 'Free to premium conversion rate',
  churn_rate: 'Monthly subscription churn rate',
  
  // Technical Metrics
  api_uptime: 'API availability percentage',
  avg_response_time: 'Average API response time',
  error_rate: 'Application error rate',
  deployment_frequency: 'Deployments per week'
}
```

## 6. Incident Response Plan

### Severity Levels
- **P0 (Critical)**: Complete service outage, payment system down
- **P1 (High)**: Major feature broken, high error rates
- **P2 (Medium)**: Minor feature issues, performance degradation
- **P3 (Low)**: UI bugs, non-critical issues

### Response Procedures
```markdown
## P0 - Critical Incident
1. **Immediate Response** (< 5 minutes)
   - Acknowledge alert
   - Assess impact scope
   - Initiate incident channel
   
2. **Mitigation** (< 15 minutes)
   - Execute rollback if needed
   - Implement temporary fix
   - Communicate status to stakeholders
   
3. **Resolution** (< 2 hours)
   - Identify root cause
   - Implement permanent fix
   - Verify resolution
   - Post-incident review

## P1 - High Priority
1. **Response** (< 30 minutes)
2. **Mitigation** (< 2 hours)
3. **Resolution** (< 24 hours)
```

## 7. Backup & Recovery

### Automated Backups
- **Database**: Supabase automatic daily backups
- **Code**: GitHub repository with full history
- **Configuration**: Environment variables backed up
- **Deployment**: Bolt.new keeps deployment history

### Recovery Procedures
```bash
# Database Recovery (if needed)
# Supabase provides point-in-time recovery
# Contact Supabase support for assistance

# Application Recovery
# Use Bolt.new rollback feature
# Or redeploy from GitHub

# Configuration Recovery
# Restore environment variables from backup
# Verify all secrets are properly configured
```

## 8. Maintenance Windows

### Scheduled Maintenance
- **Weekly**: Dependency updates (Sundays, 2-4 AM UTC)
- **Monthly**: Security patches (First Sunday, 1-3 AM UTC)
- **Quarterly**: Major updates (Planned with advance notice)

### Maintenance Checklist
- [ ] Notify users 24 hours in advance
- [ ] Create maintenance page
- [ ] Backup current state
- [ ] Execute updates
- [ ] Verify functionality
- [ ] Remove maintenance mode
- [ ] Monitor for issues

---

## Quick Reference

### Important URLs
- **Production**: https://career-guidance.bolt.new
- **Health Check**: https://career-guidance.bolt.new/api/health
- **Supabase Health**: https://career-guidance.bolt.new/api/supabase-health
- **Monitoring Dashboard**: https://bolt.new/dashboard/career-guidance-assistant

### Emergency Commands
```bash
# Check deployment status
curl https://career-guidance.bolt.new/api/health

# Test database connection
curl https://career-guidance.bolt.new/api/supabase-health

# Force redeploy (if needed)
git commit --allow-empty -m "trigger redeploy"
git push origin main
```

### Support Contacts
- **Bolt.new**: support@bolt.new
- **Supabase**: support@supabase.com
- **IntaSend**: support@intasend.com
- **Project Team**: team@careerpath.com