import { Button, Divider, ListItem, ListItemText } from '@mui/material';

import type { Session } from '../models/Session';

interface SessionProps {
  session: Session;
}

const Session = ({ session }: SessionProps) => {
  const handleBookSession = (sessionId: number) => {
    alert(`Session with ID: ${sessionId} booked!`);
  };

  return (
    <>
      <ListItem>
        <ListItemText
          primary={`${new Date(session.dateTime).toLocaleDateString()} - ${session.startTime} to ${session.endTime}`}
          secondary={`Hall: ${session.hall.name} | Price: $${session.hall.ticket.price}`}
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
      </ListItem>
      <Divider />
    </>
  );
};

export default Session;
