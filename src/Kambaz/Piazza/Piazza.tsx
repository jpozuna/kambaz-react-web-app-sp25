import React, { useState } from 'react';
import { FaSearch, FaFilter, FaBell, FaCog, FaPlus, FaArrowLeft } from 'react-icons/fa';
import NewPostScreen from './NewPostScreen';
import './styles.css';

interface PiazzaProps {
    courseName: string;
    userName: string;
    userRole: 'student' | 'instructor';
    userId: string;
}

interface Response {
    id: string;
    content: string;
    author: {
        id: string;
        name: string;
    };
    createdAt: Date;
}

interface Post {
    id: string;
    title: string;
    content: string;
    author: {
        id: string;
        name: string;
    };
    folder?: string;
    createdAt: Date;
    status: 'resolved' | 'unresolved';
    tags: string[];
    responses: Response[];
}

interface User {
    id: string;
    name: string;
    role: 'student' | 'instructor';
}

interface Folder {
    id: string;
    name: string;
    count: number;
}

const Piazza: React.FC<PiazzaProps> = ({ courseName, userName, userRole, userId }) => {
    const [selectedFolder, setSelectedFolder] = useState<string>('');
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [showNewPost, setShowNewPost] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'unresolved' | 'resolved'>('all');

    // Mock data - replace with actual data from your backend
    const mockUsers: User[] = [
        { id: '1', name: 'Dr. Smith', role: 'instructor' },
        { id: '2', name: 'John Doe', role: 'student' },
        { id: '3', name: 'Jane Smith', role: 'student' }
    ];

    const mockPosts: Post[] = [
        {
            id: '1',
            title: 'Question about Assignment 1',
            content: 'I have a question about the first problem in Assignment 1...',
            author: { id: '2', name: 'John Doe' },
            folder: 'hw1',
            createdAt: new Date(),
            status: 'unresolved',
            tags: ['homework', 'assignment1'],
            responses: [
                {
                    id: 'f1',
                    content: 'Could you clarify what you mean by recursive?',
                    author: { id: '3', name: 'Jane Smith' },
                    createdAt: new Date()
                }
            ]
        },
        {
            id: '2',
            title: 'Important Announcement: Midterm Date Change',
            content: 'The midterm exam has been rescheduled...',
            author: { id: '1', name: 'Dr. Smith' },
            createdAt: new Date(Date.now() - 86400000),
            status: 'resolved',
            tags: ['announcement', 'midterm'],
            responses: []
        }
    ];

    const folders: Folder[] = [
        { id: '1', name: 'Homework', count: 5 },
        { id: '2', name: 'Lectures', count: 10 },
        { id: '3', name: 'Projects', count: 3 },
        { id: '4', name: 'Announcements', count: 2 }
    ];

    // Convert folders to string array for NewPostScreen
    const folderNames = folders.map(folder => folder.name);

    const filteredPosts = mockPosts
        .filter(post => {
            if (selectedFolder && selectedFolder !== 'all' && post.folder !== selectedFolder) return false;
            if (filterType !== 'all' && post.status !== filterType) return false;
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return (
                    post.title.toLowerCase().includes(query) ||
                    post.content.toLowerCase().includes(query) ||
                    post.author.name.toLowerCase().includes(query)
                );
            }
            return true;
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const handlePostSave = (newPostData: {
        type: 'question' | 'note';
        title: string;
        content: string;
        visibility: 'entire-class' | 'selected-users';
        selectedUsers: string[];
        folders: string[];
    }) => {
        // Create new post object
        const newPost: Post = {
            id: `post-${Date.now()}`,
            title: newPostData.title,
            content: newPostData.content,
            author: {
                id: userId,
                name: userName
            },
            folder: newPostData.folders[0],
            createdAt: new Date(),
            status: 'unresolved',
            tags: [newPostData.type],
            responses: []
        };

        // Add to posts list
        mockPosts.unshift(newPost);
        setShowNewPost(false);
    };

    const searchExternalAPI = async (query: string) => {
        // Implement external API search
    };

    return (
        <div className="piazza-container">
            {/* Sidebar */}
            <div className="piazza-sidebar">
                <div className="p-3">
                    <button
                        className="piazza-btn piazza-btn-primary w-100 mb-3"
                        onClick={() => setShowNewPost(true)}
                    >
                        <FaPlus className="me-2" />
                        New Post
                    </button>
                    <div className="d-flex align-items-center mb-3">
                        <FaFilter className="me-2 text-muted" />
                        <select
                            className="form-select"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value as 'all' | 'unresolved' | 'resolved')}
                        >
                            <option value="all">All Posts</option>
                            <option value="unresolved">Unresolved</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>
                </div>
                <div className="list-group list-group-flush">
                    {folders.map(folder => (
                        <button
                            key={folder.id}
                            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${selectedFolder === folder.name ? 'active' : ''}`}
                            onClick={() => setSelectedFolder(folder.name)}
                        >
                            {folder.name}
                            <span className="badge bg-secondary rounded-pill">{folder.count}</span>
                        </button>
                    ))}
                </div>
                <div className="p-3 border-top">
                    <h6 className="text-muted mb-2">Statistics</h6>
                    <div className="small text-muted">
                        <div>Total Posts: {mockPosts.length}</div>
                        <div>Unresolved: {mockPosts.filter(p => p.status === 'unresolved').length}</div>
                        <div>Your Posts: {mockPosts.filter(p => p.author.id === userId).length}</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="piazza-main">
                <div className="container-fluid px-4">
                    {/* Search Bar and Actions */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center flex-grow-1 me-3">
                            <div className="position-relative flex-grow-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search posts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <FaSearch className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted" />
                            </div>
                        </div>
                    </div>

                    {selectedPost ? (
                        <div className="post-content">
                            <div className="post-header">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <button 
                                            className="btn btn-link text-decoration-none mb-3 ps-0"
                                            onClick={() => setSelectedPost(null)}
                                        >
                                            <FaArrowLeft className="me-2" />
                                            Back to Posts
                                        </button>
                                        <h1 className="post-title">{selectedPost.title}</h1>
                                        <div className="post-meta">
                                            <span className="me-3">Posted by {selectedPost.author.name}</span>
                                            <span className="me-3">•</span>
                                            <span className="me-3">{selectedPost.createdAt.toLocaleDateString()}</span>
                                            <span className="me-3">•</span>
                                            <span>{selectedPost.responses.length} responses</span>
                                        </div>
                                        <div className="mt-2">
                                            {selectedPost.tags.map(tag => (
                                                <span key={tag} className="piazza-tag me-2">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <button className="piazza-btn piazza-btn-outline me-2">Edit</button>
                                        <button className="piazza-btn piazza-btn-primary">Answer</button>
                                    </div>
                                </div>
                            </div>
                            <div className="post-body mt-4">
                                <div className="mb-4">
                                    <h5 className="mb-3">Question</h5>
                                    <div className="p-3 bg-light rounded">{selectedPost.content}</div>
                                </div>
                                {selectedPost.responses.map(response => (
                                    <div key={response.id} className="mb-4">
                                        <h5 className="mb-3">Response</h5>
                                        <div className="p-3 bg-light rounded">{response.content}</div>
                                        <div className="mt-2 small text-muted">
                                            - {response.author.name}, {response.createdAt.toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {filteredPosts.map(post => (
                                <div key={post.id} className="col-12">
                                    <div
                                        className="post-list-item"
                                        onClick={() => setSelectedPost(post)}
                                    >
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <h5 className="mb-1">{post.title}</h5>
                                                <p className="mb-1 text-muted">{post.content.substring(0, 150)}...</p>
                                                <div className="small text-muted">
                                                    <span className="me-2">{post.author.name}</span>
                                                    <span className="me-2">•</span>
                                                    <span className="me-2">{post.createdAt.toLocaleDateString()}</span>
                                                    <span className="me-2">•</span>
                                                    <span>{post.responses.length} responses</span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className={`badge ${post.status === 'resolved' ? 'bg-success' : 'bg-warning'}`}>
                                                    {post.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {showNewPost && (
                <NewPostScreen
                    onClose={() => setShowNewPost(false)}
                    onSave={handlePostSave}
                    users={mockUsers}
                    folders={folderNames}
                />
            )}
        </div>
    );
};

export default Piazza; 