import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Film } from '@/models/Film';
import { Container, Typography } from '@mui/material';

import ListFilm from '@/components/FilmList';
import PaginationComponent from '@/components/Pagination';

import axiosInstance from '@/utils/axios';

const AdminHome: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    axiosInstance
      .get(`/Movie/get-popular?page=${currentPage}`)
      .then((res) => {
        setFilms(res.data);
        setTotalPages(100);
      })
      .catch((err) => console.error('Failed to fetch films', err));
  }, [currentPage]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Now Showing
      </Typography>
      <ListFilm films={films} />
      <PaginationComponent count={totalPages} page={currentPage} onPageChange={handlePageChange} />
    </Container>
  );
};

export default AdminHome;
