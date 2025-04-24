import React from 'react';

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

interface ListOfPostsProps {
    posts: Post[];
    onPostSelect: (post: Post) => void;
    onNewPost: () => void;
}

const ListOfPosts: React.FC<ListOfPostsProps> = ({ posts, onPostSelect, onNewPost }) => {
    return (
        <div className="fixed left-0 top-16 bottom-0 w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
                <button
                    onClick={onNewPost}
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                    New Post
                </button>
            </div>
            <div className="divide-y divide-gray-200">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        onClick={() => onPostSelect(post)}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                        <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{post.content}</p>
                        <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                            <span>{post.author} • {new Date(post.createdAt).toLocaleDateString()}</span>
                            <span>{post.views} views</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListOfPosts; 