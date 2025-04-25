import React, { useState } from 'react';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { Quiz, Question, QuizAnswer } from './types';
import './styles.css';

interface QuizPreviewProps {
    quiz: Quiz;
    onEdit: () => void;
}

const QuizPreview: React.FC<QuizPreviewProps> = ({
    quiz,
    onEdit
}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = quiz.questions[currentQuestionIndex];

    const handleAnswerChange = (answer: string | string[]) => {
        const newAnswers = [...answers];
        const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === currentQuestion.id);

        if (existingAnswerIndex >= 0) {
            newAnswers[existingAnswerIndex] = {
                ...newAnswers[existingAnswerIndex],
                answer
            };
        } else {
            newAnswers.push({
                questionId: currentQuestion.id,
                answer,
                isCorrect: false
            });
        }

        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const calculateScore = () => {
        let totalPoints = 0;
        let earnedPoints = 0;

        quiz.questions.forEach(question => {
            totalPoints += question.points;
            const answer = answers.find(a => a.questionId === question.id);
            if (answer && answer.isCorrect) {
                earnedPoints += question.points;
            }
        });

        return {
            earned: earnedPoints,
            total: totalPoints,
            percentage: (earnedPoints / totalPoints) * 100
        };
    };

    const renderQuestion = () => {
        if (!currentQuestion) return null;

        switch (currentQuestion.type) {
            case 'multiple-choice':
                return (
                    <div className="multiple-choice">
                        {currentQuestion.options?.map(option => (
                            <div key={option.id} className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name={`question-${currentQuestion.id}`}
                                    id={`option-${option.id}`}
                                    checked={answers.find(a => a.questionId === currentQuestion.id)?.answer === option.id}
                                    onChange={() => handleAnswerChange(option.id)}
                                />
                                <label className="form-check-label" htmlFor={`option-${option.id}`}>
                                    {option.content}
                                </label>
                            </div>
                        ))}
                    </div>
                );

            case 'true-false':
                return (
                    <div className="true-false">
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name={`question-${currentQuestion.id}`}
                                id="true"
                                checked={answers.find(a => a.questionId === currentQuestion.id)?.answer === 'true'}
                                onChange={() => handleAnswerChange('true')}
                            />
                            <label className="form-check-label" htmlFor="true">
                                True
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name={`question-${currentQuestion.id}`}
                                id="false"
                                checked={answers.find(a => a.questionId === currentQuestion.id)?.answer === 'false'}
                                onChange={() => handleAnswerChange('false')}
                            />
                            <label className="form-check-label" htmlFor="false">
                                False
                            </label>
                        </div>
                    </div>
                );

            case 'fill-blank':
                return (
                    <div className="fill-blank">
                        <input
                            type="text"
                            className="form-control"
                            value={answers.find(a => a.questionId === currentQuestion.id)?.answer as string || ''}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            placeholder="Enter your answer"
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    if (showResults) {
        const score = calculateScore();
        return (
            <div className="quiz-preview-results">
                <h2>Quiz Results</h2>
                <div className="score-summary">
                    <h3>Score: {score.earned} / {score.total} ({score.percentage.toFixed(1)}%)</h3>
                </div>
                <div className="questions-review">
                    {quiz.questions.map((question, index) => {
                        const answer = answers.find(a => a.questionId === question.id);
                        return (
                            <div key={question.id} className="question-review">
                                <h4>Question {index + 1}</h4>
                                <p>{question.title}</p>
                                <div className="answer-review">
                                    <p>Your answer: {answer?.answer}</p>
                                    <p>Correct answer: {question.correctAnswer}</p>
                                    <div className="result-indicator">
                                        {answer?.isCorrect ? (
                                            <FaCheck className="text-success" />
                                        ) : (
                                            <FaTimes className="text-danger" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                            setShowResults(false);
                            setCurrentQuestionIndex(0);
                            setAnswers([]);
                        }}
                    >
                        Try Again
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={onEdit}
                    >
                        <FaEdit className="me-2" />
                        Edit Quiz
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-preview">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Preview Quiz</h2>
                <button
                    className="btn btn-primary"
                    onClick={onEdit}
                >
                    <FaEdit className="me-2" />
                    Edit Quiz
                </button>
            </div>

            <div className="progress mb-4">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                >
                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </div>
            </div>

            <div className="question-container">
                <h3>{currentQuestion.title}</h3>
                <div className="question-content">
                    {currentQuestion.content}
                </div>
                <div className="question-options">
                    {renderQuestion()}
                </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
                <button
                    className="btn btn-outline-primary"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                >
                    Previous
                </button>
                <button
                    className="btn btn-primary"
                    onClick={handleNext}
                >
                    {currentQuestionIndex === quiz.questions.length - 1 ? 'Submit' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default QuizPreview; 