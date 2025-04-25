export interface User {
    id: string;
    name: string;
    role: 'student' | 'instructor';
}

export interface Response {
    id: string;
    content: string;
    author: {
        id: string;
        name: string;
    };
    createdAt: Date;
}

export interface Post {
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

export interface Folder {
    id: string;
    name: string;
    count: number;
} 