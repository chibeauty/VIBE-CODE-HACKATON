import { QuizAnswer } from '@/types/quiz'

export interface CareerRecommendation {
  id: string
  title: string
  description: string
  category: string
  difficultyLevel: string
  estimatedDurationMonths: number
  requiredSkills: string[]
  salaryRangeMin: number
  salaryRangeMax: number
  jobOutlook: string
  matchScore: number
  demandScore: number
  totalScore: number
}

export interface RecommendationResult {
  recommendations: CareerRecommendation[]
  answerSetId: string
  userId: string
  computedAt: string
}

// Sample career data - in production this would come from a database
const CAREER_DATA: Omit<CareerRecommendation, 'matchScore' | 'demandScore' | 'totalScore'>[] = [
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data sets to extract insights and drive business decisions',
    category: 'Technology',
    difficultyLevel: 'Advanced',
    estimatedDurationMonths: 18,
    requiredSkills: ['Python', 'Statistics', 'Machine Learning', 'SQL'],
    salaryRangeMin: 80000,
    salaryRangeMax: 150000,
    jobOutlook: 'Excellent'
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Design, develop, and maintain software applications and systems',
    category: 'Technology',
    difficultyLevel: 'Intermediate',
    estimatedDurationMonths: 12,
    requiredSkills: ['Programming', 'Problem Solving', 'System Design', 'Collaboration'],
    salaryRangeMin: 70000,
    salaryRangeMax: 130000,
    jobOutlook: 'Excellent'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Specialist',
    description: 'Develop and implement online marketing strategies to grow businesses',
    category: 'Marketing',
    difficultyLevel: 'Beginner',
    estimatedDurationMonths: 6,
    requiredSkills: ['Marketing', 'Analytics', 'Creativity', 'Communication'],
    salaryRangeMin: 45000,
    salaryRangeMax: 80000,
    jobOutlook: 'Good'
  },
  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    description: 'Evaluate financial data and advise on investment decisions',
    category: 'Finance',
    difficultyLevel: 'Intermediate',
    estimatedDurationMonths: 9,
    requiredSkills: ['Financial Analysis', 'Excel', 'Research', 'Attention to Detail'],
    salaryRangeMin: 55000,
    salaryRangeMax: 95000,
    jobOutlook: 'Good'
  },
  {
    id: 'healthcare-admin',
    title: 'Healthcare Administrator',
    description: 'Manage healthcare facilities and coordinate patient care services',
    category: 'Healthcare',
    difficultyLevel: 'Intermediate',
    estimatedDurationMonths: 12,
    requiredSkills: ['Healthcare Knowledge', 'Leadership', 'Organization', 'Communication'],
    salaryRangeMin: 50000,
    salaryRangeMax: 90000,
    jobOutlook: 'Excellent'
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    description: 'Create user-friendly digital experiences and interfaces',
    category: 'Technology',
    difficultyLevel: 'Intermediate',
    estimatedDurationMonths: 10,
    requiredSkills: ['Design', 'User Research', 'Prototyping', 'Creativity'],
    salaryRangeMin: 60000,
    salaryRangeMax: 110000,
    jobOutlook: 'Good'
  }
]

// Demand scores based on market research (1-10 scale)
const DEMAND_SCORES: Record<string, number> = {
  'data-scientist': 9,
  'software-engineer': 10,
  'digital-marketing': 7,
  'financial-analyst': 8,
  'healthcare-admin': 9,
  'ui-ux-designer': 8
}

export class RecommendationEngine {
  private static instance: RecommendationEngine
  private cache: Map<string, RecommendationResult> = new Map()

  static getInstance(): RecommendationEngine {
    if (!RecommendationEngine.instance) {
      RecommendationEngine.instance = new RecommendationEngine()
    }
    return RecommendationEngine.instance
  }

  async generateRecommendations(
    userId: string,
    answers: QuizAnswer[],
    answerSetId: string
  ): Promise<RecommendationResult> {
    // Check cache first
    const cacheKey = `${userId}_${answerSetId}`
    if (this.cache.has(cacheKey)) {
      console.log('Returning cached recommendations for:', userId)
      return this.cache.get(cacheKey)!
    }

    console.log('Computing new recommendations for user:', userId)

    // Compute recommendations
    const recommendations = this.computeRecommendations(answers)
    
    const result: RecommendationResult = {
      recommendations,
      answerSetId,
      userId,
      computedAt: new Date().toISOString()
    }

    // Cache the result
    this.cache.set(cacheKey, result)

    return result
  }

  private computeRecommendations(answers: QuizAnswer[]): CareerRecommendation[] {
    const skillsAnswer = answers.find(a => a.id === 'skills')
    const interestsAnswer = answers.find(a => a.id === 'interests')
    const experienceAnswer = answers.find(a => a.id === 'experience_level')

    const userSkills = skillsAnswer?.answer as string || ''
    const userInterests = interestsAnswer?.answer as string[] || []
    const userExperience = experienceAnswer?.answer as string || ''

    return CAREER_DATA.map(career => {
      const matchScore = this.calculateMatchScore(career, userSkills, userInterests, userExperience)
      const demandScore = DEMAND_SCORES[career.id] || 5
      const totalScore = (matchScore * 0.7) + (demandScore * 0.3)

      return {
        ...career,
        matchScore: Math.round(matchScore * 100) / 100,
        demandScore,
        totalScore: Math.round(totalScore * 100) / 100
      }
    }).sort((a, b) => b.totalScore - a.totalScore)
  }

  private calculateMatchScore(
    career: any,
    userSkills: string,
    userInterests: string[],
    userExperience: string
  ): number {
    let score = 0
    let maxScore = 0

    // Skills match (40% weight)
    const skillScore = this.calculateSkillsMatch(career.requiredSkills, userSkills)
    score += skillScore * 0.4
    maxScore += 0.4

    // Interest match (30% weight)
    const interestScore = this.calculateInterestMatch(career.category, userInterests)
    score += interestScore * 0.3
    maxScore += 0.3

    // Experience level match (30% weight)
    const experienceScore = this.calculateExperienceMatch(career.difficultyLevel, userExperience)
    score += experienceScore * 0.3
    maxScore += 0.3

    return score / maxScore
  }

  private calculateSkillsMatch(requiredSkills: string[], userSkills: string): number {
    if (!userSkills) return 0.5

    const userSkillList = userSkills.toLowerCase().split(',').map(s => s.trim())
    const requiredSkillList = requiredSkills.map(s => s.toLowerCase())
    
    let matches = 0
    for (const skill of userSkillList) {
      if (requiredSkillList.some(reqSkill => reqSkill.includes(skill) || skill.includes(reqSkill))) {
        matches++
      }
    }

    return Math.min(matches / requiredSkillList.length, 1)
  }

  private calculateInterestMatch(careerCategory: string, userInterests: string[]): number {
    if (!userInterests.length) return 0.5

    const category = careerCategory.toLowerCase()
    const interests = userInterests.map(i => i.toLowerCase())
    
    if (interests.includes(category)) return 1
    if (interests.some(i => category.includes(i) || i.includes(category))) return 0.8
    return 0.3
  }

  private calculateExperienceMatch(difficultyLevel: string, userExperience: string): number {
    const difficultyMap: Record<string, number> = {
      'Beginner': 1,
      'Some Experience': 2,
      'Intermediate': 3,
      'Advanced': 4,
      'Expert': 5
    }

    const userLevel = difficultyMap[userExperience] || 1
    const requiredLevel = difficultyMap[difficultyLevel] || 3

    // Perfect match gets 1.0, being overqualified gets 0.8, underqualified gets 0.6
    if (userLevel === requiredLevel) return 1.0
    if (userLevel > requiredLevel) return 0.8
    return 0.6
  }

  clearCache(): void {
    this.cache.clear()
  }
}






