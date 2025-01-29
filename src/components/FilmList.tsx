import React from "react";
import { Film } from "@/models/Film";
import { Card, CardContent, CardMedia, Typography, Button, Grid } from "@mui/material";

interface ListFilmProps {
  films: Film[];
  onSelectFilm: (film: Film) => void;
}

const ListFilm: React.FC<ListFilmProps> = ({ films, onSelectFilm }) => {
  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {films.map((film) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={film.id}>
          <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
            {film.imageUrl && (
              <CardMedia component="img" height="200" image={film.imageUrl} alt={film.title} />
            )}
            <CardContent>
              <Typography variant="h6" component="div">
                {film.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {film.genre} | Rating: {film.rating}
              </Typography>
              {film.director && (
                <Typography variant="body2" color="text.secondary">
                  Director: {film.director}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={() => onSelectFilm(film)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListFilm;
