import { useState } from 'react';

import { Hall } from '@/models/Hall';
import { Box, Button, Checkbox, Paper, Tooltip, Typography } from '@mui/material';

interface SeatSelection {
  seat: number;
  row: number;
  col: number;
}

const HallSeats = ({ hall }: { hall: Hall }) => {
  const [selectedSeats, setSelectedSeats] = useState<SeatSelection[]>([]);

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

  const isChecked = (seat: number) => {
    return selectedSeats.some((s) => s.seat === seat);
  };

  const bookTickets = () => {
    console.log('Selected seats with details:', selectedSeats);
  };

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
                      onChange={() => toggleSeat(seatNumber, rowIndex + 1, colIndex + 1)}
                      color="primary"
                      sx={{
                        width: 48,
                        height: 48,
                        '& .MuiSvgIcon-root': { fontSize: 28 },
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
