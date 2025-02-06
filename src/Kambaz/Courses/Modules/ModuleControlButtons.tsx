import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import {PlusLg} from "react-bootstrap-icons";
export default function ModuleControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <PlusLg />
            <IoEllipsisVertical className="fs-4" />
        </div> );}