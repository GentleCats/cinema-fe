import { useLocation, useNavigate } from 'react-router-dom';

import { Film } from '@/models/Film';
import { routes } from '@/routes';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

import { useAuth } from '@/hooks/AuthContext';

const FilmCard = ({ film }: { film: Film }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes('Admin');
  const isHome = location.pathname === routes.PRIVATE.HOME;

  const handleFilmInfoNavigate = (film: Film) => {
    if (film.tmdbId) {
      navigate(`${routes.PUBLIC.FILMS}/${film.tmdbId}`);
      return;
    }
    navigate(`${routes.PRIVATE.FILMS}/${film.id}`);
  };
  const handleFilmManaginNavigate = (film: Film) => {
    navigate(`${routes.PRIVATE.FILMS}/${film.tmdbId}`);
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {film.imageUrl && (
        <CardMedia component="img" height="200" image={film.imageUrl} alt={film.title} sx={{ objectFit: 'cover' }} />
      )}
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {film.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {film.genre && <>{film.genre}</>}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          Rating: {film.rating}
        </Typography>

        {film.director && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            Director: {film.director}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => handleFilmInfoNavigate(film)}
        >
          View Details
        </Button>
        {isAdmin && !isHome && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => handleFilmManaginNavigate(film)}
          >
            Manage
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FilmCard;
