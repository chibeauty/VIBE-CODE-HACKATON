import { CareerRecommendation } from './recommendationEngine'
import { CareerRoadmap, RoadmapStep, RoadmapResource } from '@/types/roadmap'

export class RoadmapBuilder {
  private static instance: RoadmapBuilder

  static getInstance(): RoadmapBuilder {
    if (!RoadmapBuilder.instance) {
      RoadmapBuilder.instance = new RoadmapBuilder()
    }
    return RoadmapBuilder.instance
  }

  async generateRoadmap(career: CareerRecommendation): Promise<CareerRoadmap> {
    const steps = this.buildRoadmapSteps(career)
    
    const roadmap: CareerRoadmap = {
      id: `roadmap_${career.id}_${Date.now()}`,
      careerId: career.id,
      title: `${career.title} Career Roadmap`,
      description: `A step-by-step guide to becoming a ${career.title}`,
      steps,
      estimatedDurationMonths: career.estimatedDurationMonths,
      currentStep: 1,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return roadmap
  }

  private buildRoadmapSteps(career: CareerRecommendation): RoadmapStep[] {
    const steps: RoadmapStep[] = []

    // Step 1: Foundation Skills
    steps.push({
      id: 'foundation',
      title: 'Build Foundation Skills',
      description: 'Develop the core skills needed for this career path',
      durationWeeks: 8,
      order: 1,
      isCompleted: false,
      resources: this.getFoundationResources(career)
    })

    // Step 2: Core Knowledge
    steps.push({
      id: 'core-knowledge',
      title: 'Learn Core Knowledge',
      description: 'Master the fundamental concepts and theories',
      durationWeeks: 12,
      order: 2,
      isCompleted: false,
      resources: this.getCoreKnowledgeResources(career)
    })

    // Step 3: Practical Experience
    steps.push({
      id: 'practical-experience',
      title: 'Gain Practical Experience',
      description: 'Apply your knowledge through hands-on projects',
      durationWeeks: 16,
      order: 3,
      isCompleted: false,
      resources: this.getPracticalExperienceResources(career)
    })

    // Step 4: Specialization
    steps.push({
      id: 'specialization',
      title: 'Choose Specialization',
      description: 'Focus on a specific area within your field',
      durationWeeks: 10,
      order: 4,
      isCompleted: false,
      resources: this.getSpecializationResources(career)
    })

    // Step 5: Professional Development
    steps.push({
      id: 'professional-development',
      title: 'Professional Development',
      description: 'Build your professional network and portfolio',
      durationWeeks: 8,
      order: 5,
      isCompleted: false,
      resources: this.getProfessionalDevelopmentResources(career)
    })

    return steps
  }

  private getFoundationResources(career: CareerRecommendation): RoadmapResource[] {
    const resources: RoadmapResource[] = []

    // Add free resources
    resources.push({
      id: 'free-course-1',
      title: 'Introduction to Career Fundamentals',
      type: 'course',
      url: 'https://example.com/free-course',
      description: 'Free online course covering basic concepts',
      estimatedHours: 20,
      isFree: true
    })

    // Add paid resources
    resources.push({
      id: 'paid-course-1',
      title: 'Comprehensive Foundation Course',
      type: 'course',
      url: 'https://example.com/paid-course',
      description: 'In-depth course with certification',
      estimatedHours: 40,
      isFree: false,
      cost: 99
    })

    return resources
  }

  private getCoreKnowledgeResources(career: CareerRecommendation): RoadmapResource[] {
    const resources: RoadmapResource[] = []

    resources.push({
      id: 'book-1',
      title: 'Essential Career Guide',
      type: 'book',
      description: 'Comprehensive book covering all aspects',
      estimatedHours: 30,
      isFree: false,
      cost: 25
    })

    resources.push({
      id: 'project-1',
      title: 'Portfolio Project',
      type: 'project',
      description: 'Build a real-world project to showcase skills',
      estimatedHours: 50,
      isFree: true
    })

    return resources
  }

  private getPracticalExperienceResources(career: CareerRecommendation): RoadmapResource[] {
    const resources: RoadmapResource[] = []

    resources.push({
      id: 'mentorship-1',
      title: 'Career Mentorship Program',
      type: 'mentorship',
      description: 'One-on-one guidance from industry professionals',
      estimatedHours: 10,
      isFree: false,
      cost: 200
    })

    resources.push({
      id: 'certification-1',
      title: 'Professional Certification',
      type: 'certification',
      description: 'Industry-recognized certification',
      estimatedHours: 40,
      isFree: false,
      cost: 150
    })

    return resources
  }

  private getSpecializationResources(career: CareerRecommendation): RoadmapResource[] {
    const resources: RoadmapResource[] = []

    resources.push({
      id: 'specialized-course',
      title: 'Advanced Specialization Course',
      type: 'course',
      description: 'Deep dive into specific area',
      estimatedHours: 60,
      isFree: false,
      cost: 199
    })

    return resources
  }

  private getProfessionalDevelopmentResources(career: CareerRecommendation): RoadmapResource[] {
    const resources: RoadmapResource[] = []

    resources.push({
      id: 'networking-event',
      title: 'Industry Networking Events',
      type: 'mentorship',
      description: 'Attend conferences and meet professionals',
      estimatedHours: 20,
      isFree: false,
      cost: 100
    })

    return resources
  }

  calculateProgress(roadmap: CareerRoadmap): {
    completedSteps: number
    totalSteps: number
    progressPercentage: number
    estimatedWeeksRemaining: number
  } {
    const completedSteps = roadmap.steps.filter(step => step.isCompleted).length
    const totalSteps = roadmap.steps.length
    const progressPercentage = (completedSteps / totalSteps) * 100

    const remainingSteps = roadmap.steps.filter(step => !step.isCompleted)
    const estimatedWeeksRemaining = remainingSteps.reduce((total, step) => total + step.durationWeeks, 0)

    return {
      completedSteps,
      totalSteps,
      progressPercentage: Math.round(progressPercentage),
      estimatedWeeksRemaining
    }
  }
}





