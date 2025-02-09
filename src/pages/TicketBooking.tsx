import { Box } from '@mui/material';

import HallSeats from '@/components/Hall/HallSeats';

import { Hall } from '../models/Hall';

const TicketBooking: React.FC = () => {
  const hall: Hall = {
    id: 100,
    name: 'Hall_Name',
    capacity: 100,
    rows: 8,
    cols: 10,
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
      <HallSeats hall={hall || []} />
    </Box>
  );
};

export default TicketBooking;
