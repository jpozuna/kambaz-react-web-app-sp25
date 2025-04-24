import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { Quiz, Question } from './types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuizQuestionsEditorProps {
    quiz: Quiz;
    onSave: (quiz: Quiz) => Promise<void>;
}

interface QuestionEditorProps {
    question: Question;
    onSave: (question: Question) => void;
    onCancel: () => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, onSave, onCancel }) => {
    const [editedQuestion, setEditedQuestion] = useState<Question>(question);
    const [newChoice, setNewChoice] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setEditedQuestion(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleQuestionTextChange = (content: string) => {
        setEditedQuestion(prev => ({
            ...prev,
            text: content
        }));
    };

    const handleAddChoice = () => {
        if (newChoice.trim()) {
            setEditedQuestion(prev => ({
                ...prev,
                options: [...(prev.options || []), newChoice.trim()]
            }));
            setNewChoice('');
        }
    };

    const handleRemoveChoice = (index: number) => {
        setEditedQuestion(prev => ({
            ...prev,
            options: prev.options?.filter((_, i) => i !== index)
        }));
    };

    const handleCorrectAnswerChange = (index: number) => {
        setEditedQuestion(prev => ({
            ...prev,
            correctAnswer: prev.options?.[index] || ''
        }));
    };

    const handleTrueFalseChange = (isTrue: boolean) => {
        setEditedQuestion(prev => ({
            ...prev,
            correctAnswer: isTrue
        }));
    };

    const handleAddBlankAnswer = () => {
        if (newChoice.trim()) {
            setEditedQuestion(prev => ({
                ...prev,
                options: [...(prev.options || []), newChoice.trim()]
            }));
            setNewChoice('');
        }
    };

    const handleRemoveBlankAnswer = (index: number) => {
        setEditedQuestion(prev => ({
            ...prev,
            options: prev.options?.filter((_, i) => i !== index)
        }));
    };

    const handleCaseSensitiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedQuestion(prev => ({
            ...prev,
            caseSensitive: e.target.checked
        }));
    };

    const renderQuestionTypeEditor = () => {
        switch (editedQuestion.type) {
            case 'multiple-choice':
                return (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Choices</label>
                        <div className="space-y-2">
                            {editedQuestion.options?.map((choice, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="correctAnswer"
                                        checked={editedQuestion.correctAnswer === choice}
                                        onChange={() => handleCorrectAnswerChange(index)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <input
                                        type="text"
                                        value={choice}
                                        onChange={(e) => {
                                            const newOptions = [...(editedQuestion.options || [])];
                                            newOptions[index] = e.target.value;
                                            setEditedQuestion(prev => ({
                                                ...prev,
                                                options: newOptions
                                            }));
                                        }}
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={() => handleRemoveChoice(index)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 flex gap-2">
                            <input
                                type="text"
                                value={newChoice}
                                onChange={(e) => setNewChoice(e.target.value)}
                                placeholder="Add a new choice"
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleAddChoice}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                            >
                                Add Choice
                            </button>
                        </div>
                    </div>
                );
            case 'true-false':
                return (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
                        <div className="mt-2 space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="correctAnswer"
                                    checked={editedQuestion.correctAnswer === true}
                                    onChange={() => handleTrueFalseChange(true)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="ml-2">True</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="correctAnswer"
                                    checked={editedQuestion.correctAnswer === false}
                                    onChange={() => handleTrueFalseChange(false)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="ml-2">False</span>
                            </label>
                        </div>
                    </div>
                );
            case 'fill-blank':
                return (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Possible Answers</label>
                        <div className="space-y-2">
                            {editedQuestion.options?.map((answer, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={answer}
                                        onChange={(e) => {
                                            const newOptions = [...(editedQuestion.options || [])];
                                            newOptions[index] = e.target.value;
                                            setEditedQuestion(prev => ({
                                                ...prev,
                                                options: newOptions
                                            }));
                                        }}
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={() => handleRemoveBlankAnswer(index)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 flex gap-2">
                            <input
                                type="text"
                                value={newChoice}
                                onChange={(e) => setNewChoice(e.target.value)}
                                placeholder="Add a possible answer"
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleAddBlankAnswer}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                            >
                                Add Answer
                            </button>
                        </div>
                        <div className="mt-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={editedQuestion.caseSensitive}
                                    onChange={handleCaseSensitiveChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">Case Sensitive</span>
                            </label>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={editedQuestion.title || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Points</label>
                    <input
                        type="number"
                        name="points"
                        value={editedQuestion.points}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Question</label>
                    <ReactQuill
                        value={editedQuestion.text}
                        onChange={handleQuestionTextChange}
                        className="mt-1"
                    />
                </div>

                {renderQuestionTypeEditor()}

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <FaTimes /> Cancel
                    </button>
                    <button
                        onClick={() => onSave(editedQuestion)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <FaSave /> Save Question
                    </button>
                </div>
            </div>
        </div>
    );
};

const QuizQuestionsEditor: React.FC<QuizQuestionsEditorProps> = ({ quiz, onSave }) => {
    const [questions, setQuestions] = useState<Question[]>(quiz.questions || []);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleAddQuestion = () => {
        const newQuestion: Question = {
            _id: `temp-${Date.now()}`,
            title: '',
            text: '',
            type: 'multiple-choice',
            points: 1,
            options: [''],
            correctAnswer: ''
        };
        setQuestions(prev => [...prev, newQuestion]);
        setEditingQuestionIndex(questions.length);
    };

    const handleSaveQuestion = (updatedQuestion: Question) => {
        setQuestions(prev => {
            const newQuestions = [...prev];
            if (editingQuestionIndex !== null) {
                newQuestions[editingQuestionIndex] = updatedQuestion;
            }
            return newQuestions;
        });
        setEditingQuestionIndex(null);
    };

    const handleDeleteQuestion = (index: number) => {
        setQuestions(prev => prev.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await onSave({
                ...quiz,
                questions,
                points: questions.reduce((sum, q) => sum + q.points, 0)
            });
        } catch (error) {
            console.error('Failed to save questions:', error);
            // TODO: Show error message to user
        } finally {
            setIsSaving(false);
        }
    };

    const renderQuestionPreview = (question: Question) => {
        switch (question.type) {
            case 'multiple-choice':
                return (
                    <div className="mt-4">
                        <h4 className="font-medium">Choices:</h4>
                        <ul className="list-disc list-inside mt-2">
                            {question.options?.map((option, i) => (
                                <li key={i} className="text-gray-600">
                                    {option} {option === question.correctAnswer && '(Correct)'}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'true-false':
                return (
                    <div className="mt-4">
                        <h4 className="font-medium">Correct Answer:</h4>
                        <p className="text-gray-600 mt-2">
                            {question.correctAnswer === true ? 'True' : 'False'}
                        </p>
                    </div>
                );
            case 'fill-blank':
                return (
                    <div className="mt-4">
                        <h4 className="font-medium">Possible Answers:</h4>
                        <ul className="list-disc list-inside mt-2">
                            {question.options?.map((answer, i) => (
                                <li key={i} className="text-gray-600">
                                    {answer}
                                </li>
                            ))}
                        </ul>
                        {question.caseSensitive && (
                            <p className="text-sm text-gray-500 mt-2">Case Sensitive</p>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Quiz Questions</h1>
                <div className="flex gap-4">
                    <button
                        onClick={handleAddQuestion}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <FaPlus /> New Question
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <FaSave /> Save All Questions
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {questions.map((question, index) => (
                    <div key={question._id} className="bg-white rounded-lg shadow-md p-6">
                        {editingQuestionIndex === index ? (
                            <QuestionEditor
                                question={question}
                                onSave={handleSaveQuestion}
                                onCancel={() => setEditingQuestionIndex(null)}
                            />
                        ) : (
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold">{question.title || 'Untitled Question'}</h3>
                                    <p className="text-gray-600 mt-2">{question.text}</p>
                                    {renderQuestionPreview(question)}
                                    <p className="text-sm text-gray-500 mt-2">Points: {question.points}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingQuestionIndex(index)}
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteQuestion(index)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {questions.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                        No questions yet. Click "New Question" to add one.
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizQuestionsEditor; 