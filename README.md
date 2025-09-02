# Career Guidance Assistant

A comprehensive career guidance platform that helps students discover their ideal career paths through personalized assessments, AI-powered recommendations, and structured learning roadmaps.

## 🚀 Features

- **Personalized Career Assessment**: Interactive quiz system to evaluate skills, interests, and experience
- **AI-Powered Recommendations**: Smart career matching using vector scoring and demand analysis
- **Custom Learning Roadmaps**: Step-by-step career development plans with resources and timelines
- **Integrated Payments**: Seamless checkout via IntaSend for premium services
- **Real-time Progress Tracking**: Monitor your career development journey
- **Mentor Matching**: Connect with industry professionals for guidance

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Backend**: Next.js API routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: IntaSend integration
- **Testing**: Jest, React Testing Library
- **Deployment**: Bolt.new

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- IntaSend account (for payments)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd career-guidance-assistant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# IntaSend Configuration
INTASEND_KEY=your_intasend_api_key
INTASEND_SECRET=your_intasend_secret_key

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Database Setup

```bash
# Start Supabase locally (if using local development)
npm run supabase:start

# Push database migrations
npm run db:push

# Seed the database with sample data
npm run db:seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

The application uses the following main tables:

- **users**: User profiles and authentication data
- **quizzes**: Assessment responses and results
- **career_paths**: Available career options with requirements
- **recommendations**: AI-generated career suggestions
- **roadmaps**: Personalized learning paths
- **payments**: Transaction records and status
- **guidance_sessions**: Mentor-student meeting scheduling

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

### Automatic Deployment (Recommended)

The application automatically deploys to Bolt.new when code is pushed to the `main` branch.

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy to Bolt.new
npm run deploy
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication

### Assessment
- `POST /api/quiz` - Submit quiz answers
- `GET /api/recommendations?userId=` - Get career recommendations
- `GET /api/roadmap?careerId=` - Get career development roadmap

### Payments
- `POST /api/checkout` - Create payment session
- `POST /api/intasend_webhook` - Process payment webhooks

## 🔧 Development

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Base UI components
│   ├── quiz/           # Quiz-related components
│   ├── recommendations/# Recommendation components
│   └── payments/       # Payment components
├── lib/                # Utility libraries
├── pages/              # Next.js pages and API routes
├── styles/             # Global styles and design tokens
└── types/              # TypeScript type definitions
```

### Adding New Features

1. **Create components** in the appropriate directory
2. **Add types** in `src/types/`
3. **Create API routes** in `src/pages/api/`
4. **Write tests** for new functionality
5. **Update documentation** as needed

### Code Style

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Include tests for new features

## 🐛 Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Verify environment variables are set correctly
   - Check if Supabase project is active

2. **Payment Integration Issues**
   - Ensure IntaSend credentials are valid
   - Check webhook endpoint configuration

3. **Build Failures**
   - Clear `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

### Getting Help

- Check the [Issues](../../issues) page for known problems
- Review [Supabase documentation](https://supabase.com/docs)
- Consult [IntaSend API docs](https://docs.intasend.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Supabase team for the excellent backend platform
- IntaSend for payment processing
- Next.js team for the amazing React framework
- All contributors and mentors

---

**Built with ❤️ for the Career Guidance Hackathon**
