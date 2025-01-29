import { useParams } from "react-router-dom";
import { films, sessions } from "../__mocks__/data";
import { Film } from "../models/Film";
import { Session } from "../models/Session";
import { Container, Typography, Card, CardContent, CardMedia, Grid, List, ListItem, ListItemText, Divider, Box, Button, Rating } from "@mui/material";

const FilmDetails = () => {
  const { id } = useParams<{ id: string }>(); 
  const film: Film | undefined = films.find((f) => f.id === Number(id)); 

  if (!film) {
    return <Typography variant="h5">Film not found!</Typography>; 
  }
  const filmSessions = sessions.filter(session => session.film.id === film.id);

  const handleBookSession = (sessionId: number) => {
    alert(`Session with ID: ${sessionId} booked!`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ border: "2px solid yellow", borderRadius: 2, p: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <CardMedia
            component="img"
            height="400"
            image={film.imageUrl || "https://totobi.com.ua/design/themes/cscart-boilerplate-master/media/images/icons/no_image.png"}
            alt={film.title}
            sx={{borderRadius: 2}} 
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{height: "100%"}}>
            <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#white' }}>{film.title}</Typography>
            <Typography variant="body1" paragraph><strong>Description: </strong>{film.description}</Typography>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}><strong>Genre: </strong>{film.genre}</Typography>
            <Typography variant="body1"><strong>Duration: </strong>{film.duration}</Typography>
            <Typography variant="body1" sx={{ color: '#white', display: 'flex', alignItems: 'center' }}><strong>Rating:</strong>
            <Rating 
              name="film-rating"
              value={film.rating}
              max={10}  
              precision={0.5}  
              readOnly
              sx={{ marginLeft: 1 }}  
            />
            </Typography>
            
            {film.releaseDate && (
              <Typography>
                <strong>Release date: </strong>{film.releaseDate.toLocaleDateString()}
              </Typography>
            )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Box>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Available Sessions</Typography>
      <Box sx={{ border: "2px solid yellow", borderRadius: 2, p: 2 }}>
      <List>
        {filmSessions.length > 0 ? (
          filmSessions.map((session: Session) => (
            <div key={session.id}>
              <ListItem>
                <ListItemText
                  primary={`${session.dateTime.toLocaleDateString()} - ${session.startTime} to ${session.endTime}`}
                  secondary={`Hall: ${session.hall.name} | Price: $${session.hall.ticket.price}`}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBookSession(session.id)}
                  sx={{ marginLeft: 2 }}
                >
                  To reserve
                </Button>
              </ListItem>
              <Divider />
            </div>
          ))
        ) : (
          <Typography>No sessions available for this film.</Typography>
        )}
      </List>
      </Box>
    </Container>
  );
};

export default FilmDetails;
