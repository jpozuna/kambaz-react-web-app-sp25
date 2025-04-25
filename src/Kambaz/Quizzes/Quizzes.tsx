import React, { useState, useEffect } from 'react';
import { Quiz, User } from './types';
import QuizList from './QuizList';
import QuizEditor from './QuizEditor';
import QuizDetails from './QuizDetails';
import QuizPreview from './QuizPreview';
import QuizTaker from './QuizTaker';
import { loadQuizzes, getQuizzesByCourse, saveQuiz, updateQuiz } from './services/quizService';
import './styles.css';

interface QuizzesProps {
    courseId: string;
    currentUser: User;
}

type View = 'list' | 'editor' | 'details' | 'preview' | 'take';

const Quizzes: React.FC<QuizzesProps> = ({
    courseId,
    currentUser
}) => {
    const [currentView, setCurrentView] = useState<View>('list');
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    console.log('Quizzes component rendered');
    console.log('Current view:', currentView);
    console.log('Selected quiz:', selectedQuiz);

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

    useEffect(() => {
        loadQuizzesForCourse();
    }, [courseId]);

    useEffect(() => {
        console.log('Quizzes useEffect - view changed:', currentView);
        if (currentView === 'list') {
            loadQuizzesForCourse();
        }
    }, [currentView]);

    const handleQuizClick = (quiz: Quiz) => {
        console.log('Quiz clicked:', quiz);
        setSelectedQuiz(quiz);
        setCurrentView('details');
    };

    const handleAddQuiz = () => {
        console.log('Add quiz clicked');
        console.log('Current user role:', currentUser.role);
        const newQuiz: Quiz = {
            id: `quiz-${Date.now()}`,
            title: 'New Quiz',
            description: '',
            courseId,
            type: 'graded',
            points: 0,
            assignmentGroup: 'quizzes',
            shuffleAnswers: true,
            timeLimit: 20,
            multipleAttempts: false,
            attemptsAllowed: 1,
            showCorrectAnswers: false,
            accessCode: '',
            oneQuestionAtATime: true,
            webcamRequired: false,
            lockQuestionsAfterAnswering: false,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            availableDate: new Date(),
            untilDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            isPublished: false,
            questions: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        console.log('Creating new quiz:', newQuiz);
        setSelectedQuiz(newQuiz);
        setCurrentView('editor');
    };

    const handleEdit = () => {
        console.log('Edit clicked');
        setCurrentView('editor');
    };

    const handlePreview = () => {
        console.log('Preview clicked');
        setCurrentView('preview');
    };

    const handleStart = () => {
        console.log('Start clicked');
        setCurrentView('take');
    };

    const handleSave = (quiz: Quiz) => {
        console.log('Save clicked:', quiz);
        // Check if this is a new quiz or an update
        const existingQuiz = quizzes.find(q => q.id === quiz.id);
        if (existingQuiz) {
            console.log('Updating existing quiz');
            updateQuiz(quiz);
        } else {
            console.log('Saving new quiz');
            saveQuiz(quiz);
        }
        setSelectedQuiz(quiz);
        setCurrentView('list');
        loadQuizzesForCourse(); // Refresh the quiz list
    };

    const handleCancel = () => {
        console.log('Cancel clicked');
        setCurrentView('list');
        loadQuizzesForCourse(); // Refresh the quiz list
    };

    const handleComplete = () => {
        console.log('Complete clicked');
        setCurrentView('list');
    };

    const renderView = () => {
        console.log('Rendering view:', currentView);
        console.log('Selected quiz in renderView:', selectedQuiz);
        
        switch (currentView) {
            case 'list':
                return (
                    <QuizList
                        courseId={courseId}
                        currentUser={currentUser}
                        onQuizClick={handleQuizClick}
                        onAddQuiz={handleAddQuiz}
                    />
                );

            case 'editor':
                if (!selectedQuiz) {
                    console.error('No quiz selected for editor view');
                    return null;
                }
                console.log('Rendering QuizEditor with quiz:', selectedQuiz);
                return (
                    <QuizEditor
                        quiz={selectedQuiz}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                );

            case 'details':
                return selectedQuiz ? (
                    <QuizDetails
                        quiz={selectedQuiz}
                        currentUser={currentUser}
                        onEdit={handleEdit}
                        onPreview={handlePreview}
                        onStart={handleStart}
                    />
                ) : null;

            case 'preview':
                return selectedQuiz ? (
                    <QuizPreview
                        quiz={selectedQuiz}
                        onEdit={handleEdit}
                    />
                ) : null;

            case 'take':
                return selectedQuiz ? (
                    <QuizTaker
                        quiz={selectedQuiz}
                        userId={currentUser.id}
                        onComplete={handleComplete}
                    />
                ) : null;

            default:
                return null;
        }
    };

    return (
        <div className="quizzes-container">
            {renderView()}
        </div>
    );
};

export default Quizzes; 