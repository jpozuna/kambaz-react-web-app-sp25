import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaEye, FaPlay } from 'react-icons/fa';
import { Quiz } from './types';

interface QuizDetailsProps {
    quiz: Quiz;
    isFaculty: boolean;
}

const QuizDetails: React.FC<QuizDetailsProps> = ({ quiz, isFaculty }) => {
    const navigate = useNavigate();
    const { courseId } = useParams<{ courseId: string }>();

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
        navigate(`/courses/${courseId}/quizzes/${quiz._id}/edit`);
    };

    const handlePreview = () => {
        navigate(`/courses/${courseId}/quizzes/${quiz._id}/preview`);
    };

    const handleStartQuiz = () => {
        navigate(`/courses/${courseId}/quizzes/${quiz._id}/take`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">{quiz.title}</h1>
                    {isFaculty ? (
                        <div className="flex gap-4">
                            <button
                                onClick={handlePreview}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                            >
                                <FaEye /> Preview
                            </button>
                            <button
                                onClick={handleEdit}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                            >
                                <FaEdit /> Edit
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleStartQuiz}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                            disabled={!quiz.published}
                        >
                            <FaPlay /> {quiz.published ? 'Start Quiz' : 'Not Available'}
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-700">Quiz Type</h3>
                            <p className="text-gray-600">{quiz.quizType.replace('-', ' ').toUpperCase()}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">Points</h3>
                            <p className="text-gray-600">{quiz.points}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">Assignment Group</h3>
                            <p className="text-gray-600">{quiz.assignmentGroup.toUpperCase()}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">Shuffle Answers</h3>
                            <p className="text-gray-600">{quiz.shuffleAnswers ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">Time Limit</h3>
                            <p className="text-gray-600">{quiz.timeLimit} Minutes</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">Multiple Attempts</h3>
                            <p className="text-gray-600">
                                {quiz.multipleAttempts ? `Yes (${quiz.attemptsAllowed} attempts)` : 'No'}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-700">Show Correct Answers</h3>
                            <p className="text-gray-600">{quiz.showCorrectAnswers.replace('-', ' ').toUpperCase()}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">Access Code</h3>
                            <p className="text-gray-600">{quiz.accessCode || 'None'}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">One Question at a Time</h3>
                            <p className="text-gray-600">{quiz.oneQuestionAtATime ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">Webcam Required</h3>
                            <p className="text-gray-600">{quiz.webcamRequired ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">Lock Questions After Answering</h3>
                            <p className="text-gray-600">{quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    <div>
                        <h3 className="font-semibold text-gray-700">Due Date</h3>
                        <p className="text-gray-600">{formatDate(quiz.dueDate)}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700">Available From</h3>
                        <p className="text-gray-600">{formatDate(quiz.availableFrom)}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700">Available Until</h3>
                        <p className="text-gray-600">{formatDate(quiz.availableUntil)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizDetails; 