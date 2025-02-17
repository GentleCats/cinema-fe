import { useEffect, useState } from 'react';

import { getGenres, getSorted } from '@/api/movieAPI';
import { FilmWithSessions } from '@/models/Film';
import { Genre } from '@/models/Genres';
import { Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

import FilmSessionList from '@/components/Film/FilmSessionList';
import Loader from '@/components/Loader';
import NoData from '@/components/NotFound';
import PaginationComponent from '@/components/Pagination';

const Home: React.FC = () => {
  const [films, setFilms] = useState<FilmWithSessions[]>([]);
  const [sortType, setSortType] = useState('date');
  const [genre, setGenre] = useState(' ');
  const [page, setPage] = useState<number>(1);
  const [filmsPerPage] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [genres, setGenres] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchFilms = async () => {
      const data = await getSorted(sortType, genre);
      setFilms(data);
      setIsLoading(false);
    };
    fetchFilms();
  }, [sortType, genre]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        const formatedGenres = [
          { label: 'All', value: ' ' },
          ...data.map((g: Genre) => ({ label: g.name, value: g.name })),
        ];
        setGenres(formatedGenres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const indexOfLastFilm = page * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);
  const sortValues = [
    { label: 'Date', value: 'date' },
    { label: 'Title', value: 'title' },
    { label: 'Duration', value: 'duration' },
  ];

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(films.length / filmsPerPage);
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortType(event.target.value as string);
    setPage(1);
  };

  const handleGenreChange = (event: SelectChangeEvent<string>) => {
    setGenre(event.target.value);
    setPage(1);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Home User Page
      </Typography>
      {isLoading ? (
        <Loader />
      ) : films.length > 0 ? (
        <>
          <FormControl fullWidth sx={{ marginBottom: 4, gap: 2 }}>
            <InputLabel id="sort-select-label">Sort By</InputLabel>
            <Select labelId="sort-select-label" value={sortType} onChange={handleSortChange} label="Sort By">
              {sortValues.map((item) => {
                return (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 4, gap: 2 }}>
            <InputLabel id="genre-select-label">Genre</InputLabel>
            <Select labelId="genre-select-label" value={genre} onChange={handleGenreChange} label="Genre">
              {genres.map((item) => (
                <MenuItem value={item.value} key={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FilmSessionList films={currentFilms} />
          <PaginationComponent count={totalPages} page={page} onPageChange={handlePageChange} />
        </>
      ) : (
        <NoData />
      )}
    </Container>
  );
};

export default Home;
