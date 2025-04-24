import React, { useState } from 'react';
import { FaEdit, FaEllipsisV, FaEye } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface User {
    id: string;
    name: string;
    role: 'student' | 'instructor';
}

interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    authorRole: 'student' | 'instructor';
    createdAt: string;
    folder: string;
    type: 'question' | 'note';
    views: number;
    authorId: string;
}

interface PostScreenProps {
    post: Post;
    currentUser: User;
    onEdit: (post: Post) => void;
    onDelete: (postId: string) => void;
}

const PostScreen: React.FC<PostScreenProps> = ({
    post,
    currentUser,
    onEdit,
    onDelete
}) => {
    const [showActions, setShowActions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content);

    const canEdit = currentUser.role === 'instructor' || currentUser.id === post.authorId;

    const handleEdit = () => {
        setIsEditing(true);
        setShowActions(false);
    };

    const handleSave = () => {
        onEdit({
            ...post,
            content: editedContent
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedContent(post.content);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            onDelete(post.id);
        }
        setShowActions(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Post Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                            <FaEye className="mr-1" />
                            <span>{post.views} views</span>
                        </div>
                        <span>•</span>
                        <span>Folder: {post.folder}</span>
                        <span>•</span>
                        <span>Posted by {post.author} ({post.authorRole})</span>
                    </div>
                </div>
                {canEdit && (
                    <div className="relative">
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

            {/* Post Content */}
            <div className="mb-6">
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
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                )}
            </div>

            {/* Post Type Indicator */}
            <div className="text-sm text-gray-500">
                {post.type === 'question' ? 'Question' : 'Note'}
            </div>
        </div>
    );
};

export default PostScreen; 