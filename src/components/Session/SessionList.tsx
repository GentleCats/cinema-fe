import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { geMovie } from '@/api/movieAPI';
import { getSessions } from '@/api/sessionAPI';
import { Session } from '@/models/Session';
import { routes } from '@/routes';
import { Box, Button, Grid, List, Typography } from '@mui/material';

import { useAuth } from '@/hooks/AuthContext';

import Loader from '../Loader';
import SessionComponent from './Session';

interface SessionListProps {
  filmId: string;
}

const SessionList = ({ filmId }: SessionListProps) => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes('Admin');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const movie = await geMovie(+filmId);
        const movieId = movie ? movie.id : +filmId;
        const sessions = await getSessions(movieId);
        setSessions(sessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [filmId]);

  const handleAddSession = () => {
    navigate(`${routes.PRIVATE.SESSIONS_CREATE}/${filmId}`);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <Typography variant="h5" sx={{ color: 'white' }}>
            Available Sessions
          </Typography>
        </Grid>
        <Grid item>
          {isAdmin && (
            <Button
              variant="outlined"
              onClick={handleAddSession}
              sx={{
                borderColor: 'yellow',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'yellow',
                  color: 'black',
                },
                padding: '6px 16px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '18px', marginRight: '8px' }}>+</span>
              ADD SESSION
            </Button>
          )}
        </Grid>
      </Grid>

      <Box sx={{ border: '2px solid yellow', borderRadius: 2, p: 2 }}>
        {loading ? (
          <Loader />
        ) : sessions.length > 0 ? (
          <List>
            {sessions.map((session) => (
              <SessionComponent key={session.id} session={session} />
            ))}
          </List>
        ) : (
          <Typography>No sessions available for this film.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SessionList;
