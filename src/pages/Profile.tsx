import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';

import { routes } from '@/routes';
import { useAuth } from '@/hooks/AuthContext';
import { User } from '@/models/User';
import { Ticket } from '@/models/Ticket';

import axiosInstance from '@/utils/axios';

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);

  useEffect(() => {
    setIsLoadingUser(true);
    axiosInstance
      .get<User>('/api/Account/get-me')
      .then((res) => setUser(res.data))
      .catch((err) => console.error('Failed to fetch user', err))
      .finally(() => setIsLoadingUser(false));
  }, []);

  useEffect(() => {
    setIsLoadingTickets(true);
    axiosInstance
      .get<Ticket[]>('/api/Ticket/my-tickets')
      .then((res) => setTickets(res.data))
      .catch((err) => console.error('Failed to fetch tickets', err))
      .finally(() => setIsLoadingTickets(false));
  }, []);

  const handleLogOut = () => {
    logout();
    navigate(routes.PUBLIC.LOGIN);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {isLoadingUser ? (
        <CircularProgress />
      ) : user ? (
        <>
          <Typography variant="h5">Welcome, {user.username}!</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Typography variant="body2" color={user.isAdmin ? 'secondary' : 'textPrimary'}>
            Role: {user.isAdmin ? 'Admin' : 'User'}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLogOut} style={{ marginTop: '20px' }}>
            Log out
          </Button>

          <Typography variant="h6" style={{ marginTop: '30px' }}>My Tickets</Typography>
          {isLoadingTickets ? (
            <CircularProgress />
          ) : tickets.length > 0 ? (
            <List>
              {tickets.map((ticket) => (
                <ListItem key={ticket.id} divider>
                  <ListItemText
                    primary={`Row: ${ticket.row}, Seat: ${ticket.seat}`}
                    secondary={`Column: ${ticket.col} | Price: $${ticket.price}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">No tickets purchased</Typography>
          )}
        </>
      ) : (
        <Typography variant="body1">Failed to load user data</Typography>
      )}
    </div>
  );
};

export default Profile;
