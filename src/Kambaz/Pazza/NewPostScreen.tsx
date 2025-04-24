import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface User {
    id: string;
    name: string;
    role: 'student' | 'instructor';
}

interface NewPostScreenProps {
    onClose: () => void;
    onSave: (post: {
        type: 'question' | 'note';
        title: string;
        content: string;
        visibility: 'entire-class' | 'selected-users';
        selectedUsers: string[];
        folders: string[];
    }) => void;
    users: User[];
    folders: string[];
}

const NewPostScreen: React.FC<NewPostScreenProps> = ({
    onClose,
    onSave,
    users,
    folders
}) => {
    const [postType, setPostType] = useState<'question' | 'note'>('question');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [visibility, setVisibility] = useState<'entire-class' | 'selected-users'>('entire-class');
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [errors, setErrors] = useState<{
        title?: string;
        content?: string;
        folders?: string;
    }>({});

    const handleUserSelect = (userId: string) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleFolderSelect = (folder: string) => {
        setSelectedFolders(prev =>
            prev.includes(folder)
                ? prev.filter(f => f !== folder)
                : [...prev, folder]
        );
    };

    const validateForm = () => {
        const newErrors: {
            title?: string;
            content?: string;
            folders?: string;
        } = {};

        if (!title.trim()) {
            newErrors.title = 'Summary is required';
        } else if (title.length > 100) {
            newErrors.title = 'Summary must be 100 characters or less';
        }

        if (!content.trim()) {
            newErrors.content = 'Details are required';
        }

        if (selectedFolders.length === 0) {
            newErrors.folders = 'Please select at least one folder';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSave({
                type: postType,
                title,
                content,
                visibility,
                selectedUsers,
                folders: selectedFolders
            });
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 100) {
            setTitle(value);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">New Post</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Post Type Tabs */}
                        <div className="mb-6">
                            <div className="flex space-x-4 border-b border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setPostType('question')}
                                    className={`px-4 py-2 font-medium ${
                                        postType === 'question'
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Question
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPostType('note')}
                                    className={`px-4 py-2 font-medium ${
                                        postType === 'note'
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Note
                                </button>
                            </div>
                        </div>

                        {/* Title/Summary */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Summary
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={handleTitleChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.title ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Enter a summary for your post"
                                    required
                                />
                                <div className="absolute right-2 top-2 text-sm text-gray-500">
                                    {title.length}/100
                                </div>
                            </div>
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                            )}
                        </div>

                        {/* Content/Details */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Details
                            </label>
                            <div className={`${errors.content ? 'border border-red-500 rounded-md' : ''}`}>
                                <ReactQuill
                                    value={content}
                                    onChange={setContent}
                                    className="h-48 mb-12"
                                />
                            </div>
                            {errors.content && (
                                <p className="mt-1 text-sm text-red-500">{errors.content}</p>
                            )}
                        </div>

                        {/* Post To */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Post To
                            </label>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        checked={visibility === 'entire-class'}
                                        onChange={() => setVisibility('entire-class')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2">Entire Class</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        checked={visibility === 'selected-users'}
                                        onChange={() => setVisibility('selected-users')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2">Individual Students/Instructors</span>
                                </label>
                            </div>

                            {visibility === 'selected-users' && (
                                <div className="mt-4 p-4 border border-gray-200 rounded-md">
                                    <div className="mb-4">
                                        <h4 className="font-medium mb-2">Instructors</h4>
                                        <div className="space-y-2">
                                            {users
                                                .filter(user => user.role === 'instructor')
                                                .map(user => (
                                                    <label key={user.id} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedUsers.includes(user.id)}
                                                            onChange={() => handleUserSelect(user.id)}
                                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                        />
                                                        <span className="ml-2">{user.name}</span>
                                                    </label>
                                                ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">All Users</h4>
                                        <div className="space-y-2">
                                            {users.map(user => (
                                                <label key={user.id} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedUsers.includes(user.id)}
                                                        onChange={() => handleUserSelect(user.id)}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <span className="ml-2">{user.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Select Folders */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Folders
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {folders.map(folder => (
                                    <label
                                        key={folder}
                                        className={`px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${
                                            selectedFolders.includes(folder)
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedFolders.includes(folder)}
                                            onChange={() => handleFolderSelect(folder)}
                                            className="hidden"
                                        />
                                        {folder}
                                    </label>
                                ))}
                            </div>
                            {errors.folders && (
                                <p className="mt-1 text-sm text-red-500">{errors.folders}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                {postType === 'question' ? 'Post My Question' : 'Post My Note'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewPostScreen; 