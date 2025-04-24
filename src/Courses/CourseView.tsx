import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ClassAtAGlance from './ClassAtAGlance';
import ManageClass from './ManageClass';
import CourseNavigation from './CourseNavigation';
import Piazza from './Piazza';
import Quizzes from './Quizzes';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

interface CourseViewProps {
  isInstructor: boolean;
  courseStats: {
    unreadPosts: number;
    unansweredPosts: number;
    totalPosts: number;
    instructorResponses: number;
    studentResponses: number;
    enrolledStudents: number;
  };
}

const CourseView: React.FC<CourseViewProps> = ({ isInstructor, courseStats }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Top Navigation Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'white',
          color: '#2D3B45',
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
          height: '64px'
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 500 }}>
            CS5610.35649.202530
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Left Navigation - Full height, fixed position */}
      <Box sx={{ 
        width: '240px', 
        flexShrink: 0,
        bgcolor: '#394B58',
        color: 'white',
        position: 'fixed',
        height: 'calc(100vh - 64px)',
        top: '64px',
        overflowY: 'auto',
        borderRight: '1px solid rgba(0,0,0,0.12)'
      }}>
        <CourseNavigation isInstructor={isInstructor} />
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        ml: '240px',
        mt: '64px',
        bgcolor: '#FFFFFF',
        minHeight: 'calc(100vh - 64px)'
      }}>
        <Box sx={{ 
          p: 3,
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <Routes>
            <Route 
              path="/" 
              element={<Navigate to="home" replace />} 
            />
            <Route 
              path="home" 
              element={<ClassAtAGlance {...courseStats} />} 
            />
            <Route 
              path="piazza/*" 
              element={<Piazza />} 
            />
            <Route 
              path="quizzes" 
              element={<Quizzes />} 
            />
            <Route 
              path="manage/*" 
              element={
                isInstructor ? (
                  <ManageClass />
                ) : (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    Access Denied: Instructor permissions required
                  </Box>
                )
              } 
            />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseView; 