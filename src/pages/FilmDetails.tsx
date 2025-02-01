import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, CardMedia, Grid, Box, Rating } from "@mui/material";
import { Film } from "../models/Film";
import Loader from "../components/Loader";
import SessionList from "../components/SessionList";



const FilmDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7046/api/Movie/get-by-id/${id}`, {
          headers: {
            'accept': '*/*'
          }
        });
  
        if (response.data) {
          setFilm(response.data);

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
    return <Loader />;
  }  

  if (!film) {
    return <Typography variant="h5">Film not found!</Typography>;
  }



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
              image={film.imageUrl || "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/4541/live/4818fdb0-d4f8-11ef-87df-d575b9a434a4.png.webp"}
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
                        marginBottom: 0, 
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
      <SessionList filmId={film.id.toString()} />
    </Container>
  );
};

export default FilmDetails;
