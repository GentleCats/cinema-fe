import { useNavigate } from 'react-router-dom';

import { Session } from '@/models/Session';
import { routes } from '@/routes';
import { Box, Typography } from '@mui/material';

const SessionBadge = ({ session }: { session: Session }) => {
  const navigate = useNavigate();

  const handleBookSession = (sessionId: number) => {
    navigate(`${routes.PUBLIC.TICKET_BOOKING}/${sessionId}`);
  };

  return (
    <Box
      key={session.id}
      onClick={() => handleBookSession(session.id)}
      sx={{
        marginBottom: 2,
        padding: 1.5,
        borderRadius: 1,
        backgroundColor: 'secondary.main',
        boxShadow: 1,
        color: 'text.primary',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 3,
        },
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {session.startTime} - {session.endTime}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Date: {new Date(session.date).toLocaleDateString()}
      </Typography>
    </Box>
  );
};

export default SessionBadge;
