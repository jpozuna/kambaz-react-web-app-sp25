import { Post, User, Folder } from '../types';

// Local storage keys
const POSTS_KEY = 'piazza_posts';
const FOLDERS_KEY = 'piazza_folders';
const USERS_KEY = 'piazza_users';

// Load data from local storage
export const loadPosts = (): Post[] => {
    const posts = localStorage.getItem(POSTS_KEY);
    if (!posts) return [];
    
    // Parse the posts and convert string dates back to Date objects
    const parsedPosts = JSON.parse(posts);
    return parsedPosts.map((post: any) => ({
        ...post,
        createdAt: new Date(post.createdAt),
        responses: post.responses.map((response: any) => ({
            ...response,
            createdAt: new Date(response.createdAt)
        }))
    }));
};

export const loadFolders = (): Folder[] => {
    const folders = localStorage.getItem(FOLDERS_KEY);
    return folders ? JSON.parse(folders) : [];
};

export const loadUsers = (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

// Save data to local storage
export const savePost = (post: Post): void => {
    const posts = loadPosts();
    const updatedPosts = [post, ...posts];
    localStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts));
};

export const saveFolder = (folder: Folder): void => {
    const folders = loadFolders();
    const updatedFolders = [...folders, folder];
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(updatedFolders));
};

export const saveUser = (user: User): void => {
    const users = loadUsers();
    const updatedUsers = [...users, user];
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
};

// Update existing data
export const updatePost = (updatedPost: Post): void => {
    const posts = loadPosts();
    const updatedPosts = posts.map(post => 
        post.id === updatedPost.id ? updatedPost : post
    );
    localStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts));
};

export const updateFolder = (updatedFolder: Folder): void => {
    const folders = loadFolders();
    const updatedFolders = folders.map(folder => 
        folder.id === updatedFolder.id ? updatedFolder : folder
    );
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(updatedFolders));
};

// Delete data
export const deletePost = (postId: string): void => {
    const posts = loadPosts();
    const updatedPosts = posts.filter(post => post.id !== postId);
    localStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts));
};

export const deleteFolder = (folderId: string): void => {
    const folders = loadFolders();
    const updatedFolders = folders.filter(folder => folder.id !== folderId);
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(updatedFolders));
}; 