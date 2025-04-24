import React, { useState } from 'react';

interface FolderFiltersProps {
    onFolderSelect: (folder: string) => void;
}

const FolderFilters: React.FC<FolderFiltersProps> = ({ onFolderSelect }) => {
    const [selectedFolder, setSelectedFolder] = useState<string>('all');

    const folders = [
        'hw1',
        'hw2',
        'office_hours'
    ];

    const handleFolderClick = (folder: string) => {
        setSelectedFolder(folder);
        onFolderSelect(folder);
    };

    return (
        <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-40">
            <div className="container mx-auto px-4 py-2">
                <div className="flex space-x-4">
                    {folders.map((folder) => (
                        <button
                            key={folder}
                            onClick={() => handleFolderClick(folder)}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                                selectedFolder === folder
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {folder}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FolderFilters; 