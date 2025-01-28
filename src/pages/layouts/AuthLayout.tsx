import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

const AuthLayout = () => {
  return (
    <Box sx={{ height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
