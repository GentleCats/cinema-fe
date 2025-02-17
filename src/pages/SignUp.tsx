import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { registerUser } from '@/api/authAPI';
import { routes } from '@/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { z } from 'zod';

import Loader from '@/components/Loader';

import { registerValidation } from '@/utils/zod-validation';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  type RegisterValidationType = z.infer<typeof registerValidation>;
  const formMethods = useForm<RegisterValidationType>({
    resolver: zodResolver(registerValidation),
    mode: 'all',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirm: '',
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = formMethods;

  const onSubmit = async (data: RegisterValidationType) => {
    try {
      setIsLoading(true);
      const user = await registerUser(data);
      if (user.success) {
        navigate(routes.PUBLIC.LOGIN);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: 400,
        width: '100%',
        bgcolor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Box sx={{ color: 'text.primary', display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              variant="outlined"
              error={!!errors.username}
              helperText={errors.username?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? (
                        <Visibility sx={{ color: 'white' }} />
                      ) : (
                        <VisibilityOff sx={{ color: 'white' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="confirm"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Repeat Password"
              type={showConfirm ? 'text' : 'password'}
              variant="outlined"
              error={!!errors.confirm}
              helperText={errors.confirm?.message}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm((prev) => !prev)}>
                      {showConfirm ? <Visibility sx={{ color: 'white' }} /> : <VisibilityOff sx={{ color: 'white' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary" disabled={!isValid} sx={{ mt: 3, width: '100%' }}>
        Sign Up
      </Button>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'center', gap: 2 }}>
        <Typography variant="body2">Already have an account? </Typography>
        <Link to={routes.PUBLIC.LOGIN} style={{ textDecoration: 'none' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Sign In
          </Typography>
        </Link>
      </Box>
    </Paper>
  );
};

export default SignUp;
