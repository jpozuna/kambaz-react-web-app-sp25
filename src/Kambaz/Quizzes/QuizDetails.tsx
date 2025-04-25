import React, { useState } from 'react';
import { FaEdit, FaEye } from 'react-icons/fa';
import { Quiz, User } from './types';
import './styles.css';

interface QuizDetailsProps {
    quiz: Quiz;
    currentUser: User;
    onEdit: () => void;
    onPreview: () => void;
    onStart: () => void;
}

const QuizDetails: React.FC<QuizDetailsProps> = ({
    quiz,
    currentUser,
    onEdit,
    onPreview,
    onStart
}) => {
    const [activeTab, setActiveTab] = useState<'details' | 'questions'>('details');

    const getQuizStatus = () => {
        const now = new Date();
        if (now > quiz.untilDate) return 'Closed';
        if (now < quiz.availableDate) return `Not available until ${quiz.availableDate.toLocaleDateString()}`;
        if (!quiz.isPublished) return 'Not published yet';
        return 'Available';
    };

    const quizStatus = getQuizStatus();

    return (
        <div className="quiz-details-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{quiz.title}</h2>
                <div>
                    {currentUser.role === 'FACULTY' ? (
                        <>
                            <button
                                className="btn btn-outline-primary me-2"
                                onClick={onPreview}
                            >
                                <FaEye className="me-2" />
                                Preview
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={onEdit}
                            >
                                <FaEdit className="me-2" />
                                Edit
                            </button>
                        </>
                    ) : (
                        <div>
                            <button
                                className="btn btn-primary"
                                onClick={onStart}
                                disabled={quizStatus !== 'Available'}
                            >
                                Start Quiz
                            </button>
                            {quizStatus !== 'Available' && (
                                <div className="text-muted mt-2">
                                    {quizStatus}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="quiz-tabs mb-4">
                <button
                    className={`btn ${activeTab === 'details' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                    onClick={() => setActiveTab('details')}
                >
                    Details
                </button>
                <button
                    className={`btn ${activeTab === 'questions' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('questions')}
                >
                    Questions
                </button>
            </div>

            {activeTab === 'details' ? (
                <div className="quiz-details">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Quiz Type</label>
                                <p>{quiz.type}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Points</label>
                                <p>{quiz.points}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Assignment Group</label>
                                <p>{quiz.assignmentGroup}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Shuffle Answers</label>
                                <p>{quiz.shuffleAnswers ? 'Yes' : 'No'}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Time Limit</label>
                                <p>{quiz.timeLimit} minutes</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Multiple Attempts</label>
                                <p>{quiz.multipleAttempts ? 'Yes' : 'No'}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Show Correct Answers</label>
                                <p>{quiz.showCorrectAnswers ? 'Yes' : 'No'}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Access Code</label>
                                <p>{quiz.accessCode || 'None'}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">One Question at a Time</label>
                                <p>{quiz.oneQuestionAtATime ? 'Yes' : 'No'}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Webcam Required</label>
                                <p>{quiz.webcamRequired ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Due Date</label>
                                <p>{quiz.dueDate.toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Available Date</label>
                                <p>{quiz.availableDate.toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Until Date</label>
                                <p>{quiz.untilDate.toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="quiz-questions">
                    <h3>Questions ({quiz.questions.length})</h3>
                    {quiz.questions.map((question, index) => (
                        <div key={question.id} className="question-item">
                            <h4>Question {index + 1}</h4>
                            <p>{question.title}</p>
                            <p>Points: {question.points}</p>
                            <p>Type: {question.type}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuizDetails; 