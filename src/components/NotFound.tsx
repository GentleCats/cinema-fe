import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const NoData: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <img
        src={
          'https://cdn-icons-png.flaticon.com/512/2748/2748558.png' 
        }
        alt="No Data"
        style={{
          marginBottom: 24,
          width: '200px',
          height: '200px',
          opacity: 0.8,
        }}
      />
      <Typography variant="h4" fontWeight="bold" color="textPrimary" gutterBottom>
        No Data Available
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={3}>
        It seems like there's nothing to display here. Please check back later.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.location.reload()}
        sx={{
          textTransform: 'none',
          fontSize: '16px',
          padding: '10px 20px',
          borderRadius: '8px',
        }}
      >
        Refresh Page
      </Button>
    </Box>
  );
};

export default NoData;
