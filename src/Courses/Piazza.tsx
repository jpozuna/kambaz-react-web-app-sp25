import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Piazza: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              mb: 1
            }}
          >
            Piazza
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontSize: '0.875rem',
              lineHeight: 1.5
            }}
          >
            Class discussion board
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ 
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          New Post
        </Button>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1
        }}
      >
        <Typography variant="body1" color="text.secondary" align="center">
          No posts yet. Be the first to start a discussion!
        </Typography>
      </Paper>
    </Box>
  );
};

export default Piazza; 