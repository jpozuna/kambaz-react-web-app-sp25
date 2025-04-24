import React, { useState, useRef } from 'react';
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
    const quillRef = useRef<ReactQuill>(null);
    const [type, setType] = useState<'question' | 'note'>('question');
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
                type,
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
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as 'question' | 'note')}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="question">Question</option>
                                <option value="note">Note</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                className={`mt-1 block w-full rounded-md border ${
                                    errors.title ? 'border-red-500' : 'border-gray-300'
                                } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                                placeholder="Enter a summary for your post"
                                required
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Content</label>
                            <div className={`${errors.content ? 'border border-red-500 rounded-md' : ''}`}>
                                <ReactQuill
                                    ref={quillRef}
                                    value={content}
                                    onChange={setContent}
                                    className="h-48 mb-12"
                                />
                            </div>
                            {errors.content && (
                                <p className="mt-1 text-sm text-red-500">{errors.content}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Folder</label>
                            <select
                                value={selectedFolders[0]}
                                onChange={(e) => setSelectedFolders([e.target.value])}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select a folder</option>
                                {folders.map((folder) => (
                                    <option key={folder} value={folder}>
                                        {folder}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Visibility</label>
                            <select
                                value={visibility}
                                onChange={(e) => setVisibility(e.target.value as 'entire-class' | 'selected-users')}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="entire-class">Entire Class</option>
                                <option value="selected-users">Selected Users</option>
                            </select>
                        </div>

                        {visibility === 'selected-users' && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Select Users</label>
                                <select
                                    multiple
                                    value={selectedUsers}
                                    onChange={(e) => setSelectedUsers(Array.from(e.target.selectedOptions, option => option.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name} ({user.role})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Create Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewPostScreen; 