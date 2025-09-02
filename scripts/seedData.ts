import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables: SUPABASE_URL, SUPABASE_SERVICE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedData() {
  console.log('🌱 Starting database seeding...')

  try {
    // Seed career paths
    console.log('📚 Seeding career paths...')
    const careerPaths = [
      {
        title: 'Data Scientist',
        description: 'Analyze complex data sets to extract insights and drive business decisions',
        category: 'Technology',
        difficulty_level: 'Advanced',
        estimated_duration_months: 18,
        required_skills: ['Python', 'Statistics', 'Machine Learning', 'SQL'],
        salary_range_min: 80000,
        salary_range_max: 150000,
        job_outlook: 'Excellent',
        is_featured: true
      },
      {
        title: 'Software Engineer',
        description: 'Design, develop, and maintain software applications and systems',
        category: 'Technology',
        difficulty_level: 'Intermediate',
        estimated_duration_months: 12,
        required_skills: ['Programming', 'Problem Solving', 'System Design', 'Collaboration'],
        salary_range_min: 70000,
        salary_range_max: 130000,
        job_outlook: 'Excellent',
        is_featured: true
      },
      {
        title: 'Digital Marketing Specialist',
        description: 'Develop and implement online marketing strategies to grow businesses',
        category: 'Marketing',
        difficulty_level: 'Beginner',
        estimated_duration_months: 6,
        required_skills: ['Marketing', 'Analytics', 'Creativity', 'Communication'],
        salary_range_min: 45000,
        salary_range_max: 80000,
        job_outlook: 'Good',
        is_featured: true
      },
      {
        title: 'Financial Analyst',
        description: 'Evaluate financial data and advise on investment decisions',
        category: 'Finance',
        difficulty_level: 'Intermediate',
        estimated_duration_months: 9,
        required_skills: ['Financial Analysis', 'Excel', 'Research', 'Attention to Detail'],
        salary_range_min: 55000,
        salary_range_max: 95000,
        job_outlook: 'Good',
        is_featured: false
      },
      {
        title: 'Healthcare Administrator',
        description: 'Manage healthcare facilities and coordinate patient care services',
        category: 'Healthcare',
        difficulty_level: 'Intermediate',
        estimated_duration_months: 12,
        required_skills: ['Healthcare Knowledge', 'Leadership', 'Organization', 'Communication'],
        salary_range_min: 50000,
        salary_range_max: 90000,
        job_outlook: 'Excellent',
        is_featured: false
      },
      {
        title: 'UI/UX Designer',
        description: 'Create user-friendly digital experiences and interfaces',
        category: 'Technology',
        difficulty_level: 'Intermediate',
        estimated_duration_months: 10,
        required_skills: ['Design', 'User Research', 'Prototyping', 'Creativity'],
        salary_range_min: 60000,
        salary_range_max: 110000,
        job_outlook: 'Good',
        is_featured: false
      }
    ]

    const { data: careerPathsData, error: careerPathsError } = await supabase
      .from('career_paths')
      .insert(careerPaths)
      .select()

    if (careerPathsError) {
      console.error('Error seeding career paths:', careerPathsError)
    } else {
      console.log(`✅ Seeded ${careerPathsData.length} career paths`)
    }

    // Seed sample users (mentors)
    console.log('👥 Seeding sample users...')
    const sampleUsers = [
      {
        id: 'mentor-1',
        email: 'sarah.tech@example.com',
        full_name: 'Sarah Johnson',
        role: 'mentor',
        bio: 'Senior Software Engineer with 8+ years of experience in full-stack development',
        skills: ['JavaScript', 'React', 'Node.js', 'Python'],
        experience_years: 8,
        hourly_rate: 75,
        is_verified: true
      },
      {
        id: 'mentor-2',
        email: 'mike.data@example.com',
        full_name: 'Mike Chen',
        role: 'mentor',
        bio: 'Data Scientist specializing in machine learning and predictive analytics',
        skills: ['Python', 'R', 'Machine Learning', 'Deep Learning'],
        experience_years: 6,
        hourly_rate: 85,
        is_verified: true
      },
      {
        id: 'mentor-3',
        email: 'lisa.marketing@example.com',
        full_name: 'Lisa Rodriguez',
        role: 'mentor',
        bio: 'Digital Marketing expert with focus on growth strategies and analytics',
        skills: ['Digital Marketing', 'SEO', 'Google Analytics', 'Social Media'],
        experience_years: 5,
        hourly_rate: 60,
        is_verified: true
      }
    ]

    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .insert(sampleUsers)
      .select()

    if (usersError) {
      console.error('Error seeding users:', usersError)
    } else {
      console.log(`✅ Seeded ${usersData.length} sample users`)
    }

    // Seed sample guidance sessions
    console.log('📅 Seeding sample guidance sessions...')
    const sampleSessions = [
      {
        student_id: 'sample-student-1',
        mentor_id: 'mentor-1',
        career_path_id: careerPathsData?.[1]?.id, // Software Engineer
        session_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
        duration_minutes: 60,
        status: 'pending',
        session_type: 'career_planning'
      },
      {
        student_id: 'sample-student-2',
        mentor_id: 'mentor-2',
        career_path_id: careerPathsData?.[0]?.id, // Data Scientist
        session_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
        duration_minutes: 90,
        status: 'pending',
        session_type: 'mentoring'
      }
    ]

    const { data: sessionsData, error: sessionsError } = await supabase
      .from('guidance_sessions')
      .insert(sampleSessions)
      .select()

    if (sessionsError) {
      console.error('Error seeding guidance sessions:', sessionsError)
    } else {
      console.log(`✅ Seeded ${sessionsData.length} sample guidance sessions`)
    }

    console.log('🎉 Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`   - Career Paths: ${careerPathsData?.length || 0}`)
    console.log(`   - Sample Users: ${usersData?.length || 0}`)
    console.log(`   - Sample Sessions: ${sessionsData?.length || 0}`)

  } catch (error) {
    console.error('❌ Error during seeding:', error)
    process.exit(1)
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedData()
}

export { seedData }














