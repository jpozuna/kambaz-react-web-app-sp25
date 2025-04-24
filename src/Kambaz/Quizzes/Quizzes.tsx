import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import QuizCard from './QuizCard';
import { Quiz } from './types';
import axios from 'axios';

interface UserResponse {
    role: string;
    // Add other user properties as needed
}

const Quizzes: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFaculty, setIsFaculty] = useState(false);
    const navigate = useNavigate();
    const { courseId } = useParams<{ courseId: string }>();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const [quizzesResponse, userResponse] = await Promise.all([
                    axios.get<Quiz[]>(`/api/courses/${courseId}/quizzes`),
                    axios.get<UserResponse>('/api/users/me')
                ]);
                setQuizzes(quizzesResponse.data);
                setIsFaculty(userResponse.data.role === 'faculty');
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch quizzes');
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, [courseId]);

    const handleCreateQuiz = () => {
        navigate(`/courses/${courseId}/quizzes/create`);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Quizzes</h1>
                {isFaculty && (
                    <button
                        onClick={handleCreateQuiz}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <FaPlus /> Create Quiz
                    </button>
                )}
            </div>
            
            {quizzes.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                    {isFaculty 
                        ? "No quizzes yet. Click 'Create Quiz' to add one!"
                        : "No quizzes available yet."}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <QuizCard
                            key={quiz._id}
                            quiz={quiz}
                            isFaculty={isFaculty}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Quizzes; 