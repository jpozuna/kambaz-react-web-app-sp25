import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
import ModulesControls from "./ModuleControls.tsx";
import LessonControlButtons from "./LessonControlButtons.tsx";
import ModuleControlButtons from "./ModuleControlButtons.tsx";
import { BsGripVertical } from "react-icons/bs";
import { ListGroup, FormControl } from "react-bootstrap";

export default function Modules() {
    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();
    const saveModule = async (module: any) => {
        await modulesClient.updateModule(module);
        dispatch(updateModule(module));
      };    
    const removeModule = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
      };
    
    const createModuleForCourse = async () => {
        if (!cid) return;
        const newModule = { name: moduleName, course: cid };
        const module = await coursesClient.createModuleForCourse(cid, newModule);
        dispatch(addModule(module));
      };    
    const fetchModules = async () => {
        const modules = await coursesClient.findModulesForCourse(cid as string);
        dispatch(setModules(modules));
      };
      useEffect(() => {
        fetchModules();
      }, [cid]);    

    return (
        <div className="wd-modules">
            <ModulesControls
                moduleName={moduleName}
                setModuleName={setModuleName}
                addModule={createModuleForCourse}
            />
            <ListGroup id="wd-modules" className="rounded-0">
                {modules.map((module: any) => (
                    <ListGroup.Item key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            {!module.editing && module.name}
                            {module.editing && (
                                <FormControl
                                    className="w-50 d-inline-block"
                                    value={module.name}
                                    onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            saveModule({ ...module, editing: false });
                                        }
                                    }}
                                />
                            )}

                            {modules === "FACULTY" && (
                                <>
                                    <ModuleControlButtons
                                        moduleId={module._id}
                                        deleteModule={(moduleId) => removeModule(moduleId)}
                                        editModule={(moduleId: string) => dispatch(editModule(moduleId))}

                                    />

                                    <button
                                        className="btn btn-success me-2"
                                        onClick={() => {}}
                                    >
                                        Publish
                                    </button>
                                    <button
                                        className="btn btn-secondary me-2"
                                        onClick={() => {}}
                                    >
                                        Unpublish
                                    </button>
                                    <button
                                        className="btn btn-info me-2"
                                        onClick={() => {}}
                                    >
                                        Important
                                    </button>
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => {}}
                                    >
                                        Disable
                                    </button>
                                </>
                            )}
                        </div>

                        {module.lessons && (
                            <ul className="wd-lessons list-group rounded-0">
                                {module.lessons.map((lesson: any) => (
                                    <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                                        <BsGripVertical className="me-2 fs-3" /> {lesson.name}


                                        {modules=== "FACULTY" && <LessonControlButtons />}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

