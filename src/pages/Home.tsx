import React, { useState, useEffect } from "react";
import ListFilm from "@/components/FilmList";
import { Film } from "@/models/Film";
import { Container, Typography, Paper } from "@mui/material";

const Home: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/films")
      .then((res) => res.json())
      .then((data) => setFilms(data))
      .catch((err) => console.error("Failed to fetch films", err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Now Showing
      </Typography>
      <ListFilm films={films} onSelectFilm={setSelectedFilm} />

      {selectedFilm && (
        <Paper sx={{ padding: 3, marginTop: 4, boxShadow: 3 }}>
          <Typography variant="h5">{selectedFilm.title}</Typography>
          <Typography variant="body1">{selectedFilm.description}</Typography>
          <Typography variant="caption" color="text.secondary">
            Duration: {selectedFilm.duration}
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Home;
