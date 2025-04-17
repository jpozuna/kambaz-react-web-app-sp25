import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    assignments: [],
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },
        addAssignment: (state, { payload: assignment }) => {
            const newAssignment: any = {
                _id: new Date().getTime().toString(),
                title: assignment.title,
                course: assignment.course,
                availableFrom: assignment.availableFrom,
                availableUntil: assignment.availableUntil,
                dueDate: assignment.dueDate,
                points: assignment.points,
                description: assignment.description,
            };
            state.assignments.push(newAssignment);
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId
            );
        },
        updateAssignment: (state, { payload: updated }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === updated._id ? updated : a
            );
        },
    },
});

export const {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    setAssignments,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
