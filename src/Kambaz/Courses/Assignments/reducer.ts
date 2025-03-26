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

const initialState: { assignments: Assignment[] } = {
    assignments: assignments.flatMap(course => 
        course.assignments.map(a => ({
            _id: a.id,
            title: a.title,
            description: a.description,
            points: a.points,
            dueDate: a.dueDate,
            notAvailableUntil: a.availableDate,
            course: course.course_id,
            modules: "Multiple Modules"
        }))
    ),
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