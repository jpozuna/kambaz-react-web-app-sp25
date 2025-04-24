import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  ListItemButton,
} from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import ForumIcon from '@mui/icons-material/Forum';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import GradeIcon from '@mui/icons-material/Grade';
import SettingsIcon from '@mui/icons-material/Settings';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  disabled?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    icon: <HomeIcon />,
    path: '/course/home',
  },
  {
    label: 'Announcements',
    icon: <AnnouncementIcon />,
    path: '/course/announcements',
    disabled: true,
  },
  {
    label: 'Piazza',
    icon: <ForumIcon />,
    path: '/course/piazza',
  },
  {
    label: 'Quizzes',
    icon: <QuizIcon />,
    path: '/course/quizzes',
  },
  {
    label: 'Files',
    icon: <FolderIcon />,
    path: '/course/files',
    disabled: true,
  },
  {
    label: 'People',
    icon: <PeopleIcon />,
    path: '/course/people',
    disabled: true,
  },
  {
    label: 'Grades',
    icon: <GradeIcon />,
    path: '/course/grades',
    disabled: true,
  },
];

const instructorItems: NavigationItem[] = [
  {
    label: 'Manage Class',
    icon: <SettingsIcon />,
    path: '/course/manage',
  },
];

interface CourseNavigationProps {
  isInstructor: boolean;
}

const CourseNavigation: React.FC<CourseNavigationProps> = ({ isInstructor }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box sx={{ height: '100%' }}>
      <List sx={{ py: 0 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => !item.disabled && handleNavigation(item.path)}
              disabled={item.disabled}
              sx={{
                py: 1.5,
                px: 2,
                bgcolor: isActive(item.path) ? 'rgba(255,255,255,0.12)' : 'transparent',
                borderLeft: '4px solid',
                borderLeftColor: isActive(item.path) ? '#00ACFF' : 'transparent',
                '&:hover': {
                  bgcolor: item.disabled ? 'transparent' : 'rgba(255,255,255,0.08)',
                  borderLeftColor: item.disabled ? 'transparent' : (isActive(item.path) ? '#00ACFF' : 'rgba(255,255,255,0.5)'),
                },
                '&.Mui-disabled': {
                  opacity: 0.5,
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 36, 
                color: isActive(item.path) ? '#00ACFF' : 'rgba(255,255,255,0.9)',
                opacity: item.disabled ? 0.5 : 1,
                transition: 'color 0.2s ease',
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '0.9375rem',
                    fontWeight: isActive(item.path) ? 500 : 400,
                    color: isActive(item.path) ? '#00ACFF' : 'rgba(255,255,255,0.9)',
                    transition: 'color 0.2s ease',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        {isInstructor && (
          <>
            <Divider sx={{ 
              my: 1.5,
              borderColor: 'rgba(255,255,255,0.12)'
            }} />
            {instructorItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    bgcolor: isActive(item.path) ? 'rgba(255,255,255,0.12)' : 'transparent',
                    borderLeft: '4px solid',
                    borderLeftColor: isActive(item.path) ? '#00ACFF' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                      borderLeftColor: isActive(item.path) ? '#00ACFF' : 'rgba(255,255,255,0.5)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 36, 
                    color: isActive(item.path) ? '#00ACFF' : 'rgba(255,255,255,0.9)',
                    transition: 'color 0.2s ease',
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.9375rem',
                        fontWeight: isActive(item.path) ? 500 : 400,
                        color: isActive(item.path) ? '#00ACFF' : 'rgba(255,255,255,0.9)',
                        transition: 'color 0.2s ease',
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Box>
  );
};

export default CourseNavigation; 