import React from 'react';
import { Box, Typography, Paper, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface ClassAtAGlanceProps {
  unreadPosts: number;
  unansweredPosts: number;
  totalPosts: number;
  instructorResponses: number;
  studentResponses: number;
  enrolledStudents: number;
}

const StatBox: React.FC<{
  label: string;
  value: number | string;
  tooltip?: string;
}> = ({ label, value, tooltip }) => (
  <Box 
    sx={{ 
      width: '100%', 
      p: 2, 
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      '&:hover': {
        bgcolor: 'action.hover',
      }
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Typography 
        variant="subtitle2" 
        color="text.secondary"
        sx={{ 
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontSize: '0.75rem'
        }}
      >
        {label}
      </Typography>
      {tooltip && (
        <Tooltip title={tooltip} arrow>
          <InfoIcon fontSize="small" sx={{ ml: 1, color: 'text.secondary', fontSize: '0.875rem' }} />
        </Tooltip>
      )}
    </Box>
    <Typography 
      variant="h6" 
      sx={{ 
        fontWeight: 600,
        color: 'text.primary',
        fontSize: '1.25rem'
      }}
    >
      {value}
    </Typography>
  </Box>
);

const ClassAtAGlance: React.FC<ClassAtAGlanceProps> = ({
  unreadPosts,
  unansweredPosts,
  totalPosts,
  instructorResponses,
  studentResponses,
  enrolledStudents,
}) => {
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
          Class at a Glance
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            fontSize: '0.875rem',
            lineHeight: 1.5
          }}
        >
          Overview of class activity and participation
        </Typography>
      </Box>
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: '1fr 1fr', 
            md: '1fr 1fr 1fr' 
          }, 
          gap: 2 
        }}
      >
        <StatBox
          label="Unread Posts"
          value={unreadPosts === 0 ? 'No unread posts' : unreadPosts}
          tooltip="Number of posts you haven't read yet"
        />
        <StatBox
          label="Unanswered Posts"
          value={unansweredPosts === 0 ? 'No unanswered posts' : unansweredPosts}
          tooltip="Number of posts waiting for a response"
        />
        <StatBox
          label="Total Posts"
          value={totalPosts}
          tooltip="Total number of posts in the class"
        />
        <StatBox
          label="Instructor Responses"
          value={instructorResponses}
          tooltip="Number of responses from instructors"
        />
        <StatBox
          label="Student Responses"
          value={studentResponses}
          tooltip="Number of responses from students"
        />
        <StatBox
          label="Enrolled Students"
          value={enrolledStudents}
          tooltip="Total number of students in the class"
        />
      </Box>
    </Box>
  );
};

export default ClassAtAGlance; 