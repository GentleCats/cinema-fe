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
  const [loading, setLoading] = useState({ user: false, tickets: false });
  const [error, setError] = useState({ user: false, tickets: false });

  const fetchUser = async () => {
    setLoading((prev) => ({ ...prev, user: true }));
    setError((prev) => ({ ...prev, user: false }));

    try {
      const res = await axiosInstance.get('/Account/get-me');
      console.log(res.data.user);
      
      setUser(res.data.user);
    } catch (err) {
      console.error('Failed to fetch user', err);
      setError((prev) => ({ ...prev, user: true }));
    } finally {
      setLoading((prev) => ({ ...prev, user: false }));
    }
  };

  const fetchTickets = async () => {
    setLoading((prev) => ({ ...prev, tickets: true }));
    setError((prev) => ({ ...prev, tickets: false }));

    try {
      const res = await axiosInstance.get<Ticket[]>('/Ticket/my-tickets');
      setTickets(res.data);
    } catch (err) {
      console.error('Failed to fetch tickets', err);
      setError((prev) => ({ ...prev, tickets: true }));
    } finally {
      setLoading((prev) => ({ ...prev, tickets: false }));
    }
  };

  useEffect(() => {
    fetchUser();
    fetchTickets();
  }, []);

  const handleLogOut = () => {
    logout();
    navigate(routes.PUBLIC.LOGIN);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {/* User Section */}
      {loading.user ? (
        <CircularProgress />
      ) : error.user ? (
        <Typography variant="body1" color="error">Failed to load user data</Typography>
      ) : user ? (
        <>
          <Typography variant="h5">Welcome, {user.username}!</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogOut}
            style={{ marginTop: '20px' }}
          >
            Log out
          </Button>
        </>
      ) : null}

      {/* Tickets Section */}
      <Typography variant="h6" style={{ marginTop: '30px' }}>My Tickets</Typography>
      {loading.tickets ? (
        <CircularProgress />
      ) : error.tickets ? (
        <Typography variant="body1" color="error">Failed to load tickets</Typography>
      ) : tickets.length > 0 ? (
        <List>
          {tickets.map((ticket) => (
            <ListItem key={ticket.id} divider>
              <ListItemText
                primary={`Row: ${ticket.row}, Seat: ${ticket.seat}`}
                // secondary={`Column: ${ticket.col} | Price: $${ticket.price}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No tickets purchased</Typography>
      )}
    </div>
  );
};

export default Profile;
