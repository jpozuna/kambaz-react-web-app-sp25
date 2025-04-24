import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Quiz {
    _id: string;
    title: string;
    description: string;
    courseId: string;
    dueDate: string;
    timeLimit: number;
    questions: any[];
    published: boolean;
}

interface QuizzesState {
    quizzes: Quiz[];
}

const initialState: QuizzesState = {
    quizzes: []
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, action: PayloadAction<Quiz>) => {
            state.quizzes.push(action.payload);
        },
        updateQuiz: (state, action: PayloadAction<Quiz>) => {
            const index = state.quizzes.findIndex(quiz => quiz._id === action.payload._id);
            if (index !== -1) {
                state.quizzes[index] = action.payload;
            }
        },
        deleteQuiz: (state, action: PayloadAction<string>) => {
            state.quizzes = state.quizzes.filter(quiz => quiz._id !== action.payload);
        }
    }
});

export const { setQuizzes, addQuiz, updateQuiz, deleteQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer; 