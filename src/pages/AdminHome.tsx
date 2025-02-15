import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Film } from '@/models/Film';
import { Container, Typography } from '@mui/material';

import ListFilm from '@/components/Film/FilmList';
import PaginationComponent from '@/components/Pagination';
import NotFound from '@/components/NotFound';
import Loader from '@/components/Loader';

import axiosInstance from '@/utils/axios';

const AdminHome: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setIsLoading(true); 
    axiosInstance
      .get(`/Movie/get-popular?page=${currentPage}`)
      .then((res) => {
        setFilms(res.data);
        setTotalPages(100); 
        setIsLoading(false); 
      })
      .catch((err) => {
        console.error('Failed to fetch films', err);
        setIsLoading(false);
      });
  }, [currentPage]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Now Showing
      </Typography>

      {isLoading ? (
        <Loader /> 
      ) : films.length > 0 ? (
        <>
          <ListFilm films={films} />
          <PaginationComponent count={totalPages} page={currentPage} onPageChange={handlePageChange} />
        </>
      ) : (
        <NotFound />
      )}
    </Container>
  );
};

export default AdminHome;
