import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteHall, getHalls } from '@/api/hallAPI';
import { Hall } from '@/models/Hall';
import { routes } from '@/routes';
import { Delete } from '@mui/icons-material';
import { Box, Button, Container, Grid, IconButton, Typography } from '@mui/material';

import HallInfo from '@/components/Hall/HallInfo';

const Halls: React.FC = () => {
  const [halls, setHalls] = useState<Hall[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHalls = async () => {
      const halls = await getHalls();
      setHalls(halls);
    };
    try {
      fetchHalls();
    } catch (err) {
      console.error('Failed to fetch halls', err);
    }
  }, []);

  const handleCreateHall = () => {
    navigate(`${routes.PRIVATE.HALLS}/create`);
  };

  const handleDelete = async (hallId: number) => {
    try {
      await deleteHall(hallId);
      setHalls((prev) => prev.filter((h) => h.id !== hallId));
    } catch (err) {
      console.log('delete hall error');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Cinema Halls</Typography>
        <Button
          variant="outlined"
          onClick={handleCreateHall}
          sx={{
            borderColor: 'yellow',
            color: 'white',
            '&:hover': {
              backgroundColor: 'yellow',
              color: 'black',
            },
          }}
        >
          Add New Hall
        </Button>
      </Box>

      <Grid container spacing={2}>
        {halls.map((hall) => (
          <Grid item xs={12} sm={6} md={4} key={hall.id}>
            <Box
              sx={{
                position: 'relative',
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              {/* Delete Icon */}
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(hall.id)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'red',
                  '&:hover': {
                    backgroundColor: 'red',
                    color: 'white',
                  },
                }}
              >
                <Delete />
              </IconButton>

              <HallInfo hall={hall} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Halls;
