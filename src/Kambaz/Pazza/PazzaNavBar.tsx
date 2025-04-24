import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

interface PazzaNavBarProps {
    courseName: string;
    userName: string;
}

const PazzaNavBar: React.FC<PazzaNavBarProps> = ({ courseName, userName }) => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname.includes(path);
    };

    return (
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl font-bold text-gray-800">Pazza</h1>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <h2 className="text-lg text-gray-600">{courseName}</h2>
                    </div>
                    <div className="flex items-center space-x-6">
                        <nav className="flex space-x-4">
                            <Link
                                to="/qa"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive('/qa') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Q&A
                            </Link>
                            <Link
                                to="/manage-class"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive('/manage-class') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Manage Class
                            </Link>
                        </nav>
                        <div className="flex items-center space-x-2">
                            <FaUser className="text-gray-500" />
                            <span className="text-gray-600">{userName}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PazzaNavBar; 