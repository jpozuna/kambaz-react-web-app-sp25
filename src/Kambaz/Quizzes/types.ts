export interface Quiz {
    _id: string;
    title: string;
    description?: string;
    points: number;
    availableFrom: string;
    availableUntil: string;
    dueDate: string;
    published: boolean;
    courseId: string;
    questions?: Question[];
    quizType: 'graded-quiz' | 'practice-quiz' | 'graded-survey' | 'ungraded-survey';
    assignmentGroup: 'quizzes' | 'exams' | 'assignments' | 'project';
    shuffleAnswers: boolean;
    timeLimit: number; // in minutes
    multipleAttempts: boolean;
    attemptsAllowed: number;
    showCorrectAnswers: 'never' | 'after-submission' | 'after-due-date';
    accessCode?: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
}

export interface Question {
    _id: string;
    title?: string;
    text: string;
    type: 'multiple-choice' | 'true-false' | 'fill-blank';
    points: number;
    options?: string[];  // For multiple choice
    correctAnswer: string | string[] | boolean;  // string[] for multiple choice, boolean for true/false, string[] for fill in blank
    caseSensitive?: boolean;  // For fill in blank questions
}

export interface QuizAttempt {
    _id: string;
    quizId: string;
    userId: string;
    startTime: string;
    endTime?: string;
    score?: number;
    answers: {
        questionId: string;
        answer: string | boolean;
    }[];
} 