import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes, FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Quiz, Question, QuestionOption } from './types';
import './styles.css';

interface QuizEditorProps {
    quiz: Quiz;
    onSave: (quiz: Quiz) => void;
    onCancel: () => void;
}

const QuizEditor: React.FC<QuizEditorProps> = ({
    quiz,
    onSave,
    onCancel
}) => {
    console.log('QuizEditor rendered with quiz:', quiz);
    
    const [activeTab, setActiveTab] = useState<'details' | 'questions'>('details');
    const [editedQuiz, setEditedQuiz] = useState<Quiz>(quiz);
    const [newQuestion, setNewQuestion] = useState<Question | null>(null);

    useEffect(() => {
        console.log('QuizEditor useEffect - quiz changed:', quiz);
        setEditedQuiz(quiz);
    }, [quiz]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        console.log('Input changed:', { name, value, type });
        setEditedQuiz(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log('Date changed:', { name, value });
        setEditedQuiz(prev => ({
            ...prev,
            [name]: new Date(value)
        }));
    };

    const handleDescriptionChange = (content: string) => {
        console.log('Description changed:', content);
        setEditedQuiz(prev => ({
            ...prev,
            description: content
        }));
    };

    const handleAddQuestion = () => {
        console.log('Adding new question');
        const question: Question = {
            id: `question-${Date.now()}`,
            title: 'New Question',
            points: 1,
            type: 'multiple-choice',
            content: '',
            options: [
                { id: '1', content: '', isCorrect: false },
                { id: '2', content: '', isCorrect: false }
            ]
        };
        setNewQuestion(question);
    };

    const handleAddOption = () => {
        if (newQuestion) {
            const newOption: QuestionOption = {
                id: `option-${Date.now()}`,
                content: '',
                isCorrect: false
            };
            setNewQuestion(prev => ({
                ...prev!,
                options: [...prev!.options!, newOption]
            }));
        }
    };

    const handleRemoveOption = (optionId: string) => {
        if (newQuestion && newQuestion.options) {
            setNewQuestion(prev => ({
                ...prev!,
                options: prev!.options!.filter(opt => opt.id !== optionId)
            }));
        }
    };

    const handleOptionChange = (optionId: string, field: 'content' | 'isCorrect', value: string | boolean) => {
        if (newQuestion && newQuestion.options) {
            setNewQuestion(prev => ({
                ...prev!,
                options: prev!.options!.map(opt => 
                    opt.id === optionId ? { ...opt, [field]: value } : opt
                )
            }));
        }
    };

    const handleSaveQuestion = () => {
        if (newQuestion) {
            console.log('Saving new question:', newQuestion);
            setEditedQuiz(prev => ({
                ...prev,
                questions: [...prev.questions, newQuestion]
            }));
            setNewQuestion(null);
        }
    };

    const handleCancelQuestion = () => {
        console.log('Canceling new question');
        setNewQuestion(null);
    };

    const handleSave = () => {
        console.log('Saving quiz:', editedQuiz);
        onSave(editedQuiz);
    };

    return (
        <div className="quiz-editor-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <button
                        className="btn btn-outline-secondary me-3"
                        onClick={onCancel}
                    >
                        <FaArrowLeft className="me-2" />
                        Back
                    </button>
                    <h2 className="mb-0">Edit Quiz</h2>
                </div>
                <div>
                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={onCancel}
                    >
                        <FaTimes className="me-2" />
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleSave}
                    >
                        <FaSave className="me-2" />
                        Save
                    </button>
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
                <div className="quiz-details-editor">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={editedQuiz.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <ReactQuill
                                    value={editedQuiz.description}
                                    onChange={handleDescriptionChange}
                                    theme="snow"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Quiz Type</label>
                                <select
                                    className="form-select"
                                    name="type"
                                    value={editedQuiz.type}
                                    onChange={handleInputChange}
                                >
                                    <option value="graded">Graded Quiz</option>
                                    <option value="practice">Practice Quiz</option>
                                    <option value="graded-survey">Graded Survey</option>
                                    <option value="ungraded-survey">Ungraded Survey</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Points</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="points"
                                    value={editedQuiz.points}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Assignment Group</label>
                                <select
                                    className="form-select"
                                    name="assignmentGroup"
                                    value={editedQuiz.assignmentGroup}
                                    onChange={handleInputChange}
                                >
                                    <option value="quizzes">Quizzes</option>
                                    <option value="exams">Exams</option>
                                    <option value="assignments">Assignments</option>
                                    <option value="project">Project</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="shuffleAnswers"
                                        checked={editedQuiz.shuffleAnswers}
                                        onChange={handleInputChange}
                                    />
                                    <label className="form-check-label">Shuffle Answers</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Time Limit (minutes)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="timeLimit"
                                    value={editedQuiz.timeLimit}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="multipleAttempts"
                                        checked={editedQuiz.multipleAttempts}
                                        onChange={handleInputChange}
                                    />
                                    <label className="form-check-label">Multiple Attempts</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="showCorrectAnswers"
                                        checked={editedQuiz.showCorrectAnswers}
                                        onChange={handleInputChange}
                                    />
                                    <label className="form-check-label">Show Correct Answers</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Access Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="accessCode"
                                    value={editedQuiz.accessCode}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Due Date</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="dueDate"
                                    value={editedQuiz.dueDate.toISOString().slice(0, 16)}
                                    onChange={handleDateChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Available Date</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="availableDate"
                                    value={editedQuiz.availableDate.toISOString().slice(0, 16)}
                                    onChange={handleDateChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Until Date</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="untilDate"
                                    value={editedQuiz.untilDate.toISOString().slice(0, 16)}
                                    onChange={handleDateChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="quiz-questions-editor">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3>Questions ({editedQuiz.questions.length})</h3>
                        <button
                            className="btn btn-primary"
                            onClick={handleAddQuestion}
                        >
                            Add Question
                        </button>
                    </div>

                    {newQuestion && (
                        <div className="new-question-editor mb-4">
                            <h4>New Question</h4>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newQuestion.title}
                                    onChange={(e) => setNewQuestion(prev => ({
                                        ...prev!,
                                        title: e.target.value
                                    }))}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Points</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={newQuestion.points}
                                    onChange={(e) => setNewQuestion(prev => ({
                                        ...prev!,
                                        points: parseInt(e.target.value)
                                    }))}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Type</label>
                                <select
                                    className="form-select"
                                    value={newQuestion.type}
                                    onChange={(e) => setNewQuestion(prev => ({
                                        ...prev!,
                                        type: e.target.value as 'multiple-choice' | 'true-false' | 'fill-blank'
                                    }))}
                                >
                                    <option value="multiple-choice">Multiple Choice</option>
                                    <option value="true-false">True/False</option>
                                    <option value="fill-blank">Fill in the Blank</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Question</label>
                                <ReactQuill
                                    value={newQuestion.content}
                                    onChange={(content) => setNewQuestion(prev => ({
                                        ...prev!,
                                        content
                                    }))}
                                    theme="snow"
                                />
                            </div>

                            {newQuestion.type === 'multiple-choice' && (
                                <div className="mb-3">
                                    <label className="form-label">Options</label>
                                    {newQuestion.options?.map((option, index) => (
                                        <div key={option.id} className="d-flex align-items-center mb-2">
                                            <input
                                                type="text"
                                                className="form-control me-2"
                                                value={option.content}
                                                onChange={(e) => handleOptionChange(option.id, 'content', e.target.value)}
                                                placeholder={`Option ${index + 1}`}
                                            />
                                            <div className="form-check me-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={option.isCorrect}
                                                    onChange={(e) => handleOptionChange(option.id, 'isCorrect', e.target.checked)}
                                                />
                                                <label className="form-check-label">Correct</label>
                                            </div>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => handleRemoveOption(option.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={handleAddOption}
                                    >
                                        <FaPlus className="me-2" />
                                        Add Option
                                    </button>
                                </div>
                            )}

                            {newQuestion.type === 'true-false' && (
                                <div className="mb-3">
                                    <label className="form-label">Correct Answer</label>
                                    <select
                                        className="form-select"
                                        value={newQuestion.correctAnswer as string}
                                        onChange={(e) => setNewQuestion(prev => ({
                                            ...prev!,
                                            correctAnswer: e.target.value
                                        }))}
                                    >
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>
                            )}

                            {newQuestion.type === 'fill-blank' && (
                                <div className="mb-3">
                                    <label className="form-label">Correct Answer</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newQuestion.correctAnswer as string}
                                        onChange={(e) => setNewQuestion(prev => ({
                                            ...prev!,
                                            correctAnswer: e.target.value
                                        }))}
                                    />
                                </div>
                            )}

                            <div className="d-flex justify-content-end">
                                <button
                                    className="btn btn-outline-secondary me-2"
                                    onClick={handleCancelQuestion}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSaveQuestion}
                                >
                                    Save Question
                                </button>
                            </div>
                        </div>
                    )}

                    {editedQuiz.questions.map((question, index) => (
                        <div key={question.id} className="question-item mb-4">
                            <h4>Question {index + 1}</h4>
                            <p>{question.title}</p>
                            <p>Points: {question.points}</p>
                            <p>Type: {question.type}</p>
                            {question.type === 'multiple-choice' && question.options && (
                                <div>
                                    <p>Options:</p>
                                    <ul>
                                        {question.options.map(option => (
                                            <li key={option.id}>
                                                {option.content} {option.isCorrect && '(Correct)'}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {question.type === 'true-false' && (
                                <p>Correct Answer: {question.correctAnswer}</p>
                            )}
                            {question.type === 'fill-blank' && (
                                <p>Correct Answer: {question.correctAnswer}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuizEditor; 