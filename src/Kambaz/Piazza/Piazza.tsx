import React, { useState } from 'react';
import PiazzaNavBar from './PiazzaNavBar';
import FolderFilters from './FolderFilters';
import ListOfPosts from './ListOfPosts';
import NewPostScreen from './NewPostScreen';
import PostScreen from './PostScreen';

interface PiazzaProps {
    courseName: string;
    userName: string;
    userRole: 'student' | 'instructor';
    userId: string;
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
    visibility: 'entire-class' | 'selected-users';
    selectedUsers: string[];
    views: number;
    authorId: string;
}

interface User {
    id: string;
    name: string;
    role: 'student' | 'instructor';
}

const Piazza: React.FC<PiazzaProps> = ({ courseName, userName, userRole, userId }) => {
    const [selectedFolder, setSelectedFolder] = useState<string>('all');
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [showNewPost, setShowNewPost] = useState(false);

    // Mock data - replace with actual data from your backend
    const mockUsers: User[] = [
        { id: '1', name: 'Dr. Smith', role: 'instructor' },
        { id: '2', name: 'John Doe', role: 'student' },
        { id: '3', name: 'Jane Smith', role: 'student' }
    ];

    const mockPosts: Post[] = [
        {
            id: '1',
            title: 'Question about Homework 1',
            content: 'I have a question about the first problem in Homework 1...',
            author: 'John Doe',
            authorRole: 'student',
            createdAt: new Date().toISOString(),
            folder: 'hw1',
            type: 'question',
            visibility: 'entire-class',
            selectedUsers: [],
            views: 42,
            authorId: '2'
        },
        {
            id: '2',
            title: 'Office Hours Announcement',
            content: 'I will be holding extra office hours tomorrow...',
            author: 'Dr. Smith',
            authorRole: 'instructor',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            folder: 'office_hours',
            type: 'note',
            visibility: 'entire-class',
            selectedUsers: [],
            views: 15,
            authorId: '1'
        }
    ];

    const folders = ['hw1', 'hw2', 'office_hours'];

    const handleFolderSelect = (folder: string) => {
        setSelectedFolder(folder);
    };

    const handlePostSelect = (post: Post) => {
        setSelectedPost(post);
    };

    const handleNewPost = () => {
        setShowNewPost(true);
    };

    const handleSavePost = (post: {
        type: 'question' | 'note';
        title: string;
        content: string;
        visibility: 'entire-class' | 'selected-users';
        selectedUsers: string[];
        folders: string[];
    }) => {
        // Create new post object
        const newPost: Post = {
            id: `temp-${Date.now()}`,
            title: post.title,
            content: post.content,
            author: userName,
            authorRole: userRole,
            createdAt: new Date().toISOString(),
            folder: post.folders[0], // For now, just use the first selected folder
            type: post.type,
            visibility: post.visibility,
            selectedUsers: post.selectedUsers,
            views: 0,
            authorId: userId
        };

        // Add to posts list
        mockPosts.unshift(newPost);
        setShowNewPost(false);
    };

    const handleEditPost = (editedPost: Post) => {
        const index = mockPosts.findIndex(p => p.id === editedPost.id);
        if (index !== -1) {
            mockPosts[index] = editedPost;
            setSelectedPost(editedPost);
        }
    };

    const handleDeletePost = (postId: string) => {
        const index = mockPosts.findIndex(p => p.id === postId);
        if (index !== -1) {
            mockPosts.splice(index, 1);
            if (selectedPost?.id === postId) {
                setSelectedPost(null);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <PiazzaNavBar courseName={courseName} userName={userName} />
            <FolderFilters onFolderSelect={handleFolderSelect} />
            <ListOfPosts
                posts={mockPosts}
                onPostSelect={handlePostSelect}
                onNewPost={handleNewPost}
            />
            <div className="pt-32 pl-80"> {/* Add padding to account for fixed navbar and sidebar */}
                <div className="container mx-auto px-4 py-8">
                    {selectedPost ? (
                        <PostScreen
                            post={{
                                ...selectedPost,
                                visibility: selectedPost.visibility || 'public',
                                selectedUsers: selectedPost.selectedUsers || []
                            }}
                            currentUser={{ id: userId, name: userName, role: userRole }}
                            onEdit={(post: Post) => handleEditPost({
                                ...post,
                                visibility: post.visibility || 'public',
                                selectedUsers: post.selectedUsers || []
                            })}
                            onDelete={handleDeletePost}
                        />
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4">Questions and Answers</h2>
                            <p className="text-gray-600">
                                Welcome to the Q&A section for {courseName}. Here you can ask questions, provide answers, and engage in discussions with your peers.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {showNewPost && (
                <NewPostScreen
                    onClose={() => setShowNewPost(false)}
                    onSave={handleSavePost}
                    users={mockUsers}
                    folders={folders}
                />
            )}
        </div>
    );
};

export default Piazza; 