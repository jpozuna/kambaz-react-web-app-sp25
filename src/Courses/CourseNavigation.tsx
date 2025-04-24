import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import ForumIcon from '@mui/icons-material/Forum';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import GradeIcon from '@mui/icons-material/Grade';
import SettingsIcon from '@mui/icons-material/Settings';
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
    icon: <ForumIcon />,
    path: '/course/announcements',
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
  },
  {
    label: 'People',
    icon: <PeopleIcon />,
    path: '/course/people',
  },
  {
    label: 'Grades',
    icon: <GradeIcon />,
    path: '/course/grades',
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
    <Paper
      elevation={0}
      sx={{
        width: '240px',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography
          variant="subtitle2"
          sx={{
            textTransform: 'uppercase',
            color: 'text.secondary',
            fontSize: '0.75rem',
            letterSpacing: '0.5px',
          }}
        >
          Course Navigation
        </Typography>
      </Box>
      <List sx={{ py: 0 }}>
        {navigationItems.map((item) => (
          <ListItem
            key={item.label}
            onClick={() => handleNavigation(item.path)}
            disabled={item.disabled}
            sx={{
              py: 1,
              px: 2,
              cursor: 'pointer',
              bgcolor: isActive(item.path) ? 'action.selected' : 'transparent',
              borderLeft: 4,
              borderLeftColor: isActive(item.path) ? 'primary.main' : 'transparent',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '0.875rem',
                  fontWeight: isActive(item.path) ? 600 : 400,
                  color: isActive(item.path) ? 'primary.main' : 'text.primary',
                },
              }}
            />
          </ListItem>
        ))}

        {isInstructor && (
          <>
            <Box
              sx={{
                py: 1,
                px: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  letterSpacing: '0.5px',
                }}
              >
                Instructor
              </Typography>
            </Box>
            {instructorItems.map((item) => (
              <ListItem
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                disabled={item.disabled}
                sx={{
                  py: 1,
                  px: 2,
                  cursor: 'pointer',
                  bgcolor: isActive(item.path) ? 'action.selected' : 'transparent',
                  borderLeft: 4,
                  borderLeftColor: isActive(item.path) ? 'primary.main' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      fontWeight: isActive(item.path) ? 600 : 400,
                      color: isActive(item.path) ? 'primary.main' : 'text.primary',
                    },
                  }}
                />
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Paper>
  );
};

export default CourseNavigation; 