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

    const validateForm = () => {
        const newErrors: {
            title?: string;
            content?: string;
            folders?: string;
        } = {};

        if (!title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!content.trim()) {
            newErrors.content = 'Content is required';
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
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="text-xl font-semibold">New Post</h2>
                        <button
                            onClick={onClose}
                            className="btn btn-link text-dark"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4">
                        <label className="d-block mb-2">Post Type</label>
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className={`btn ${type === 'question' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setType('question')}
                            >
                                Question
                            </button>
                            <button
                                type="button"
                                className={`btn ${type === 'note' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setType('note')}
                            >
                                Note/Announcement
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="d-block mb-2">Title</label>
                        <input
                            type="text"
                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a descriptive title"
                        />
                        {errors.title && (
                            <div className="invalid-feedback">{errors.title}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="d-block mb-2">Content</label>
                        <div className={`piazza-editor ${errors.content ? 'border-danger' : ''}`}>
                            <ReactQuill
                                value={content}
                                onChange={setContent}
                                theme="snow"
                            />
                        </div>
                        {errors.content && (
                            <div className="text-danger small mt-1">{errors.content}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="d-block mb-2">Folder</label>
                        <select
                            className={`form-select ${errors.folders ? 'is-invalid' : ''}`}
                            value={selectedFolders[0] || ''}
                            onChange={(e) => setSelectedFolders([e.target.value])}
                        >
                            <option value="">Select a folder</option>
                            {folders.map((folder) => (
                                <option key={folder} value={folder}>
                                    {folder}
                                </option>
                            ))}
                        </select>
                        {errors.folders && (
                            <div className="invalid-feedback">{errors.folders}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="d-block mb-2">Visibility</label>
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className={`btn ${visibility === 'entire-class' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setVisibility('entire-class')}
                            >
                                Entire Class
                            </button>
                            <button
                                type="button"
                                className={`btn ${visibility === 'selected-users' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setVisibility('selected-users')}
                            >
                                Selected Users
                            </button>
                        </div>
                    </div>

                    {visibility === 'selected-users' && (
                        <div className="mb-4">
                            <label className="d-block mb-2">Select Users</label>
                            <div className="border rounded p-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {users.map((user) => (
                                    <div key={user.id} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`user-${user.id}`}
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => {
                                                if (selectedUsers.includes(user.id)) {
                                                    setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                                                } else {
                                                    setSelectedUsers([...selectedUsers, user.id]);
                                                }
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor={`user-${user.id}`}>
                                            {user.name} ({user.role})
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPostScreen; 