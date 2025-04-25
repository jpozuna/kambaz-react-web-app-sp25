import React, { useState, useEffect } from 'react';
import { FaPlus, FaEllipsisV, FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import { Quiz, User } from './types';
import { loadQuizzes, getQuizzesByCourse, updateQuiz, deleteQuiz } from './services/quizService';
import './styles.css';

interface QuizListProps {
    courseId: string;
    currentUser: User;
    onQuizClick: (quiz: Quiz) => void;
    onAddQuiz: () => void;
}

const QuizList: React.FC<QuizListProps> = ({
    courseId,
    currentUser,
    onQuizClick,
    onAddQuiz
}) => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [sortBy, setSortBy] = useState<'name' | 'dueDate' | 'availableDate'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    console.log('QuizList - Current user:', currentUser);
    console.log('QuizList - Course ID:', courseId);

    useEffect(() => {
        const loadQuizzesForCourse = () => {
            const courseQuizzes = getQuizzesByCourse(courseId);
            // Convert string dates to Date objects
            const quizzesWithDates = courseQuizzes.map(quiz => ({
                ...quiz,
                dueDate: new Date(quiz.dueDate),
                availableDate: new Date(quiz.availableDate),
                untilDate: new Date(quiz.untilDate),
                createdAt: new Date(quiz.createdAt),
                updatedAt: new Date(quiz.updatedAt)
            }));
            console.log('Loaded quizzes:', quizzesWithDates);
            setQuizzes(quizzesWithDates);
        };

        loadQuizzesForCourse();
    }, [courseId]);

    const handlePublishToggle = (quiz: Quiz) => {
        console.log('Publish toggle clicked for quiz:', quiz);
        const updatedQuiz = {
            ...quiz,
            isPublished: !quiz.isPublished
        };
        updateQuiz(updatedQuiz);
        setQuizzes(quizzes.map(q => q.id === quiz.id ? updatedQuiz : q));
    };

    const handleDelete = (quizId: string) => {
        console.log('Delete clicked for quiz:', quizId);
        if (window.confirm('Are you sure you want to delete this quiz?')) {
            deleteQuiz(quizId);
            setQuizzes(quizzes.filter(q => q.id !== quizId));
        }
    };

    const getAvailabilityStatus = (quiz: Quiz) => {
        const now = new Date();
        if (now > quiz.untilDate) return 'Closed';
        if (now >= quiz.availableDate && now <= quiz.untilDate) return 'Available';
        return `Not available until ${quiz.availableDate.toLocaleDateString()}`;
    };

    const sortedQuizzes = [...quizzes].sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
            case 'name':
                comparison = a.title.localeCompare(b.title);
                break;
            case 'dueDate':
                comparison = a.dueDate.getTime() - b.dueDate.getTime();
                break;
            case 'availableDate':
                comparison = a.availableDate.getTime() - b.availableDate.getTime();
                break;
        }
        return sortOrder === 'asc' ? comparison : -comparison;
    });

    const isFaculty = currentUser.role.toUpperCase() === 'FACULTY';

    return (
        <div className="quiz-list-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quizzes</h2>
                {isFaculty && (
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            console.log('Add Quiz button clicked');
                            onAddQuiz();
                        }}
                    >
                        <FaPlus className="me-2" />
                        Add Quiz
                    </button>
                )}
            </div>

            {quizzes.length === 0 ? (
                <div className="text-center p-5">
                    <p className="text-muted">No quizzes available. Click the Add Quiz button to create one.</p>
                </div>
            ) : (
                <div className="quiz-list">
                    {sortedQuizzes.map(quiz => (
                        <div key={quiz.id} className="quiz-item">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h3 
                                        className="quiz-title"
                                        onClick={() => {
                                            console.log('Quiz title clicked:', quiz);
                                            onQuizClick(quiz);
                                        }}
                                    >
                                        {quiz.title}
                                    </h3>
                                    <div className="quiz-meta">
                                        <span className="me-3">Status: {getAvailabilityStatus(quiz)}</span>
                                        <span className="me-3">Due: {quiz.dueDate.toLocaleDateString()}</span>
                                        <span className="me-3">Points: {quiz.points}</span>
                                        <span>Questions: {quiz.questions.length}</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    {isFaculty && (
                                        <button
                                            className="btn btn-link"
                                            onClick={() => handlePublishToggle(quiz)}
                                        >
                                            {quiz.isPublished ? (
                                                <FaCheck className="text-success" />
                                            ) : (
                                                <FaTimes className="text-danger" />
                                            )}
                                        </button>
                                    )}
                                    {isFaculty && (
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-link"
                                                type="button"
                                                id={`dropdown-${quiz.id}`}
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <FaEllipsisV />
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby={`dropdown-${quiz.id}`}>
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => onQuizClick(quiz)}
                                                    >
                                                        <FaEdit className="me-2" />
                                                        Edit
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => handleDelete(quiz.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuizList; 