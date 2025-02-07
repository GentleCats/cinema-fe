import { useEffect, useState } from 'react';

import { Film } from '@/models/Film';
import { Container, Typography } from '@mui/material';

import ListFilm from '@/components/FilmList';

import axiosInstance from '@/utils/axios';

const AdminHome: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    axiosInstance
      .get('/Movie/get-all')
      .then((res) => setFilms(res.data))
      .catch((err) => console.error('Failed to fetch films', err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Home User Page
      </Typography>
      <ListFilm films={films} />
    </Container>
  );
};

export default AdminHome;
