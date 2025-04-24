import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

interface PiazzaNavBarProps {
    courseName: string;
    userName: string;
}

const PiazzaNavBar: React.FC<PiazzaNavBarProps> = ({ courseName, userName }) => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname.includes(path);
    };

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <h1 className="text-xl font-bold text-gray-800">Piazza</h1>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-gray-700 mr-4">{courseName}</span>
                        </div>
                        <div className="ml-3 relative">
                            <div>
                                <button
                                    type="button"
                                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <span className="text-gray-700">{userName}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PiazzaNavBar; 