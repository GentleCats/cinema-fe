import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { createMovie, geMovie, updateMovie } from '@/api/movieAPI';
import { Film } from '@/models/Film';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { z } from 'zod';

import { filmValidation } from '@/utils/zod-validation';

interface IFilmCreateForm {
  film: Film;
  setFilm: React.Dispatch<React.SetStateAction<Film | undefined>>;
}

const FilmCreateForm = ({ film, setFilm }: IFilmCreateForm) => {
  const navigate = useNavigate();
  const [isInProduction, setIsInProduction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  type FilmValidationType = z.infer<typeof filmValidation>;
  const formMethods = useForm<FilmValidationType>({
    resolver: zodResolver(filmValidation),
    mode: 'all',
    defaultValues: {
      title: film.title,
      description: film.description,
      duration: film.duration,
      country: film.country,
      genre: film.genre,
      releaseDate: dayjs(film.releaseDate).toDate(),
      director: film.director,
      cast: film.cast,
      rating: film.rating,
      trailerUrl: film.trailerUrl,
      imageUrl: film.imageUrl,
    },
  });
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = formMethods;

  useEffect(() => {
    const isMovieInProd = async (id: number) => {
      const movie = await geMovie(id);
      setIsInProduction(Boolean(movie));
    };
    isMovieInProd(film.id);
  }, [film.id]);

  const renderTextField = (name: keyof FilmValidationType, label: string, multiline = false) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          error={!!errors[name]}
          helperText={errors[name]?.message}
          multiline={multiline}
          fullWidth
        />
      )}
    />
  );

  const onSubmit = async (data: FilmValidationType) => {
    try {
      setIsLoading(true);
      if (isInProduction) {
        await updateMovie(film.id, data);
        return;
      }
      await createMovie(data, film.id);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleChange = async () => {
    const filmFormData = getValues();
    const filmData = { ...filmFormData, id: film.id };
    setFilm(filmData);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      onChange={handleChange}
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: '100%',
        margin: '0 auto',
        width: '100%',
        bgcolor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Film Form
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {renderTextField('title', 'Title')}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderTextField('duration', 'Duration')}
        </Grid>
        <Grid item xs={12}>
          {renderTextField('description', 'Description', true)}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderTextField('country', 'Country')}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderTextField('genre', 'Genre')}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="releaseDate"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  label="Release Date"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) => {
                    field.onChange(newValue ? newValue.toDate() : null);
                    handleChange();
                  }}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderTextField('director', 'Director')}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderTextField('cast', 'Cast')}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={'rating'}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={'Rating'}
                variant="outlined"
                error={!!errors.rating}
                helperText={errors.rating?.message}
                fullWidth
                onBlur={(e) => {
                  const value = e.target.value;
                  const parsedValue = parseFloat(value);
                  if (!isNaN(parsedValue)) {
                    field.onChange(parsedValue);
                  } else {
                    field.onChange('');
                  }
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          {renderTextField('trailerUrl', 'Trailer URL')}
        </Grid>
        <Grid item xs={12}>
          {renderTextField('imageUrl', 'Image URL')}
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid || isLoading}
            fullWidth
            sx={{ mt: 2 }}
          >
            {isInProduction ? 'Update' : 'Create'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilmCreateForm;
