import React, { useState, useEffect } from "react";
import ListFilm from "@/components/FilmList";
import { Film } from "@/models/Film";
import { Container, Typography } from "@mui/material";
import axios from "axios";

const Home: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5092/api/Movie/get-popular?page=1")
      .then((res) => setFilms(res.data))
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
