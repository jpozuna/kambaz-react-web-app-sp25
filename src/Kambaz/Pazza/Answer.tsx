import React, { useState } from 'react';
import { FaEdit, FaEllipsisV } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface User {
    id: string;
    name: string;
    role: 'student' | 'instructor';
}

interface Answer {
    id: string;
    content: string;
    author: string;
    authorRole: 'student' | 'instructor';
    createdAt: string;
    authorId: string;
}

interface AnswerProps {
    answer: Answer;
    currentUser: User;
    onEdit: (answer: Answer) => void;
    onDelete: (answerId: string) => void;
}

const Answer: React.FC<AnswerProps> = ({
    answer,
    currentUser,
    onEdit,
    onDelete
}) => {
    const [showActions, setShowActions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(answer.content);

    const canEdit = currentUser.role === 'instructor' || currentUser.id === answer.authorId;

    const handleEdit = () => {
        setIsEditing(true);
        setShowActions(false);
    };

    const handleSave = () => {
        onEdit({
            ...answer,
            content: editedContent
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedContent(answer.content);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this answer?')) {
            onDelete(answer.id);
        }
        setShowActions(false);
    };

    return (
        <div className="border-b border-gray-200 py-4">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    {isEditing ? (
                        <div>
                            <ReactQuill
                                value={editedContent}
                                onChange={setEditedContent}
                                className="h-48 mb-12"
                            />
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: answer.content }}
                        />
                    )}
                </div>
                {canEdit && (
                    <div className="relative ml-4">
                        <button
                            onClick={() => setShowActions(!showActions)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaEllipsisV />
                        </button>
                        {showActions && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                <div className="py-1">
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <FaEdit className="mr-2" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="mt-2 text-sm text-gray-500">
                <span>Posted by {answer.author} ({answer.authorRole})</span>
                <span className="mx-2">•</span>
                <span>{new Date(answer.createdAt).toLocaleString()}</span>
            </div>
        </div>
    );
};

export default Answer; 