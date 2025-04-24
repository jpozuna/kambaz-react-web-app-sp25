import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { Quiz, Question } from './types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuizPreviewProps {
    quiz: Quiz;
}

interface Answer {
    questionId: string;
    answer: string | boolean;
}

const QuizPreview: React.FC<QuizPreviewProps> = ({ quiz }) => {
    const navigate = useNavigate();
    const { courseId } = useParams<{ courseId: string }>();
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState<number | null>(null);

    const handleAnswerChange = (questionId: string, answer: string | boolean) => {
        setAnswers(prev => {
            const existingAnswer = prev.find(a => a.questionId === questionId);
            if (existingAnswer) {
                return prev.map(a => a.questionId === questionId ? { ...a, answer } : a);
            }
            return [...prev, { questionId, answer }];
        });
    };

    const handleSubmit = () => {
        let totalScore = 0;
        let maxScore = 0;

        quiz.questions?.forEach(question => {
            maxScore += question.points;
            const answer = answers.find(a => a.questionId === question._id);
            if (answer) {
                switch (question.type) {
                    case 'multiple-choice':
                        if (answer.answer === question.correctAnswer) {
                            totalScore += question.points;
                        }
                        break;
                    case 'true-false':
                        if (answer.answer === question.correctAnswer) {
                            totalScore += question.points;
                        }
                        break;
                    case 'fill-blank':
                        const studentAnswer = answer.answer as string;
                        const correctAnswers = question.options || [];
                        const isCorrect = correctAnswers.some(correctAnswer => {
                            if (question.caseSensitive) {
                                return studentAnswer === correctAnswer;
                            }
                            return studentAnswer.toLowerCase() === correctAnswer.toLowerCase();
                        });
                        if (isCorrect) {
                            totalScore += question.points;
                        }
                        break;
                }
            }
        });

        setScore(totalScore);
        setIsSubmitted(true);
    };

    const handleEdit = () => {
        navigate(`/courses/${courseId}/quizzes/${quiz._id}/edit`);
    };

    const renderQuestion = (question: Question) => {
        const answer = answers.find(a => a.questionId === question._id);
        const isCorrect = isSubmitted && answer && (
            question.type === 'multiple-choice' ? answer.answer === question.correctAnswer :
            question.type === 'true-false' ? answer.answer === question.correctAnswer :
            question.type === 'fill-blank' ? (question.options || []).some(opt => 
                question.caseSensitive ? answer.answer === opt : (answer.answer as string).toLowerCase() === opt.toLowerCase()
            ) : false
        );

        return (
            <div key={question._id} className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold">{question.title || 'Untitled Question'}</h3>
                        <div className="mt-2" dangerouslySetInnerHTML={{ __html: question.text }} />
                        <p className="text-sm text-gray-500 mt-2">Points: {question.points}</p>
                    </div>
                    {isSubmitted && (
                        <div className={`text-lg ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                            {isCorrect ? <FaCheck /> : <FaTimes />}
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    {!isSubmitted ? (
                        <div>
                            {question.type === 'multiple-choice' && (
                                <div className="space-y-2">
                                    {question.options?.map((option, index) => (
                                        <label key={index} className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name={`question-${question._id}`}
                                                checked={answer?.answer === option}
                                                onChange={() => handleAnswerChange(question._id, option)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {question.type === 'true-false' && (
                                <div className="space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name={`question-${question._id}`}
                                            checked={answer?.answer === true}
                                            onChange={() => handleAnswerChange(question._id, true)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-2">True</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name={`question-${question._id}`}
                                            checked={answer?.answer === false}
                                            onChange={() => handleAnswerChange(question._id, false)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-2">False</span>
                                    </label>
                                </div>
                            )}

                            {question.type === 'fill-blank' && (
                                <input
                                    type="text"
                                    value={answer?.answer as string || ''}
                                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Enter your answer"
                                />
                            )}
                        </div>
                    ) : (
                        <div>
                            <p className="font-medium">Your Answer:</p>
                            <p className="text-gray-600">
                                {question.type === 'multiple-choice' && answer?.answer}
                                {question.type === 'true-false' && (answer?.answer === true ? 'True' : 'False')}
                                {question.type === 'fill-blank' && answer?.answer}
                            </p>
                            {!isCorrect && (
                                <div className="mt-2">
                                    <p className="font-medium text-red-500">Correct Answer:</p>
                                    <p className="text-gray-600">
                                        {question.type === 'multiple-choice' && question.correctAnswer}
                                        {question.type === 'true-false' && (question.correctAnswer === true ? 'True' : 'False')}
                                        {question.type === 'fill-blank' && (question.options || []).join(', ')}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{quiz.title}</h1>
                <button
                    onClick={handleEdit}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                    <FaEdit /> Edit Quiz
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div dangerouslySetInnerHTML={{ __html: quiz.description || '' }} />
                <div className="mt-4 text-sm text-gray-500">
                    <p>Points: {quiz.points}</p>
                    <p>Time Limit: {quiz.timeLimit} minutes</p>
                    {quiz.multipleAttempts && (
                        <p>Attempts Allowed: {quiz.attemptsAllowed}</p>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                {quiz.questions?.map(renderQuestion)}
            </div>

            {!isSubmitted ? (
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
                    >
                        Submit Quiz
                    </button>
                </div>
            ) : (
                <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Quiz Results</h2>
                    <p className="text-lg">
                        Score: {score} out of {quiz.points} points
                    </p>
                    <p className="text-gray-600 mt-2">
                        Percentage: {((score || 0) / quiz.points * 100).toFixed(1)}%
                    </p>
                </div>
            )}
        </div>
    );
};

export default QuizPreview; 