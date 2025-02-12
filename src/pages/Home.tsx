import { useEffect, useState } from 'react';

import { getSorted } from '@/api/movieAPI';
import { Film, FilmWithSessions } from '@/models/Film';
import { Session } from '@/models/Session';
import { Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

import ListFilm from '@/components/Film/FilmList';
import FilmSessionList from '@/components/Film/FilmSessionList';
import PaginationComponent from '@/components/Pagination';

import axiosInstance from '@/utils/axios';

const Home: React.FC = () => {
  const [films, setFilms] = useState<FilmWithSessions[]>([]);
  const [sortType, setSortType] = useState('date');
  // const [page, setPage] = useState<number>(1);
  // const [filmsPerPage] = useState<number>(20);

  useEffect(() => {
    const fetchFilms = async () => {
      const data = await getSorted(sortType);
      setFilms(data);
    };
    fetchFilms();
    axiosInstance
      .get('/Movie/get-sorted?sortType=date')
      .then((res) => setFilms(res.data))
      .catch((err) => console.error('Failed to fetch films', err));
  }, [sortType]);

  // const indexOfLastFilm = page * filmsPerPage;
  // const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  // const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);

  // const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
  //   setPage(newPage);
  // };

  // const totalPages = Math.ceil(films.length / filmsPerPage);
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortType(event.target.value as string);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Home User Page
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 4 }}>
        <InputLabel id="sort-select-label">Sort By</InputLabel>
        <Select labelId="sort-select-label" value={sortType} onChange={handleSortChange} label="Sort By">
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="genre">Genre</MenuItem>
          <MenuItem value="sessions">Sessions</MenuItem>
          <MenuItem value="duration">Duration</MenuItem>
        </Select>
      </FormControl>
      {/* <ListFilm films={currentFilms} /> */}
      <FilmSessionList films={films} />
      {/* <PaginationComponent count={totalPages} page={page} onPageChange={handlePageChange} /> */}
    </Container>
  );
};

export default Home;
