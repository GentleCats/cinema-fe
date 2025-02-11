import { useNavigate } from 'react-router-dom';

import { deleteSession } from '@/api/sessionAPI';
import { routes } from '@/routes';
import { Delete } from '@mui/icons-material';
import { Button, Divider, IconButton, ListItem, ListItemText } from '@mui/material';

import { useAuth } from '@/hooks/AuthContext';

import type { Session } from '../models/Session';

interface SessionProps {
  session: Session;
}

const Session = ({ session }: SessionProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes('Admin');

  const handleBookSession = (sessionId: number) => {
    navigate(`${routes.PUBLIC.TICKET_BOOKING}/${sessionId}`);
  };
  const handleDelete = async (id: number) => {
    await deleteSession(id);
  };
  const formatDate = (date: Date | string) => {
    const formattedDate = new Date(date);
    return !isNaN(formattedDate.getTime()) ? formattedDate.toLocaleDateString() : 'Invalid Date';
  };
  return (
    <>
      <ListItem>
        <ListItemText
          primary={`${formatDate(session.date)} - ${session.startTime} to ${session.endTime}`}
          // secondary={`Hall: ${session.hall.name}`}
        />
        <Button
          variant="contained"
          onClick={() => handleBookSession(session.id)}
          sx={{
            marginLeft: 2,
            border: '2px solid yellow',
            color: 'white',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'yellow',
              color: 'black',
            },
          }}
        >
          Reserve
        </Button>
        {isAdmin && (
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(session.id)}
            sx={{
              color: 'red',
              ml: 2,
              '&:hover': {
                backgroundColor: 'red',
                color: 'white',
              },
            }}
          >
            <Delete />
          </IconButton>
        )}
      </ListItem>
      <Divider />
    </>
  );
};

export default Session;
