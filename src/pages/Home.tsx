import { useEffect, useState } from 'react';

import { Film } from '@/models/Film';
import { Container, Typography } from '@mui/material';

import ListFilm from '@/components/FilmList';

import axiosInstance from '@/utils/axios';

import PaginationComponent from '@/components/Pagination';

const AdminHome: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [page, setPage] = useState<number>(1); 
  const [filmsPerPage] = useState<number>(20);

  useEffect(() => {
    axiosInstance
      .get('/Movie/get-all')
      .then((res) => setFilms(res.data)) 
      .catch((err) => console.error('Failed to fetch films', err));
  }, []);


  const indexOfLastFilm = page * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm); 

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(films.length / filmsPerPage);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Home User Page
      </Typography>
      <ListFilm films={currentFilms} /> 
      <PaginationComponent
        count={totalPages}  
        page={page}  
        onPageChange={handlePageChange} 
      />
    </Container>
  );
};

export default AdminHome;
