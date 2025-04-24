import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Quiz } from './reducer';
import { FaPlus } from 'react-icons/fa';

const Quizzes = () => {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { quizzes } = useSelector((state: any) => state.quizzesReducer) || { quizzes: [] };
    const isFaculty = currentUser?.role === 'FACULTY';

    const courseQuizzes = quizzes.filter((quiz: Quiz) => quiz.courseId === cid);

    const handleAddQuiz = () => {
        // TODO: Implement quiz creation
    };

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quizzes</h2>
                {isFaculty && (
                    <button 
                        className="btn btn-primary" 
                        onClick={handleAddQuiz}
                    >
                        <FaPlus className="me-2" />
                        Add Quiz
                    </button>
                )}
            </div>

            {courseQuizzes.length === 0 ? (
                <div className="text-center p-5 bg-light rounded">
                    <h4 className="text-muted">
                        {isFaculty 
                            ? "No quizzes yet. Click the 'Add Quiz' button to create one!"
                            : "No quizzes available for this course yet."}
                    </h4>
                </div>
            ) : (
                <div className="list-group">
                    {courseQuizzes.map((quiz: Quiz) => (
                        <div 
                            key={quiz._id}
                            className="list-group-item list-group-item-action"
                        >
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{quiz.title}</h5>
                                <small>Due: {new Date(quiz.dueDate).toLocaleDateString()}</small>
                            </div>
                            <p className="mb-1">{quiz.description}</p>
                            <small>Time Limit: {quiz.timeLimit} minutes</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Quizzes; 