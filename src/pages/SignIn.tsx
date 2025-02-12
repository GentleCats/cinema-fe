import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from '@/api/authAPI';
import { routes } from '@/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, TextField, Typography, IconButton, InputAdornment} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { z } from 'zod';

import Loader from '@/components/Loader';

import { decodeRole } from '@/utils/decodeToken';
import { loginValidation } from '@/utils/zod-validation';

import { useAuth } from '@/hooks/AuthContext';

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  type LoginValidationType = z.infer<typeof loginValidation>;
  const formMethods = useForm<LoginValidationType>({
    resolver: zodResolver(loginValidation),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = formMethods;

  const onSubmit = async (data: LoginValidationType) => {
    setIsLoading(true);
    const { token } = await loginUser({ ...data });
    if (!token) return;
    try {
      const roles = decodeRole(token);
      const user = { token, roles };
      setUser(user);

      if (roles?.includes('Admin')) {
        navigate(routes.PRIVATE.HOME);
      } else {
        navigate(routes.PUBLIC.HOME);
      }
      setIsLoading(false);
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
        Sign In
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
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <Visibility sx={{ color: 'white' }} /> : <VisibilityOff sx={{ color: 'white' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
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
        sx={{ mt: 3, width: '100%' }}
      >
        Sign In
      </Button>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'center', gap: 2 }}>
        <Typography variant="body2">Don't have an account? </Typography>
        <Link to={routes.PUBLIC.REGISTER} style={{ textDecoration: 'none' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Sign Up
          </Typography>
        </Link>
      </Box>
    </Paper>
  );
};

export default SignIn;
