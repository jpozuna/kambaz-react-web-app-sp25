import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
    user: string;
    course: string;
}

interface AccountState {
    currentUser: any;
    role: string | null;
    enrollments: Enrollment[];
    enrollmentsViewAll: boolean;
}

const initialState: AccountState = {
    currentUser: null,
    role: null,
    enrollments: [],
    enrollmentsViewAll: false,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<any>) => {
            state.currentUser = action.payload;
        },
        setRole: (state, action: PayloadAction<string | null>) => {
            state.role = action.payload;
        },
        enroll: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
            const { userId, courseId } = action.payload;
            state.enrollments.push({ user: userId, course: courseId });
        },
        unenroll: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
            const { userId, courseId } = action.payload;
            state.enrollments = state.enrollments.filter(
                (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
            );
        },
        toggleEnrollmentView: (state) => {
            state.enrollmentsViewAll = !state.enrollmentsViewAll;
        },
    },
});

export const { setCurrentUser, setRole, enroll, unenroll, toggleEnrollmentView } = accountSlice.actions;
export default accountSlice.reducer;