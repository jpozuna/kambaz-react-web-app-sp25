import { Quiz, Question, QuizAttempt, Course, User } from '../types';

// Local storage keys
const QUIZZES_KEY = 'kambaz_quizzes';
const ATTEMPTS_KEY = 'kambaz_quiz_attempts';
const COURSES_KEY = 'kambaz_courses';
const USERS_KEY = 'kambaz_users';

// Load data from local storage
export const loadQuizzes = (): Quiz[] => {
    const quizzes = localStorage.getItem(QUIZZES_KEY);
    if (!quizzes) return [];
    
    const parsedQuizzes = JSON.parse(quizzes);
    return parsedQuizzes.map((quiz: any) => ({
        ...quiz,
        dueDate: new Date(quiz.dueDate),
        availableDate: new Date(quiz.availableDate),
        untilDate: new Date(quiz.untilDate),
        createdAt: new Date(quiz.createdAt),
        updatedAt: new Date(quiz.updatedAt)
    }));
};

export const loadAttempts = (): QuizAttempt[] => {
    const attempts = localStorage.getItem(ATTEMPTS_KEY);
    if (!attempts) return [];
    
    const parsedAttempts = JSON.parse(attempts);
    return parsedAttempts.map((attempt: any) => ({
        ...attempt,
        startedAt: new Date(attempt.startedAt),
        submittedAt: new Date(attempt.submittedAt)
    }));
};

export const loadCourses = (): Course[] => {
    const courses = localStorage.getItem(COURSES_KEY);
    return courses ? JSON.parse(courses) : [];
};

export const loadUsers = (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

// Save data to local storage
export const saveQuiz = (quiz: Quiz): void => {
    const quizzes = loadQuizzes();
    const updatedQuizzes = [quiz, ...quizzes];
    localStorage.setItem(QUIZZES_KEY, JSON.stringify(updatedQuizzes));
};

export const saveAttempt = (attempt: QuizAttempt): void => {
    const attempts = loadAttempts();
    const updatedAttempts = [attempt, ...attempts];
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(updatedAttempts));
};

export const saveCourse = (course: Course): void => {
    const courses = loadCourses();
    const updatedCourses = [...courses, course];
    localStorage.setItem(COURSES_KEY, JSON.stringify(updatedCourses));
};

export const saveUser = (user: User): void => {
    const users = loadUsers();
    const updatedUsers = [...users, user];
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
};

// Update existing data
export const updateQuiz = (updatedQuiz: Quiz): void => {
    const quizzes = loadQuizzes();
    const updatedQuizzes = quizzes.map(quiz => 
        quiz.id === updatedQuiz.id ? updatedQuiz : quiz
    );
    localStorage.setItem(QUIZZES_KEY, JSON.stringify(updatedQuizzes));
};

export const updateCourse = (updatedCourse: Course): void => {
    const courses = loadCourses();
    const updatedCourses = courses.map(course => 
        course.id === updatedCourse.id ? updatedCourse : course
    );
    localStorage.setItem(COURSES_KEY, JSON.stringify(updatedCourses));
};

// Delete data
export const deleteQuiz = (quizId: string): void => {
    const quizzes = loadQuizzes();
    const updatedQuizzes = quizzes.filter(quiz => quiz.id !== quizId);
    localStorage.setItem(QUIZZES_KEY, JSON.stringify(updatedQuizzes));
};

export const deleteCourse = (courseId: string): void => {
    const courses = loadCourses();
    const updatedCourses = courses.filter(course => course.id !== courseId);
    localStorage.setItem(COURSES_KEY, JSON.stringify(updatedCourses));
};

// Helper functions
export const getQuizzesByCourse = (courseId: string): Quiz[] => {
    return loadQuizzes().filter(quiz => quiz.courseId === courseId);
};

export const getAttemptsByQuiz = (quizId: string): QuizAttempt[] => {
    return loadAttempts().filter(attempt => attempt.quizId === quizId);
};

export const getAttemptsByUser = (userId: string): QuizAttempt[] => {
    return loadAttempts().filter(attempt => attempt.userId === userId);
};

export const getLatestAttempt = (quizId: string, userId: string): QuizAttempt | undefined => {
    const attempts = getAttemptsByQuiz(quizId)
        .filter(attempt => attempt.userId === userId)
        .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
    return attempts[0];
}; 