import React from 'react';

interface FolderFiltersProps {
    onFolderSelect: (folder: string) => void;
}

const FolderFilters: React.FC<FolderFiltersProps> = ({ onFolderSelect }) => {
    const folders = [
        { id: 'all', name: 'All Posts' },
        { id: 'hw1', name: 'Homework 1' },
        { id: 'hw2', name: 'Homework 2' },
        { id: 'office_hours', name: 'Office Hours' }
    ];

    return (
        <div className="fixed top-16 left-80 right-0 bg-white border-b border-gray-200 z-10">
            <div className="px-4 py-2 flex space-x-4">
                {folders.map((folder) => (
                    <button
                        key={folder.id}
                        onClick={() => onFolderSelect(folder.id)}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        {folder.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FolderFilters; 