import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, CardMedia, Grid, List, ListItem, ListItemText, Divider, Box, Button, Rating } from "@mui/material";
import { Film } from "../models/Film";
import { Session } from "../models/Session";

import { sessions } from "../__mocks__/data"; 


const FilmDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film | undefined>(undefined);
  const [filmSessions, setFilmSessions] = useState<Session[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7046/api/Movie/get-all`);
        if (response.data && Array.isArray(response.data)) {
          const filmData = response.data.find((f: Film) => f.id === Number(id));
          if (filmData) {
            setFilm(filmData);
            // setFilmSessions(filmData.sessions || []);  
            const mockSessions = sessions.filter(session => session.film.id === filmData.id);

            setFilmSessions(mockSessions);
          }
        } else {
          console.error("Invalid data structure received from API");
        }
      } catch (error) {
        console.error("Error fetching film details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [id]);

  if (loading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  if (!film) {
    return <Typography variant="h5">Film not found!</Typography>;
  }

  const handleBookSession = (sessionId: number) => {
    alert(`Session with ID: ${sessionId} booked!`);
  };

  const formatDate = (date: Date | string) => {
    const formattedDate = new Date(date);
    return !isNaN(formattedDate.getTime()) ? formattedDate.toLocaleDateString() : "Invalid Date";
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ border: "2px solid yellow", borderRadius: 2, p: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              image={film.imageUrl || "https://totobi.com.ua/design/themes/cscart-boilerplate-master/media/images/icons/no_image.png"}
              alt={film.title}
              sx={{
                borderRadius: 2,
                width: '100%',
                height: 'auto', 
                objectFit: 'cover', 
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{height: "100%"}}>
              <CardContent>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>{film.title}</Typography>
                <Typography variant="body1" paragraph><strong>Description: </strong>{film.description}</Typography>
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}><strong>Genre: </strong>{film.genre}</Typography>
                <Typography variant="body1"><strong>Duration: </strong>{film.duration}</Typography>
                <Typography variant="body1" sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}><strong>Rating:</strong>
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
                    <strong>Release date: </strong>{formatDate(film.releaseDate.toString())}
                  </Typography>
                )}

                {film.director && (
                  <Typography><strong>Director: </strong>{film.director}</Typography>
                )}

                {film.cast && film.cast.length > 0 ? (
                  <Typography>
                    <strong>Cast: </strong>
                    {film.cast} and others...
                  </Typography>
                ) : (
                  <Typography>No cast available</Typography>
                )}

                {film.trailerUrl && (
                  <Box sx={{ mt: 2 }}>
                    <Box
                      sx={{
                        display: 'inline-block',
                        backgroundColor: 'yellow', 
                        padding: '4px 12px', 
                        borderRadius: '6px 6px 0 0',
                        marginBottom: 1, 
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
                        Trailer:
                      </Typography>
                    </Box>
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${film.trailerUrl.split("v=")[1]}?rel=0`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </Box>
                )}

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
  <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'white' }}>Available Sessions</Typography>
  <Button
    variant="outlined"
    color="primary"
    sx={{
      mb: 2, 
      borderColor: 'yellow',
      color: 'yellow',
      display: 'flex',
      alignItems: 'center', 
      '&:hover': {
        backgroundColor: 'yellow',
        color: 'black',
      },
    }}
    onClick={() => alert('Functionality to add a session will be implemented later')}
  >
    <Typography sx={{ fontSize: 18, marginRight: 1 }}>+</Typography> 
    Add Session
  </Button>
</Box>
      <Box sx={{ border: "2px solid yellow", borderRadius: 2, p: 2 }}>
        <List>
          {filmSessions && filmSessions.length > 0 ? (
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
                    reserve
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
