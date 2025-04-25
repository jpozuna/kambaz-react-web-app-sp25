export interface User {
    id: string;
    name: string;
    role: 'FACULTY' | 'STUDENT';
}

export interface Course {
    id: string;
    name: string;
    facultyId: string;
    enrolledStudents: string[];
}

export interface Quiz {
    id: string;
    title: string;
    description: string;
    courseId: string;
    type: 'graded' | 'practice' | 'graded-survey' | 'ungraded-survey';
    points: number;
    assignmentGroup: 'quizzes' | 'exams' | 'assignments' | 'project';
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    attemptsAllowed: number;
    showCorrectAnswers: boolean;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate: Date;
    availableDate: Date;
    untilDate: Date;
    isPublished: boolean;
    questions: Question[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Question {
    id: string;
    title: string;
    points: number;
    type: 'multiple-choice' | 'true-false' | 'fill-blank';
    content: string;
    options?: QuestionOption[];
    correctAnswer?: string | string[];
}

export interface QuestionOption {
    id: string;
    content: string;
    isCorrect: boolean;
}

export interface QuizAttempt {
    id: string;
    quizId: string;
    userId: string;
    answers: QuizAnswer[];
    score: number;
    startedAt: Date;
    submittedAt: Date;
}

export interface QuizAnswer {
    questionId: string;
    answer: string | string[];
    isCorrect: boolean;
} 