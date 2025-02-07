import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Flare } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Rating, Typography } from '@mui/material';

import FilmCreateForm from '@/components/FilmCreateForm';
import FilmInfo from '@/components/FilmInfo';

import axiosInstance from '@/utils/axios';

import { useAuth } from '@/hooks/AuthContext';

import Loader from '../components/Loader';
import SessionList from '../components/SessionList';
import { Film } from '../models/Film';
import { deleteMovie } from '@/api/movieAPI';
import { routes } from '@/routes';

const FilmDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.roles?.includes('Admin');

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const response = await axiosInstance.get(`/Movie/get-by-tmdb-id?movieId=${id}`);

        if (response.data) {
          setFilm(response.data);
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

  const handleDelete = async (id: string | undefined) => {
    if(!id) return;

    try {
      await deleteMovie(+id);
      navigate(routes.PUBLIC.HOME);
    } catch (err) {
      console.log(err,"error here mazafaka")
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (!film) {
    return <Typography variant="h5">Film not found!</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {isAdmin && <FilmCreateForm film={film} setFilm={setFilm} />}
      <Typography variant="h4" gutterBottom sx={{ py: 4 }}>
        Preview
      </Typography>
      <FilmInfo film={film} />

      {isAdmin && <Box
        sx={{
          mt: 6,
          p: 4,
          border: "1px solid",
          borderColor: "error.main",
          borderRadius: 2,
          bgcolor: "rgba(255, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" color="error" gutterBottom>
          Danger Zone
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Deleting this film will remove all associated data. This action cannot
          be undone.
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={()=>{handleDelete(id)}}
        >
          Delete Film
        </Button>
      </Box>}

      {/* <SessionList filmId={film.id.toString()} /> */}
    </Container>
  );
};

export default FilmDetails;
