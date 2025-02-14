import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getSession } from '@/api/sessionAPI';
import { Session } from '@/models/Session';
import { Box } from '@mui/material';

import HallSeats from '@/components/Hall/HallSeats';

const TicketBooking: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    if (!sessionId) return;
    const fetchSession = async () => {
      const session = await getSession(+sessionId);
      setSession(session);
    };
    fetchSession();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
      {session && <HallSeats session={session} />}
    </Box>
  );
};

export default TicketBooking;
