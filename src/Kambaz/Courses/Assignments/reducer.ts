import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

interface Assignment {
    _id: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    notAvailableUntil: string;
    course: string;
    modules: string;
}

interface CourseAssignments {
    course_id: string;
    course_name: string;
    assignments: Assignment[];
}

const initialState: { assignments: Assignment[] } = {
    assignments: assignments as Assignment[],
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, { payload: assignment }: { payload: Assignment }) => {
            state.assignments = [...state.assignments, assignment];
        },
        deleteAssignment: (state, { payload: assignmentId }: { payload: string }) => {
            state.assignments = state.assignments.filter(
                (a) => a._id !== assignmentId
            );
        },
        updateAssignment: (state, { payload: assignment }: { payload: Assignment }) => {
            state.assignments = state.assignments.map((a) =>
                a._id === assignment._id ? assignment : a
            );
        },
    },
});

export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;