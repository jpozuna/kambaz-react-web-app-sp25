import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as courseClient from "../client";
import * as modulesClient from "./client";
import { addModule, editModule, updateModule, deleteModule, setModules } from "./reducer";
import ModulesControls from "./ModuleControls.tsx";
import LessonControlButtons from "./LessonControlButtons.tsx";
import ModuleControlButtons from "./ModuleControlButtons.tsx";
import { BsGripVertical } from "react-icons/bs";
import { ListGroup, FormControl } from "react-bootstrap";

interface Module {
  _id: string;
  name: string;
  description?: string;
  course: string;
  editing?: boolean;
}

interface ModulesProps {
  course: any;
}

export default function Modules({ course }: ModulesProps) {
  const { cid } = useParams();
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = useState("");
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchModulesForCourse = async () => {
    if (!cid) return;
    const modules = await courseClient.findModulesForCourse(cid);
    dispatch(setModules(modules as Module[]));
  };

  useEffect(() => {
    fetchModulesForCourse();
  }, [cid]);

  const createModuleForCourse = async () => {
    if (!cid || !moduleName.trim()) return;
    const newModule = {
      name: moduleName,
      course: cid,
    };
    const module = await courseClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module as Module));
    setModuleName("");
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const updateModuleHandler = async (module: Module) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={createModuleForCourse}
      />
      <ListGroup id="wd-modules" className="rounded-0">
        {isFaculty && (
          <li className="list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <input
                className="form-control w-50 d-inline-block"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                placeholder="New Module Name"
              />
              <button
                className="btn btn-danger float-end"
                onClick={createModuleForCourse}
              >
                Add
              </button>
            </div>
          </li>
        )}
        {modules.map((module: Module) => (
          <ListGroup.Item key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              {!module.editing && module.name}
              {module.editing && isFaculty && (
                <input
                  className="form-control w-50 d-inline-block"
                  onChange={(e) =>
                    updateModuleHandler({
                      ...module,
                      name: e.target.value
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateModuleHandler({
                        ...module,
                        editing: false
                      });
                    }
                  }}
                  value={module.name}
                />
              )}
              {isFaculty && (
                <>
                  <button
                    className="btn btn-danger float-end"
                    onClick={() => removeModule(module._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary float-end me-2"
                    onClick={() => dispatch(editModule(module._id))}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>

            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}

                    {modules === "FACULTY" && <LessonControlButtons />}
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

