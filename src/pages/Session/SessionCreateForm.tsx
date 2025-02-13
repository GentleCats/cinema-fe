import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { getHalls } from '@/api/hallAPI';
import { geMovie } from '@/api/movieAPI';
import { createSession } from '@/api/sessionAPI';
import { Hall } from '@/models/Hall';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { z } from 'zod';

import { sessionValidation } from '@/utils/zod-validation';

const SessionCreateForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [halls, setHalls] = useState<Hall[]>([]);
  useEffect(() => {
    const fetchHalls = async () => {
      if (!id) return;
      const halls = await getHalls();
      const movie = await geMovie(+id);
      const movieId = movie ? movie.id : +id;
      console.log({ movieId });

      setHalls(halls);
      if (halls[0]) {
        setValue('hallId', halls[0].id);
      }
      if (movieId) {
        setValue('movieId', movieId);
      }
    };
    fetchHalls();
  }, []);

  type SessionValidationType = z.infer<typeof sessionValidation>;
  const formMethods = useForm<SessionValidationType>({
    resolver: zodResolver(sessionValidation),
    mode: 'onBlur',
    defaultValues: {
      startTime: '',
      endTime: '',
      date: new Date(),
      hallId: 0,
      price: 100,
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = formMethods;

  const onSubmit = async (data: SessionValidationType) => {
    await createSession(data);
    navigate(-1);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      elevation={3}
      sx={{
        padding: 4,
        mt: 4,
        ml: 4,
        maxWidth: 400,
        width: '100%',
        bgcolor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Create Session
      </Typography>

      <Box
        sx={{
          color: 'text.primary',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 2,
        }}
      >
        <Controller
          name="startTime"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Start Time"
              variant="outlined"
              error={!!errors.startTime}
              helperText={errors.startTime?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="endTime"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="End Time"
              variant="outlined"
              error={!!errors.endTime}
              helperText={errors.endTime?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...field}
                label="Date"
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue) => {
                  field.onChange(newValue ? newValue.toDate() : null);
                }}
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name="hallId"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="location-label">Hall</InputLabel>
              <Select
                {...field}
                error={!!errors.hallId}
                label="HALL LAbel"
                inputProps={{ 'data-testid': 'location-select' }}
                // onChange={(e) => {
                //   field.onChange(e.target.value);
                //   const selectedLocation = locations.find((l) => l.id === e.target.value);
                //   setCurrentLocation(selectedLocation);
                // }}
              >
                {halls.map((hall) => (
                  <MenuItem key={hall.id} value={hall.id}>
                    {hall.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name={'price'}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={'Price'}
              variant="outlined"
              error={!!errors.price}
              helperText={errors.price?.message}
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
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isValid}
        sx={{
          mt: 3,
          width: '100%',
        }}
      >
        Create
      </Button>
    </Paper>
  );
};

export default SessionCreateForm;
