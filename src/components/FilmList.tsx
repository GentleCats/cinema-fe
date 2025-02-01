import React from "react";
import { useNavigate } from "react-router-dom";
import { Film } from "@/models/Film";
import { Card, CardContent, CardMedia, Typography, Button, Grid } from "@mui/material";
import { routes } from "@/routes";

interface ListFilmProps {
  films: Film[];
}

const ListFilm: React.FC<ListFilmProps> = ({ films }) => {
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`${routes.PUBLIC.FILMS}/${id}`);
  };

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {films.map((film) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={film.id}>
          <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", height: "100%" }}>
            {film.imageUrl && (
              <CardMedia
                component="img"
                height="200"
                image={film.imageUrl}
                alt={film.title}
                sx={{ objectFit: "cover" }}
              />
            )}
            <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                {film.title}
              </Typography>
              
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                {film.genre && <>{film.genre}</>}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                Rating: {film.rating}
              </Typography>

              {film.director && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                >
                  Director: {film.director}
                </Typography>
              )}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: "auto" }}
                onClick={() => handleNavigate(film.id.toString())}
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
