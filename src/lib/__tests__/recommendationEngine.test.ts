import { RecommendationEngine } from '../recommendationEngine'

describe('RecommendationEngine', () => {
  let engine: RecommendationEngine

  beforeEach(() => {
    engine = RecommendationEngine.getInstance()
    // Clear cache before each test
    engine.clearCache()
  })

  describe('getInstance', () => {
    it('should return the same instance', () => {
      const instance1 = RecommendationEngine.getInstance()
      const instance2 = RecommendationEngine.getInstance()
      expect(instance1).toBe(instance2)
    })
  })

  describe('clearCache', () => {
    it('should clear the cache', () => {
      // This is a simple test to ensure the method exists and doesn't throw
      expect(() => engine.clearCache()).not.toThrow()
    })
  })

  describe('generateRecommendations', () => {
    it('should generate recommendations for valid quiz answers', async () => {
      const answers = [
        { questionId: 'skills', answer: 'Python, Data Analysis, Communication' },
        { questionId: 'interests', answer: ['Technology', 'Business'] },
        { questionId: 'experience_level', answer: 'Intermediate' }
      ]

      const result = await engine.generateRecommendations('user123', answers, 'quiz123')

      expect(result).toBeDefined()
      expect(result.recommendations).toBeDefined()
      expect(result.userId).toBe('user123')
      expect(result.answerSetId).toBe('quiz123')
    })

    it('should return cached recommendations for same user and quiz', async () => {
      const answers = [
        { questionId: 'skills', answer: 'JavaScript, React, Node.js' },
        { questionId: 'interests', answer: ['Technology'] },
        { questionId: 'experience_level', answer: 'Beginner' }
      ]

      // First call
      const result1 = await engine.generateRecommendations('user456', answers, 'quiz456')
      
      // Second call with same parameters
      const result2 = await engine.generateRecommendations('user456', answers, 'quiz456')

      expect(result1).toEqual(result2)
    })
  })
})
