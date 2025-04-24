import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image: string;
    description: string;
    credits: number;
    enrolled?: boolean;
}

interface CoursesState {
    courses: Course[];
    loading: boolean;
    error: string | null;
}

const initialState: CoursesState = {
    courses: [],
    loading: false,
    error: null
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourses: (state, action: PayloadAction<Course[]>) => {
            state.courses = action.payload;
        },
        addCourse: (state, action: PayloadAction<Course>) => {
            state.courses.push(action.payload);
        },
        updateCourse: (state, action: PayloadAction<Course>) => {
            const index = state.courses.findIndex(c => c._id === action.payload._id);
            if (index !== -1) {
                state.courses[index] = { ...state.courses[index], ...action.payload };
            }
        },
        deleteCourse: (state, action: PayloadAction<string>) => {
            state.courses = state.courses.filter(c => c._id !== action.payload);
        },
        updateEnrollment: (state, action: PayloadAction<{ courseId: string; enrolled: boolean }>) => {
            const { courseId, enrolled } = action.payload;
            const index = state.courses.findIndex(c => c._id === courseId);
            if (index !== -1) {
                state.courses[index] = { ...state.courses[index], enrolled };
            }
        }
    }
});

export const { setCourses, addCourse, updateCourse, deleteCourse, updateEnrollment } = coursesSlice.actions;
export default coursesSlice.reducer; 