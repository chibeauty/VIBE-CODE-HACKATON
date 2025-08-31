import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FormBuilder } from '../FormBuilder'
import { QuizQuestion, QuizAnswer } from '@/types/quiz'

// Mock the quiz questions
const mockQuestion: QuizQuestion = {
  id: 'interests',
  type: 'tags',
  question: 'What are your main interests?',
  tags: ['Technology', 'Healthcare', 'Finance', 'Education', 'Arts'],
  required: true
}

const mockMultipleChoiceQuestion: QuizQuestion = {
  id: 'experience',
  type: 'multiple_choice',
  question: 'What is your current experience level?',
  options: ['Beginner', 'Intermediate', 'Advanced'],
  required: true
}

const mockTextQuestion: QuizQuestion = {
  id: 'goals',
  type: 'text',
  question: 'What are your career goals?',
  required: true
}

const mockSliderQuestion: QuizQuestion = {
  id: 'timeCommitment',
  type: 'slider',
  question: 'How much time can you commit weekly?',
  min: 1,
  max: 40,
  step: 1,
  required: true
}

describe('FormBuilder', () => {
  const mockOnAnswerChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders tags question correctly', () => {
    render(
      <FormBuilder
        question={mockQuestion}
        answer={null}
        onAnswerChange={mockOnAnswerChange}
      />
    )

    expect(screen.getByText('What are your main interests?')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByText('Healthcare')).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument() // Required indicator
  })

  it('handles tags selection correctly', () => {
    const { rerender } = render(
      <FormBuilder
        question={mockQuestion}
        answer={null}
        onAnswerChange={mockOnAnswerChange}
      />
    )

    const technologyOption = screen.getByText('Technology')
    const healthcareOption = screen.getByText('Healthcare')

    // First click should add Technology
    fireEvent.click(technologyOption)
    expect(mockOnAnswerChange).toHaveBeenCalledWith({
      questionId: 'interests',
      answer: ['Technology']
    })

    // Simulate the parent component updating the answer
    const firstAnswer: QuizAnswer = {
      questionId: 'interests',
      answer: ['Technology']
    }

    // Re-render with the updated answer
    rerender(
      <FormBuilder
        question={mockQuestion}
        answer={firstAnswer}
        onAnswerChange={mockOnAnswerChange}
      />
    )

    // Second click should add Healthcare to the existing array
    fireEvent.click(healthcareOption)
    expect(mockOnAnswerChange).toHaveBeenCalledWith({
      questionId: 'interests',
      answer: ['Technology', 'Healthcare']
    })

    // Verify the total number of calls
    expect(mockOnAnswerChange).toHaveBeenCalledTimes(2)
  })

  it('handles tag deselection correctly', () => {
    const existingAnswer: QuizAnswer = {
      questionId: 'interests',
      answer: ['Technology', 'Healthcare']
    }

    render(
      <FormBuilder
        question={mockQuestion}
        answer={existingAnswer}
        onAnswerChange={mockOnAnswerChange}
      />
    )

    const technologyOption = screen.getByText('Technology')
    fireEvent.click(technologyOption)

    expect(mockOnAnswerChange).toHaveBeenCalledWith({
      questionId: 'interests',
      answer: ['Healthcare']
    })
  })

  it('handles multiple choice selection correctly', () => {
    render(
      <FormBuilder
        question={mockMultipleChoiceQuestion}
        answer={null}
        onAnswerChange={mockOnAnswerChange}
      />
    )

    const intermediateOption = screen.getByText('Intermediate')
    fireEvent.click(intermediateOption)

    expect(mockOnAnswerChange).toHaveBeenCalledWith({
      questionId: 'experience',
      answer: 'Intermediate'
    })
  })

  it('handles text input correctly', () => {
    render(
      <FormBuilder
        question={mockTextQuestion}
        answer={null}
        onAnswerChange={mockOnAnswerChange}
      />
    )

    const textInput = screen.getByPlaceholderText('Type your answer...')
    fireEvent.change(textInput, { target: { value: 'I want to become a software developer' } })

    expect(mockOnAnswerChange).toHaveBeenCalledWith({
      questionId: 'goals',
      answer: 'I want to become a software developer'
    })
  })

  it('handles slider input correctly', () => {
    render(
      <FormBuilder
        question={mockSliderQuestion}
        answer={null}
        onAnswerChange={mockOnAnswerChange}
      />
    )

    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '20' } })

    expect(mockOnAnswerChange).toHaveBeenCalledWith({
      questionId: 'timeCommitment',
      answer: 20
    })
  })

  it('shows current answer when provided', () => {
    const existingAnswer: QuizAnswer = {
      questionId: 'goals',
      answer: 'Software Developer'
    }

    render(
      <FormBuilder
        question={mockTextQuestion}
        answer={existingAnswer}
        onAnswerChange={mockOnAnswerChange}
      />
    )

    expect(screen.getByDisplayValue('Software Developer')).toBeInTheDocument()
  })

  it('shows required field indicators', () => {
    render(
      <FormBuilder
        question={mockQuestion}
        answer={null}
        onAnswerChange={mockOnAnswerChange}
      />
    )

    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('does not show required indicator for non-required questions', () => {
    const nonRequiredQuestion = { ...mockQuestion, required: false }

    render(
      <FormBuilder
        question={nonRequiredQuestion}
        answer={null}
        onAnswerChange={mockOnAnswerChange}
      />
    )

    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  it('handles slider with existing value correctly', () => {
    const existingAnswer: QuizAnswer = {
      questionId: 'timeCommitment',
      answer: 15
    }

    render(
      <FormBuilder
        question={mockSliderQuestion}
        answer={existingAnswer}
        onAnswerChange={mockOnAnswerChange}
      />
    )

    expect(screen.getByDisplayValue('15')).toBeInTheDocument()
  })

  it('shows selected tags count', () => {
    const existingAnswer: QuizAnswer = {
      questionId: 'interests',
      answer: ['Technology', 'Healthcare']
    }

    render(
      <FormBuilder
        question={mockQuestion}
        answer={existingAnswer}
        onAnswerChange={mockOnAnswerChange}
      />
    )

    expect(screen.getByText('Selected: Technology, Healthcare')).toBeInTheDocument()
  })
})
