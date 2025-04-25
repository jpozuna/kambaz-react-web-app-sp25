import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaClock } from 'react-icons/fa';
import { Quiz, QuizAttempt, QuizAnswer } from './types';
import { saveAttempt, getLatestAttempt } from './services/quizService';
import './styles.css';

interface QuizTakerProps {
    quiz: Quiz;
    userId: string;
    onComplete: () => void;
}

const QuizTaker: React.FC<QuizTakerProps> = ({
    quiz,
    userId,
    onComplete
}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60); // in seconds
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = quiz.questions[currentQuestionIndex];

    useEffect(() => {
        if (timeLeft > 0 && !isSubmitted) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isSubmitted) {
            handleSubmit();
        }
    }, [timeLeft, isSubmitted]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

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
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        if (window.confirm('Are you sure you want to submit the quiz?')) {
            const attempt: QuizAttempt = {
                id: `attempt-${Date.now()}`,
                quizId: quiz.id,
                userId,
                answers,
                score: calculateScore().earned,
                startedAt: new Date(Date.now() - (quiz.timeLimit * 60 - timeLeft) * 1000),
                submittedAt: new Date()
            };

            saveAttempt(attempt);
            setIsSubmitted(true);
            setShowResults(true);
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
                                    disabled={isSubmitted}
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
                                disabled={isSubmitted}
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
                                disabled={isSubmitted}
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
                            disabled={isSubmitted}
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
            <div className="quiz-results">
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
                <div className="d-flex justify-content-end mt-4">
                    <button
                        className="btn btn-primary"
                        onClick={onComplete}
                    >
                        Done
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-taker">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{quiz.title}</h2>
                <div className="timer">
                    <FaClock className="me-2" />
                    {formatTime(timeLeft)}
                </div>
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
                {currentQuestionIndex === quiz.questions.length - 1 ? (
                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={isSubmitted}
                    >
                        Submit Quiz
                    </button>
                ) : (
                    <button
                        className="btn btn-primary"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizTaker; 