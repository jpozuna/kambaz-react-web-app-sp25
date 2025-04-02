import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import Lab5 from "./Lab5/index.tsx";
import { Route, Routes, Navigate } from "react-router-dom";
import TOC from "./TOC";

export default function Labs() {
    return (
        <div>
            <h1>Labs</h1>
            <TOC />
            <Routes>
                <Route path="/" element={<Navigate to="Lab1" />} />
                <Route path="Lab1" element={<Lab1 />} />
                <Route path="Lab2" element={<Lab2 />} />
                <Route path="Lab3" element={<Lab3 />} />
                <Route path="Lab4" element={<Lab4 />} />
                <Route path="Lab5" element={<Lab5 />} />
            </Routes>
        </div>
    );
}