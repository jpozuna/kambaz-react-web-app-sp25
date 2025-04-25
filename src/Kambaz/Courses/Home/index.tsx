import { useSelector } from "react-redux";
import CourseStatus from "./Status";

interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image: string;
    description: string;
    credits: number;
}

interface HomeProps {
    course: Course;
}

export default function Home({ course }: HomeProps) {
    const { role } = useSelector((state: any) => state.accountReducer);

    return (
        <div className="d-flex" id="wd-home">
            <div className="flex-fill">
                <div className="card mb-4">
                    <div className="card-body">
                        <h3 className="card-title">{course.name}</h3>
                        <p className="card-text">{course.description}</p>
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="mb-1"><strong>Course Number:</strong> {course.number}</p>
                                <p className="mb-1"><strong>Credits:</strong> {course.credits}</p>
                            </div>
                            <div>
                                <p className="mb-1"><strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}</p>
                                <p className="mb-1"><strong>End Date:</strong> {new Date(course.endDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {role === "FACULTY" && (
                <div className="d-none d-md-block">
                    <CourseStatus/>
                </div>
            )}
        </div>
    );
}