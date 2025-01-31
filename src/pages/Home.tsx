import React, { useState, useEffect } from "react";
import ListFilm from "@/components/FilmList";
import { Film } from "@/models/Film";
import { Container, Typography } from "@mui/material";

const Home: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    fetch("http://localhost:5092/api/Movie/get-popular?page=1")
      .then((res) => res.json())
      .then((data) => setFilms(data))
      .catch((err) => console.error("Failed to fetch films", err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Now Showing
      </Typography>
      <ListFilm films={films}/>
    </Container>
  );
};

export default Home;
