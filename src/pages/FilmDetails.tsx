import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Film } from "../models/Film";
import Loader from "../components/Loader";
import FilmInfo from "@/components/FilmInfo";
import { geMovie } from "@/api/movieAPI";

const FilmDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
       {/* Кнопка "Назад" */}
       <IconButton onClick={() => navigate(-1)} sx={{ mb: 2, color: "yellow" }}>
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <FilmInfo film={film} />

      {/* <SessionList filmId={film.id.toString()} /> */}
    </Container>
  );
};

export default FilmDetails;
