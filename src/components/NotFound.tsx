import React from 'react';
import { Box, Typography } from '@mui/material';

interface NotFoundProps {
  imageSrc?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ imageSrc }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      bgcolor="transparent" 
    >
      <img
        src={imageSrc || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRefihLk0pRzKjI4WZmMOUeTa-cZH59iYVabSE33Zaku_Aw2OVuBRv7PJTrBI5H0Z-clF4&usqp=CAU'}
        alt="Sad Face"
        style={{
          marginBottom: 16,
          width: '150px',
          height: '150px',
          filter: 'grayscale(100%)', 
          background: 'transparent', 
        }}
      />
      <Typography variant="h4" color="textSecondary" fontWeight="bold">
        404 Page Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;
