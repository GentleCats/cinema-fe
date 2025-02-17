import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getHall } from '@/api/hallAPI';
import { getMyTickets, getTicketsBySessionId } from '@/api/ticketAPI';
import { Hall } from '@/models/Hall';
import { Session } from '@/models/Session';
import { routes } from '@/routes';
import { Box, Button, Checkbox, Paper, Tooltip, Typography } from '@mui/material';

import axiosInstance from '@/utils/axios';

import Loader from '../Loader';

interface SeatSelection {
  seat: number;
  row: number;
  col: number;
}

const HallSeats = ({ session }: { session: Session }) => {
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState<SeatSelection[]>([]);
  const [hall, setHall] = useState<Hall>();
  const [isLoading, setIsLoading] = useState(false);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [myTickets, setMyTickets] = useState<number[]>([]);

  useEffect(() => {
    const fetchHall = async () => {
      try {
        setIsLoading(true);
        const hall = await getHall(+session.hallId);
        const tickets = await getTicketsBySessionId(+session.id);
        const booked = tickets.map((t) => t.seat);
        const userTickets = await getMyTickets();
        const userSeats = userTickets.filter((t) => t.sessionId === session.id).map((t) => t.seat);

        setBookedSeats(booked);
        setHall(hall);
        setMyTickets(userSeats);
      } catch (err) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHall();
  }, []);

  const toggleSeat = (seat: number, row: number, col: number) => {
    setSelectedSeats((prev) => {
      const existingSeat = prev.find((s) => s.seat === seat);
      if (existingSeat) {
        return prev.filter((s) => s.seat !== seat);
      } else {
        return [...prev, { seat, row, col }];
      }
    });
  };

  const isMySeat = (seat: number) => {
    return myTickets.includes(seat);
  };

  const isChecked = (seat: number) => {
    return selectedSeats.some((s) => s.seat === seat) || isDisabled(seat);
  };

  const isDisabled = (seat: number) => {
    return bookedSeats.includes(seat);
  };

  const bookTickets = async () => {
    selectedSeats.map(async (seat) => {
      const ticket = {
        row: seat.row,
        col: seat.col,
        seat: seat.seat,
        sessionId: session.id,
      };
      await axiosInstance.post(`/Ticket/create`, { ...ticket });
    });

    navigate(routes.PUBLIC.PROFILE);
  };

  if (isLoading || !hall) {
    return <Loader />;
  }

  return (
    <Paper elevation={3} sx={{ width: '100%', maxWidth: 800, p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
        {hall.name}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'visible',
          width: '100%',
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            borderRadius: '4px',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            gap: 1,
            flexShrink: 0,
            margin: '0 auto',
          }}
        >
          {Array.from({ length: hall.rows }).map((_, rowIndex) => (
            <Box
              key={rowIndex}
              sx={{
                display: 'flex',
                gap: 1,
                flexShrink: 0,
              }}
            >
              {Array.from({ length: hall.cols }).map((_, colIndex) => {
                const seatNumber = rowIndex * hall.cols + colIndex + 1;
                return (
                  <Tooltip title={`Seat ${seatNumber} (Row: ${rowIndex + 1}, Col: ${colIndex + 1})`} key={colIndex}>
                    <Checkbox
                      checked={isChecked(seatNumber)}
                      disabled={isDisabled(seatNumber)}
                      onChange={() => toggleSeat(seatNumber, rowIndex + 1, colIndex + 1)}
                      color="primary"
                      sx={{
                        width: 48,
                        height: 48,
                        '& .MuiSvgIcon-root': { fontSize: 28, color: isMySeat(seatNumber) ? 'green' : 'inherit' },
                      }}
                    />
                  </Tooltip>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>

      <Button variant="contained" color="primary" onClick={bookTickets} sx={{ mt: 4 }}>
        Book Tickets
      </Button>
    </Paper>
  );
};

export default HallSeats;
