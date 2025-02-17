import React from 'react';

import { Film } from '@/models/Film';
import { Grid } from '@mui/material';

import FilmCard from './FilmCard';

interface ListFilmProps {
  films: Film[];
}

const ListFilm: React.FC<ListFilmProps> = ({ films }) => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        gap: 4,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {films.map((film) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={film.id}>
          <FilmCard film={film} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ListFilm;
