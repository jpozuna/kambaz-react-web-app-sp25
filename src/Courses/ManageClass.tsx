import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import ManageFolders from './ManageFolders';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`manage-class-tabpanel-${index}`}
      aria-labelledby={`manage-class-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ManageClass: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box 
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          mb: 3
        }}
      >
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="manage class tabs"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              minWidth: 120,
              px: 2,
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          <Tab 
            label="Manage Folders" 
            id="manage-class-tab-0"
            aria-controls="manage-class-tabpanel-0"
          />
          <Tab 
            label="Tab 2" 
            disabled 
            id="manage-class-tab-1"
            aria-controls="manage-class-tabpanel-1"
          />
          <Tab 
            label="Tab 3" 
            disabled 
            id="manage-class-tab-2"
            aria-controls="manage-class-tabpanel-2"
          />
          <Tab 
            label="Tab 4" 
            disabled 
            id="manage-class-tab-3"
            aria-controls="manage-class-tabpanel-3"
          />
          <Tab 
            label="Tab 5" 
            disabled 
            id="manage-class-tab-4"
            aria-controls="manage-class-tabpanel-4"
          />
          <Tab 
            label="Tab 6" 
            disabled 
            id="manage-class-tab-5"
            aria-controls="manage-class-tabpanel-5"
          />
          <Tab 
            label="Tab 7" 
            disabled 
            id="manage-class-tab-6"
            aria-controls="manage-class-tabpanel-6"
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ManageFolders />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>Tab 2 Content</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>Tab 3 Content</Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography>Tab 4 Content</Typography>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Typography>Tab 5 Content</Typography>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Typography>Tab 6 Content</Typography>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Typography>Tab 7 Content</Typography>
      </TabPanel>
    </Box>
  );
};

export default ManageClass; 