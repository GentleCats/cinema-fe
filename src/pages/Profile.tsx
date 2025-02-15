import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';

import { routes } from '@/routes';
import { useAuth } from '@/hooks/AuthContext';
import { User } from '@/models/User';
import { Session } from '@/models/Session';

import axiosInstance from '@/utils/axios';

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState({ user: false, sessions: false });
  const [error, setError] = useState({ user: false, sessions: false });

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

  const fetchSessions = async () => {
    setLoading((prev) => ({ ...prev, sessions: true }));
    setError((prev) => ({ ...prev, sessions: false }));

    try {
      const res = await axiosInstance.get<Session[]>('/Ticket/my-sessions');
      setSessions(res.data);
    } catch (err) {
      console.error('Failed to fetch sessions', err);
      setError((prev) => ({ ...prev, sessions: true }));
    } finally {
      setLoading((prev) => ({ ...prev, sessions: false }));
    }
  };

  useEffect(() => {
    fetchUser();
    fetchSessions();
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

      {/* Sessions Section */}
      <Typography variant="h6" style={{ marginTop: '30px' }}>My Sessions</Typography>
      {loading.sessions ? (
        <CircularProgress />
      ) : error.sessions ? (
        <Typography variant="body1" color="error">Failed to load sessions</Typography>
      ) : sessions.length > 0 ? (
        <List>
          {sessions.map((session) => (
            <ListItem key={session.id} divider>
              <ListItemText
                primary={`${session.film.title} - ${session.date.toLocaleDateString()} ${session.startTime} - ${session.endTime}`}
                secondary={`Hall: ${session.hall.name} | Price: $${session.price}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No sessions available</Typography>
      )}
    </div>
  );
};

export default Profile;
