import React from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz';

interface Quiz {
  id: string;
  title: string;
  dueDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  score?: number;
}

const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Quiz 1: Introduction',
    dueDate: '2024-03-15',
    status: 'Not Started',
  },
  {
    id: '2',
    title: 'Quiz 2: Basic Concepts',
    dueDate: '2024-03-22',
    status: 'Not Started',
  },
];

const Quizzes: React.FC = () => {
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
            Quizzes
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontSize: '0.875rem',
              lineHeight: 1.5
            }}
          >
            Take quizzes to test your knowledge
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
          New Quiz
        </Button>
      </Box>

      <TableContainer 
        component={Paper} 
        elevation={0}
        sx={{ 
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Quiz</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockQuizzes.map((quiz) => (
              <TableRow 
                key={quiz.id}
                sx={{ 
                  '&:hover': {
                    bgcolor: 'action.hover',
                  }
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <QuizIcon color="primary" />
                    <Typography>{quiz.title}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{quiz.dueDate}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: quiz.status === 'Completed' ? 'success.main' : 
                             quiz.status === 'In Progress' ? 'warning.main' : 
                             'text.secondary'
                    }}
                  >
                    {quiz.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  {quiz.score !== undefined ? `${quiz.score}%` : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Quizzes; 