import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Search from './Search';
import SearchResults from './SearchResults';
import Details from './Details';
import Piazza from './Piazza/Piazza';
import CourseView from './Courses/CourseView';

const App: React.FC = () => {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/details/:id" element={<Details />} />
        
        {/* Protected Routes */}
        <Route 
          path="/profile" 
          element={currentUser ? <Profile /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile/:profileId" 
          element={<Profile />} 
        />
        <Route 
          path="/Kambaz/Courses/:courseId/*" 
          element={currentUser ? <CourseView /> : <Navigate to="/login" />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App; 