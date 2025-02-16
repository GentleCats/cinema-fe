import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, CircularProgress, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import { routes } from '@/routes';
import { useAuth } from '@/hooks/AuthContext';
import { User } from '@/models/User';
import { Session } from '@/models/Session';
import axiosInstance from '@/utils/axios';
import { getMySessions } from "@/api/ticketAPI";

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
      setUser(res.data.user);
    } catch (err) {
      setError((prev) => ({ ...prev, user: true }));
    } finally {
      setLoading((prev) => ({ ...prev, user: false }));
    }
  };

  const fetchSessions = async () => {
    setLoading((prev) => ({ ...prev, sessions: true }));
    setError((prev) => ({ ...prev, sessions: false }));
    try {
      const data = await getMySessions();
      setSessions(data);
    } catch (err) {
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
      {loading.user ? (
        <CircularProgress />
      ) : error.user ? (
        <Typography variant="body1" color="error">Failed to load user data</Typography>
      ) : user ? (
        <>
          <Typography variant="h5">Welcome, {user.username}!</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Button variant="contained" color="primary" onClick={handleLogOut} style={{ marginTop: '20px' }}>
            Log out
          </Button>
        </>
      ) : null}

      <Typography variant="h5" style={{ marginTop: '30px' }}>Your Sessions</Typography>
      {loading.sessions ? (
        <CircularProgress />
      ) : error.sessions ? (
        <Typography variant="body1" color="error">Failed to load sessions</Typography>
      ) : (
        sessions.map((session) => (
          <Card key={session.id} style={{ margin: '20px auto', maxWidth: 600 }}>
            <CardContent>
              <img src={session.movie.imageUrl} alt={session.movie.title} style={{ width: '100%', borderRadius: '10px' }} />
              <Typography variant="h6">{session.movie.title}</Typography>
              <Typography variant="body1">Time: {session.startTime} - {session.endTime}</Typography>
              <Typography variant="body1">Price: ${session.price}</Typography>
              <Typography variant="body1">Hall: {session.hall.name} (Capacity: {session.hall.capacity})</Typography>
              <Typography variant="body2" style={{ marginTop: '10px' }}><strong>Tickets:</strong></Typography>
              <List>
                {session.tickets.map((ticket) => (
                  <ListItem key={ticket.id} divider>
                    <ListItemText primary={`Seat: ${ticket.seat}, Row: ${ticket.row}, Col: ${ticket.col}`}
                                  secondary={`Booked at: ${new Date(ticket.bookingTime).toLocaleString()}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Profile;
