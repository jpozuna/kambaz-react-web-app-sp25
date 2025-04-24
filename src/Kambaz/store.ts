import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer.ts";
import coursesReducer from "./Courses/reducer";
import quizzesReducer from "./Quizzes/reducer";

const store = configureStore({
    reducer: {
        modulesReducer,
        accountReducer,
        assignmentsReducer,
        coursesReducer,
        quizzesReducer
    },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;