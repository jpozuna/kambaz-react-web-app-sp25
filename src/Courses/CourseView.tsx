import React from 'react';
import { Box } from '@mui/material';
import ClassAtAGlance from './ClassAtAGlance';
import ManageClass from './ManageClass';
import CourseNavigation from './CourseNavigation';
import Piazza from './Piazza';
import Quizzes from './Quizzes';
import { Routes, Route, useLocation } from 'react-router-dom';

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
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Left Navigation */}
      <Box sx={{ width: '240px', flexShrink: 0, p: 2 }}>
        <CourseNavigation isInstructor={isInstructor} />
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Routes>
          <Route 
            path="/" 
            element={<ClassAtAGlance {...courseStats} />} 
          />
          <Route 
            path="/home" 
            element={<ClassAtAGlance {...courseStats} />} 
          />
          <Route 
            path="/piazza/*" 
            element={<Piazza />} 
          />
          <Route 
            path="/quizzes" 
            element={<Quizzes />} 
          />
          <Route 
            path="/manage/*" 
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
          {/* Add more routes as needed */}
        </Routes>
      </Box>
    </Box>
  );
};

export default CourseView; 