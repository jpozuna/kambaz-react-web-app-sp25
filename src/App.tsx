import Labs from "./Labs";
import Kambaz from "./Kambaz";
import store from "./Kambaz/store";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import CourseView from "./Courses/CourseView";
import ErrorBoundary from './Kambaz/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <HashRouter>
                    <div>
                        <Routes>
                            <Route path="/" element={<Navigate to="/Labs" />} />
                            <Route path="/Labs/*" element={<Labs />} />
                            <Route path="/Kambaz/*" element={<Kambaz />} />
                            <Route path="/course/*" element={
                                <CourseView 
                                    isInstructor={true} // or false for students
                                    courseStats={{
                                        unreadPosts: 0,
                                        unansweredPosts: 0,
                                        totalPosts: 0,
                                        instructorResponses: 0,
                                        studentResponses: 0,
                                        enrolledStudents: 0,
                                    }}
                                />
                            } />
                        </Routes>
                    </div>
                </HashRouter>
            </Provider>
        </ErrorBoundary>
    );
}

export default App;
