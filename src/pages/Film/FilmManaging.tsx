import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteMovie, geMovie, getMovieFromTBDB } from '@/api/movieAPI';
import { Film } from '@/models/Film';
import { routes } from '@/routes';
import { Box, Button, Container, Typography } from '@mui/material';

import FilmCreateForm from '@/components/Film/FilmCreateForm';
import FilmInfo from '@/components/Film/FilmInfo';
import Loader from '@/components/Loader';
import SessionList from '@/components/Session/SessionList';

const FilmManaging = () => {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  if (!id) return;

  useEffect(() => {
    const fetchFilmDetails = async () => {
      if (!id) return;
      try {
        let movie = await geMovie(+id);
        if (!movie) {
          movie = await getMovieFromTBDB(+id);
        }

        setFilm(movie);
      } catch (error) {
        console.error('Error fetching film details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [id]);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;

    try {
      await deleteMovie(+id);
      navigate(routes.PUBLIC.HOME);
    } catch (err) {
      console.log(err, 'error here mazafaka');
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!film) {
    return <Typography variant="h5">Film not found!</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <FilmCreateForm film={film} setFilm={setFilm} id={id} />

      <Typography variant="h4" gutterBottom sx={{ py: 4 }}>
        Preview
      </Typography>

      <FilmInfo film={film} />

      <SessionList filmId={film.id.toString()} />

      <Box
        sx={{
          mt: 6,
          p: 4,
          border: '1px solid',
          borderColor: 'error.main',
          borderRadius: 2,
          bgcolor: 'rgba(255, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" color="error" gutterBottom>
          Danger Zone
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Deleting this film will remove all associated data. This action cannot be undone.
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDelete(id);
          }}
        >
          Delete Film
        </Button>
      </Box>
    </Container>
  );
};

export default FilmManaging;
