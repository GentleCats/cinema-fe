import React from 'react';

import { Film } from '@/models/Film';
import { Session } from '@/models/Session';
import { Box, Card, Grid, Typography } from '@mui/material';

import SessionBadge from '../Session/SessionBadge';
import FilmCard from './FilmCard';

interface FilmWithSessions extends Film {
  sessions: Session[];
}

interface ListFilmProps {
  films: FilmWithSessions[];
}

const FilmSessionList: React.FC<ListFilmProps> = ({ films }) => {
  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {films.map((film) => (
        <Grid item xs={12} sm={6} md={12} key={film.id}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: {xs:'column',md:'row'},
              backgroundColor: 'transparent',
              boxShadow: 2,
              borderRadius: 2,
              color: 'text.primary',
              height: {xs: 'auto',md:'auto'},
              gap: {xs: 2,md:10},
            }}
          >
            <Box sx={{width:{xs: '100%',md:'300px'},}}>
              <FilmCard film={film} />
            </Box>

            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                padding: 2,
                backgroundColor: 'background.paper',
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  color: 'primary.main',
                  fontWeight: 'bold',
                }}
              >
                Sessions
              </Typography>
              {film.sessions.length > 0 ? (
                film.sessions.map((session) => <SessionBadge key={session.id} session={session} />)
              ) : (
                <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                  No sessions available.
                </Typography>
              )}
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FilmSessionList;
