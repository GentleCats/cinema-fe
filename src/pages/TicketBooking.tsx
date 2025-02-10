import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getHall } from '@/api/hallAPI';
import { Box } from '@mui/material';

import HallSeats from '@/components/Hall/HallSeats';

import { Hall } from '../models/Hall';

const TicketBooking: React.FC = () => {
  const { hallId } = useParams<{ hallId: string }>();
  const [hall, setHall] = useState<Hall>();

  useEffect(() => {
    if (!hallId) return;
    const fetchHall = async () => {
      const hall = await getHall(+hallId);
      setHall(hall);
    };
    fetchHall();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
      {hall && <HallSeats hall={hall} />}
    </Box>
  );
};

export default TicketBooking;
