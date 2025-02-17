import React, { useEffect, useState } from 'react';

import { getRecommendedFilms } from '@/api/movieAPI';
import { Film } from '@/models/Film';
import { Alert, CircularProgress, Container, Typography } from '@mui/material';

import ListFilm from '@/components/Film/FilmList';

const RecommendedFilms: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedFilms = async () => {
      try {
        const films = await getRecommendedFilms();
        setFilms(films);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не вдалося отримати дані');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedFilms();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🎬 Film Recommendation
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && <ListFilm films={films} />}
    </Container>
  );
};

export default RecommendedFilms;
