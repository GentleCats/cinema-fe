import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { geMovie } from '@/api/movieAPI';
import { Container, Typography } from '@mui/material';

import FilmInfo from '@/components/FilmInfo';

import Loader from '../components/Loader';
import SessionList from '../components/SessionList';
import { Film } from '../models/Film';

const FilmDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      if (!id) return;
      try {
        const movie = await geMovie(+id);

        if (movie) {
          setFilm(movie);
        } else {
          console.error('Invalid data structure received from API');
        }
      } catch (error) {
        console.error('Error fetching film details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!film) {
    return <Typography variant="h5">Film not found!</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <FilmInfo film={film} />

      {/* <SessionList filmId={film.id.toString()} /> */}
    </Container>
  );
};

export default FilmDetails;
