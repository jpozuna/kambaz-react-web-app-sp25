import PassingFunctions from "./PassingFunctions";
import ClickEvent from "./ClickEvent.tsx";
import PassingDataOnEvent from "./PassingDataOnEvent.tsx";
import EventObject from "./EventObject.tsx";
import Counter from "./Counter.tsx";
import BooleanStateVariables from "./BooleanStateVariables.tsx";
import StringStateVariables from "./StringStateVariables.tsx";
import DateStateVariable from "./DateStateVariable.tsx";
import ObjectStateVariable from "./ObjectStateVariable.tsx";
import ArrayStateVariable from "./ArrayStateVariable.tsx";
import ParentStateComponent from "./ParentStateComponent.tsx";
import ChildStateComponent from "./ChildStateComponent.tsx";
import ReduxExamples from "./ReduxExamples";
import {useState} from "react";
export default function Lab4() {
    function sayHello() {
        alert("Hello");
    }
    const [counter, setCounter] = useState(123);
    return (
        <div id="wd-passing-functions">
            <h2>Lab 4</h2>
            <ClickEvent />
            <PassingDataOnEvent />
            <PassingFunctions theFunction={sayHello} />
            <EventObject />
            <Counter />
            <BooleanStateVariables />
            <StringStateVariables />
            <DateStateVariable />
            <ObjectStateVariable />
            <ArrayStateVariable />
            <ParentStateComponent />
            <ChildStateComponent  counter={counter} setCounter={setCounter} />
            <ReduxExamples />
        </div>
    );}
