import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaTimes } from 'react-icons/fa';
import { Quiz } from './types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuizEditorProps {
    quiz: Quiz;
    onSave: (quiz: Quiz) => Promise<void>;
}

const QuizEditor: React.FC<QuizEditorProps> = ({ quiz, onSave }) => {
    const navigate = useNavigate();
    const { courseId } = useParams<{ courseId: string }>();
    const [activeTab, setActiveTab] = useState<'details' | 'questions'>('details');
    const [editedQuiz, setEditedQuiz] = useState<Quiz>(quiz);
    const [isSaving, setIsSaving] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setEditedQuiz(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedQuiz(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDescriptionChange = (content: string) => {
        setEditedQuiz(prev => ({
            ...prev,
            description: content
        }));
    };

    const handleSave = async (publish: boolean = false) => {
        try {
            setIsSaving(true);
            await onSave({
                ...editedQuiz,
                published: publish ? true : editedQuiz.published
            });
            navigate(publish 
                ? `/courses/${courseId}/quizzes`
                : `/courses/${courseId}/quizzes/${quiz._id}`
            );
        } catch (error) {
            console.error('Failed to save quiz:', error);
            // TODO: Show error message to user
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        navigate(`/courses/${courseId}/quizzes`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Edit Quiz</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleSave(false)}
                            disabled={isSaving}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                        >
                            <FaSave /> Save
                        </button>
                        <button
                            onClick={() => handleSave(true)}
                            disabled={isSaving}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                        >
                            <FaSave /> Save & Publish
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                        >
                            <FaTimes /> Cancel
                        </button>
                    </div>
                </div>

                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('details')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'details'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Details
                        </button>
                        <button
                            onClick={() => setActiveTab('questions')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'questions'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Questions
                        </button>
                    </nav>
                </div>

                {activeTab === 'details' ? (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={editedQuiz.title}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <ReactQuill
                                value={editedQuiz.description || ''}
                                onChange={handleDescriptionChange}
                                className="mt-1"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Quiz Type</label>
                                <select
                                    name="quizType"
                                    value={editedQuiz.quizType}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="graded-quiz">Graded Quiz</option>
                                    <option value="practice-quiz">Practice Quiz</option>
                                    <option value="graded-survey">Graded Survey</option>
                                    <option value="ungraded-survey">Ungraded Survey</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Assignment Group</label>
                                <select
                                    name="assignmentGroup"
                                    value={editedQuiz.assignmentGroup}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="quizzes">Quizzes</option>
                                    <option value="exams">Exams</option>
                                    <option value="assignments">Assignments</option>
                                    <option value="project">Project</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Points</label>
                                <input
                                    type="number"
                                    name="points"
                                    value={editedQuiz.points}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Time Limit (minutes)</label>
                                <input
                                    type="number"
                                    name="timeLimit"
                                    value={editedQuiz.timeLimit}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Show Correct Answers</label>
                                <select
                                    name="showCorrectAnswers"
                                    value={editedQuiz.showCorrectAnswers}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="never">Never</option>
                                    <option value="after-submission">After Submission</option>
                                    <option value="after-due-date">After Due Date</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Access Code</label>
                                <input
                                    type="text"
                                    name="accessCode"
                                    value={editedQuiz.accessCode || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="shuffleAnswers"
                                    checked={editedQuiz.shuffleAnswers}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">Shuffle Answers</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="multipleAttempts"
                                    checked={editedQuiz.multipleAttempts}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">Multiple Attempts</label>
                            </div>

                            {editedQuiz.multipleAttempts && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Attempts Allowed</label>
                                    <input
                                        type="number"
                                        name="attemptsAllowed"
                                        value={editedQuiz.attemptsAllowed}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            )}

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="oneQuestionAtATime"
                                    checked={editedQuiz.oneQuestionAtATime}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">One Question at a Time</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="webcamRequired"
                                    checked={editedQuiz.webcamRequired}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">Webcam Required</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="lockQuestionsAfterAnswering"
                                    checked={editedQuiz.lockQuestionsAfterAnswering}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">Lock Questions After Answering</label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                                <input
                                    type="datetime-local"
                                    name="dueDate"
                                    value={editedQuiz.dueDate}
                                    onChange={handleDateChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Available From</label>
                                <input
                                    type="datetime-local"
                                    name="availableFrom"
                                    value={editedQuiz.availableFrom}
                                    onChange={handleDateChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Available Until</label>
                                <input
                                    type="datetime-local"
                                    name="availableUntil"
                                    value={editedQuiz.availableUntil}
                                    onChange={handleDateChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Questions tab content will be implemented separately */}
                        <p className="text-gray-500">Questions editor will be implemented here</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizEditor; 