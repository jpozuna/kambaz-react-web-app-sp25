import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  FormControlLabel,
  Paper,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface Folder {
  id: string;
  name: string;
}

const defaultFolders: Folder[] = [
  { id: '1', name: 'hw1' },
  { id: '2', name: 'hw2' },
  { id: '3', name: 'hw3' },
  { id: '4', name: 'project' },
  { id: '5', name: 'exam' },
  { id: '6', name: 'logistics' },
  { id: '7', name: 'other' },
  { id: '8', name: 'office_hours' },
];

const STORAGE_KEY = 'class_folders';

const ManageFolders: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>(() => {
    const savedFolders = localStorage.getItem(STORAGE_KEY);
    return savedFolders ? JSON.parse(savedFolders) : defaultFolders;
  });
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [editFolderName, setEditFolderName] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(folders));
  }, [folders]);

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: Folder = {
        id: Date.now().toString(),
        name: newFolderName.trim(),
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
    }
  };

  const handleDeleteSelected = () => {
    setFolders(folders.filter(folder => !selectedFolders.includes(folder.id)));
    setSelectedFolders([]);
  };

  const handleEditFolder = (folder: Folder) => {
    setEditingFolder(folder.id);
    setEditFolderName(folder.name);
  };

  const handleSaveEdit = (folderId: string) => {
    if (editFolderName.trim()) {
      setFolders(
        folders.map(folder =>
          folder.id === folderId ? { ...folder, name: editFolderName.trim() } : folder
        )
      );
      setEditingFolder(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingFolder(null);
  };

  const handleSelectFolder = (folderId: string) => {
    setSelectedFolders(prev =>
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 600,
            color: 'text.primary',
            mb: 1
          }}
        >
          Configure Class Folders
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            fontSize: '0.875rem',
            lineHeight: 1.5
          }}
        >
          Add, edit, or remove folders to organize class content
        </Typography>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            label="New Folder Name"
            value={newFolderName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewFolderName(e.target.value)}
            placeholder="Enter folder name"
            size="small"
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleAddFolder}
            disabled={!newFolderName.trim()}
            startIcon={<AddIcon />}
            sx={{ 
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Add Folder
          </Button>
        </Box>
      </Paper>

      <Paper 
        elevation={0} 
        sx={{ 
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1
        }}
      >
        <List>
          {folders.map((folder, index) => (
            <React.Fragment key={folder.id}>
              <ListItem
                sx={{
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  }
                }}
                secondaryAction={
                  editingFolder === folder.id ? (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        edge="end"
                        onClick={() => handleSaveEdit(folder.id)}
                        size="small"
                        color="primary"
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton 
                        edge="end" 
                        onClick={handleCancelEdit}
                        size="small"
                      >
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <IconButton 
                      edge="end" 
                      onClick={() => handleEditFolder(folder)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  )
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      edge="start"
                      checked={selectedFolders.includes(folder.id)}
                      onChange={() => handleSelectFolder(folder.id)}
                      size="small"
                    />
                  }
                  label=""
                />
                {editingFolder === folder.id ? (
                  <TextField
                    value={editFolderName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditFolderName(e.target.value)}
                    size="small"
                    sx={{ flex: 1 }}
                    placeholder="Enter folder name"
                    autoFocus
                  />
                ) : (
                  <ListItemText 
                    primary={folder.name}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontWeight: selectedFolders.includes(folder.id) ? 600 : 400,
                        color: selectedFolders.includes(folder.id) ? 'primary.main' : 'text.primary',
                      },
                    }}
                  />
                )}
              </ListItem>
              {index < folders.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {selectedFolders.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteSelected}
            startIcon={<DeleteIcon />}
            sx={{ 
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Delete Selected Folders ({selectedFolders.length})
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ManageFolders; 