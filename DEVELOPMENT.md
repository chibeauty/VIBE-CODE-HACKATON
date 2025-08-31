# Development Guide - Career Guidance Assistant MVP

## Table of Contents
1. [Development Environment Setup](#development-environment-setup)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [Testing Strategy](#testing-strategy)
5. [Database Development](#database-development)
6. [API Development](#api-development)
7. [Frontend Development](#frontend-development)
8. [Payment Integration](#payment-integration)
9. [Performance Optimization](#performance-optimization)
10. [Security Considerations](#security-considerations)
11. [Troubleshooting](#troubleshooting)

## Development Environment Setup

### Prerequisites
- Node.js 18+ and npm
- Git
- Supabase CLI (optional, for local development)
- VS Code with recommended extensions

### Initial Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd VIBE-CODE-HACKATON

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual values

# Start development server
npm run dev
```

### Environment Variables
Create a `.env.local` file with the following variables:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# IntaSend Payment Configuration
INTASEND_API_KEY=your_intasend_api_key
INTASEND_PUBLISHABLE_KEY=your_intasend_publishable_key
INTASEND_WEBHOOK_SECRET=your_intasend_webhook_secret

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, Input)
│   ├── quiz/           # Quiz-related components
│   ├── recommendations/ # Recommendation components
│   └── payments/       # Payment components
├── lib/                 # Utility libraries and services
│   ├── supabase.ts     # Supabase client configuration
│   ├── recommendationEngine.ts # Career recommendation logic
│   ├── roadmapBuilder.ts      # Roadmap generation
│   └── intasend.ts     # Payment integration
├── pages/               # Next.js pages and API routes
│   ├── api/            # API endpoints
│   └── __tests__/      # API tests
├── styles/              # Global styles and Tailwind config
├── types/               # TypeScript type definitions
└── __tests__/          # Component tests

supabase/
├── migrations/          # Database schema migrations
└── seed/                # Seed data scripts

.github/
└── workflows/           # CI/CD workflows
```

## Development Workflow

### 1. Feature Development
```bash
# Create a feature branch
git checkout -b feature/new-feature

# Make your changes
# Test locally
npm run test
npm run build

# Commit with conventional commits
git commit -m "feat: add new feature description"

# Push and create PR
git push origin feature/new-feature
```

### 2. Code Quality
- Use TypeScript strict mode
- Follow ESLint rules
- Write meaningful commit messages
- Add tests for new functionality

### 3. Database Changes
```bash
# Create new migration
supabase migration new add_new_table

# Apply migrations
supabase db push

# Reset local database (if needed)
supabase db reset
```

## Testing Strategy

### Test Types
1. **Unit Tests**: Core logic and utilities
2. **Integration Tests**: API endpoints
3. **Component Tests**: React components
4. **E2E Tests**: Critical user flows

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- FormBuilder.test.tsx
```

### Test Structure
- **API Tests**: Test all endpoints with various scenarios
- **Component Tests**: Test user interactions and state changes
- **Performance Tests**: Ensure recommendations return in <2s

## Database Development

### Schema Management
- All changes go through migrations
- Use descriptive migration names
- Test migrations on staging before production

### Data Seeding
```bash
# Run seed script
npm run seed

# Customize seed data in scripts/seedData.ts
```

### Database Design Principles
- Use UUIDs for primary keys
- Implement soft deletes where appropriate
- Add proper indexes for performance
- Use JSONB for flexible data structures

## API Development

### API Design Principles
- RESTful endpoints
- Consistent error responses
- Input validation
- Rate limiting (future enhancement)

### Error Handling
```typescript
// Standard error response format
{
  success: false,
  error: "Descriptive error message",
  code?: "ERROR_CODE"
}
```

### Authentication
- Use Supabase Auth for user management
- Protect sensitive endpoints with middleware
- Validate user permissions

## Frontend Development

### Component Guidelines
- Use TypeScript interfaces for props
- Implement proper error boundaries
- Follow accessibility best practices
- Use Tailwind CSS for styling

### State Management
- Use React hooks for local state
- Consider context for global state
- Implement proper loading states

### Performance
- Lazy load components when possible
- Optimize images and assets
- Use React.memo for expensive components

## Payment Integration

### IntaSend Integration
- Test with sandbox credentials first
- Implement proper webhook verification
- Handle payment failures gracefully
- Log all payment events

### Testing Payments
```bash
# Use test API keys
# Test webhook endpoints locally with ngrok
# Verify payment status updates
```

## Performance Optimization

### Key Metrics
- **Recommendation Latency**: <2 seconds
- **Page Load Time**: <3 seconds
- **Bundle Size**: <500KB (gzipped)

### Optimization Techniques
- Implement caching strategies
- Use database indexes effectively
- Optimize API queries
- Implement lazy loading

## Security Considerations

### Data Protection
- Never expose service keys in client code
- Validate all user inputs
- Implement proper CORS policies
- Use HTTPS in production

### Authentication Security
- Implement session management
- Use secure password policies
- Implement rate limiting
- Log security events

## Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Check for TypeScript errors
npm run type-check
```

#### Test Failures
```bash
# Clear Jest cache
npm run test -- --clearCache

# Check test environment
npm run test -- --verbose
```

#### Database Connection Issues
```bash
# Verify environment variables
# Check Supabase project status
# Test connection with Supabase CLI
```

#### Payment Integration Issues
```bash
# Verify API keys
# Check webhook endpoints
# Review IntaSend logs
```

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev

# Check browser console for errors
# Review network tab for API calls
```

### Performance Issues
- Use React DevTools Profiler
- Monitor API response times
- Check database query performance
- Review bundle analyzer output

## Deployment

### Pre-deployment Checklist
- [ ] All tests passing
- [ ] Build successful
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Payment webhooks configured

### Deployment Commands
```bash
# Deploy to Bolt.new
npm run deploy

# Or manually
bolt deploy
```

### Post-deployment
- Verify all endpoints work
- Test payment flow
- Check error monitoring
- Monitor performance metrics

## Contributing

### Code Review Process
1. Create feature branch
2. Implement changes with tests
3. Create pull request
4. Address review feedback
5. Merge after approval

### Code Standards
- Follow existing code style
- Add JSDoc comments for complex functions
- Update documentation for API changes
- Ensure backward compatibility

This development guide should help you get started and maintain high code quality throughout the project lifecycle.

