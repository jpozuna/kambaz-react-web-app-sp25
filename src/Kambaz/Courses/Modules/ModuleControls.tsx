import ModuleEditor from "./ModuleEditor";
import {Button, Dropdown} from "react-bootstrap";
import {FaPlus} from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark.tsx";
import {SlashCircle} from "react-bootstrap-icons";
import {useState} from "react";
export default function ModulesControls(
    { moduleName, setModuleName, addModule }:
        { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <Button variant="danger" onClick={handleShow}  size="sm" className="me-1 float-end" id="wd-add-module-btn">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Module
            </Button>
            <Dropdown className="float-end me-2">
                <Dropdown.Toggle variant="secondary" size="sm" id="wd-publish-all-btn">
                    <GreenCheckmark /> Publish All
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item id="wd-publish-all">
                        <GreenCheckmark /> Publish All
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-publish-all-modules-and-items">
                        <GreenCheckmark /> Publish all modules and items
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-publish-modules-only">
                    <GreenCheckmark /> Publish modules only</Dropdown.Item>

                    <Dropdown.Item id="wd-unpublish-all-modules-and-items">
                        <SlashCircle /> Unpublish all modules and items</Dropdown.Item>

                    <Dropdown.Item id="wd-unpublish-modules-only">
                        <SlashCircle /> Unpublish modules only</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Button variant="secondary" size="sm" className="me-1 float-end" id="wd-collapse-all-btn">
                Collapse All
            </Button>

            <Button variant="info" size="sm" className="float-end" id="wd-view-progress-btn">
                View Progress
            </Button>

            <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module"
                          moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />
        </div>
        );
}