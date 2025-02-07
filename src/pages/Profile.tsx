import { useNavigate } from 'react-router-dom';

import { routes } from '@/routes';
import { Button } from '@mui/material';

import { useAuth } from '@/hooks/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogOut = () => {
    logout();
    navigate(routes.PUBLIC.LOGIN);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogOut}>
      Log out
    </Button>
  );
};

export default Profile;
