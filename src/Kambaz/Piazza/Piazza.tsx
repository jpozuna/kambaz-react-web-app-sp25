import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaBell, FaCog, FaPlus, FaArrowLeft } from 'react-icons/fa';
import NewPostScreen from './NewPostScreen';
import { loadPosts, loadFolders, loadUsers, savePost, updatePost, saveFolder, updateFolder } from './services/piazzaService';
import { Post, User, Folder } from './types';
import './styles.css';
import ReactQuill from 'react-quill';

interface PiazzaProps {
    courseName: string;
    userName: string;
    userRole: 'student' | 'instructor';
    userId: string;
}

const Piazza: React.FC<PiazzaProps> = ({ courseName, userName, userRole, userId }) => {
    const [selectedFolder, setSelectedFolder] = useState<string>('');
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [showNewPost, setShowNewPost] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'unresolved' | 'resolved'>('all');
    const [posts, setPosts] = useState<Post[]>([]);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState('');
    const [newResponse, setNewResponse] = useState('');

    // Initialize with default folders if none exist in localStorage
    useEffect(() => {
        const loadData = () => {
            const loadedPosts = loadPosts();
            const loadedFolders = loadFolders();
            const loadedUsers = loadUsers();
            
            // If no folders exist, initialize with default folders
            if (loadedFolders.length === 0) {
                const defaultFolders: Folder[] = [
                    { id: '1', name: 'Homework', count: 0 },
                    { id: '2', name: 'Lectures', count: 0 },
                    { id: '3', name: 'Projects', count: 0 },
                    { id: '4', name: 'Announcements', count: 0 },
                    { id: '5', name: 'Exams', count: 0 },
                    { id: '6', name: 'Discussion', count: 0 },
                    { id: '7', name: 'Resources', count: 0 },
                    { id: '8', name: 'Office Hours', count: 0 },
                    { id: '9', name: 'Group Work', count: 0 },
                    { id: '10', name: 'General', count: 0 }
                ];
                defaultFolders.forEach(folder => saveFolder(folder));
                setFolders(defaultFolders);
            } else {
                setFolders(loadedFolders);
            }
            
            setPosts(loadedPosts);
            setUsers(loadedUsers);
        };

        loadData();
    }, []);

    const filteredPosts = posts
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

        // Save post to local storage
        savePost(newPost);
        setPosts([newPost, ...posts]);

        // Update folder count
        const updatedFolders = folders.map(folder => {
            if (folder.name === newPostData.folders[0]) {
                return {
                    ...folder,
                    count: folder.count + 1
                };
            }
            return folder;
        });
        setFolders(updatedFolders);
        
        // Save updated folders to local storage
        updatedFolders.forEach(folder => updateFolder(folder));

        setShowNewPost(false);
    };

    const handlePostUpdate = (updatedPost: Post) => {
        updatePost(updatedPost);
        setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
    };

    const handleEdit = () => {
        if (selectedPost) {
            setIsEditing(true);
            setEditContent(selectedPost.content);
        }
    };

    const handleSaveEdit = () => {
        if (selectedPost) {
            const updatedPost = {
                ...selectedPost,
                content: editContent
            };
            updatePost(updatedPost);
            setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
            setSelectedPost(updatedPost);
            setIsEditing(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditContent('');
    };

    const handleAddResponse = () => {
        if (selectedPost && newResponse.trim()) {
            const response = {
                id: `response-${Date.now()}`,
                content: newResponse,
                author: {
                    id: userId,
                    name: userName
                },
                createdAt: new Date()
            };

            const updatedPost = {
                ...selectedPost,
                responses: [...selectedPost.responses, response]
            };

            updatePost(updatedPost);
            setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
            setSelectedPost(updatedPost);
            setNewResponse('');
        }
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
                        <div>Total Posts: {posts.length}</div>
                        <div>Unresolved: {posts.filter(p => p.status === 'unresolved').length}</div>
                        <div>Your Posts: {posts.filter(p => p.author.id === userId).length}</div>
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
                                    placeholder="Search posts by title, content, or author..."
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
                                        {selectedPost.author.id === userId && (
                                            <button 
                                                className="piazza-btn piazza-btn-outline me-2"
                                                onClick={handleEdit}
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button 
                                            className="piazza-btn piazza-btn-primary"
                                            onClick={() => setNewResponse('')}
                                        >
                                            Answer
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="post-body mt-4">
                                <div className="mb-4">
                                    <h5 className="mb-3">Question</h5>
                                    {isEditing ? (
                                        <div>
                                            <ReactQuill
                                                value={editContent}
                                                onChange={setEditContent}
                                                theme="snow"
                                            />
                                            <div className="mt-3">
                                                <button 
                                                    className="btn btn-primary me-2"
                                                    onClick={handleSaveEdit}
                                                >
                                                    Save
                                                </button>
                                                <button 
                                                    className="btn btn-outline-secondary"
                                                    onClick={handleCancelEdit}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-3 bg-light rounded">{selectedPost.content}</div>
                                    )}
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
                                <div className="mb-4">
                                    <h5 className="mb-3">Add Response</h5>
                                    <div className="piazza-editor">
                                        <ReactQuill
                                            value={newResponse}
                                            onChange={setNewResponse}
                                            theme="snow"
                                            placeholder="Write your response here..."
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <button 
                                            className="btn btn-primary"
                                            onClick={handleAddResponse}
                                            disabled={!newResponse.trim()}
                                        >
                                            Post Response
                                        </button>
                                    </div>
                                </div>
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
                    users={users}
                    folders={folders.map(f => f.name)}
                />
            )}
        </div>
    );
};

export default Piazza; 