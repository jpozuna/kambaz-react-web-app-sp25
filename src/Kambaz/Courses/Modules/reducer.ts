import { createSlice } from "@reduxjs/toolkit";

interface Module {
    _id: string;
    name: string;
    description?: string;
    course: string;
    editing?: boolean;
}

interface ModulesState {
    modules: Module[];
}

const initialState: ModulesState = {
    modules: [],
};

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        setModules: (state, { payload: modules }: { payload: Module[] }) => {
            state.modules = modules;
        },
        addModule: (state, { payload: module }: { payload: Module }) => {
            state.modules.push(module);
        },
        deleteModule: (state, { payload: moduleId }: { payload: string }) => {
            state.modules = state.modules.filter((m) => m._id !== moduleId);
        },
        updateModule: (state, { payload: module }: { payload: Module }) => {
            state.modules = state.modules.map((m) =>
                m._id === module._id ? module : m
            );
        },
        editModule: (state, { payload: moduleId }: { payload: string }) => {
            state.modules = state.modules.map((m) =>
                m._id === moduleId ? { ...m, editing: true } : m
            );
        },
    },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } =
    modulesSlice.actions;
export default modulesSlice.reducer;
