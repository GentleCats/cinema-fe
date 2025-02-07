import { useNavigate } from 'react-router-dom';

import { Film } from '@/models/Film';
import { routes } from '@/routes';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

const FilmCard = ({ film }: { film: Film }) => {
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`${routes.PUBLIC.FILMS}/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', height: '100%' }}>
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
          sx={{ marginTop: 'auto' }}
          onClick={() => handleNavigate(film.id.toString())}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default FilmCard;
