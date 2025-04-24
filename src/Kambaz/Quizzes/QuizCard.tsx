import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Quiz } from './types';

interface QuizCardProps {
    quiz: Quiz;
    isFaculty: boolean;
}

const QuizCard = ({ quiz, isFaculty }: QuizCardProps) => {
    const navigate = useNavigate();

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleEdit = () => {
        navigate(`edit/${quiz._id}`);
    };

    const handleDelete = () => {
        // TODO: Implement quiz deletion
    };

    const handleTakeQuiz = () => {
        navigate(`take/${quiz._id}`);
    };

    const handlePreview = () => {
        navigate(`preview/${quiz._id}`);
    };

    return (
        <div className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="mb-1">{quiz.title}</h5>
                    <p className="mb-1">Points: {quiz.points}</p>
                    <small className="text-muted">
                        Available: {formatDate(quiz.availableFrom)} - {formatDate(quiz.availableUntil)}
                        <br />
                        Due: {formatDate(quiz.dueDate)}
                    </small>
                </div>
                <div>
                    {isFaculty ? (
                        <div className="btn-group">
                            <button
                                className="btn btn-outline-primary"
                                onClick={handlePreview}
                                title="Preview Quiz"
                            >
                                <FaEye />
                            </button>
                            <button
                                className="btn btn-outline-secondary"
                                onClick={handleEdit}
                                title="Edit Quiz"
                            >
                                <FaEdit />
                            </button>
                            <button
                                className="btn btn-outline-danger"
                                onClick={handleDelete}
                                title="Delete Quiz"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={handleTakeQuiz}
                            disabled={!quiz.published}
                        >
                            {quiz.published ? 'Take Quiz' : 'Not Available'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizCard; 