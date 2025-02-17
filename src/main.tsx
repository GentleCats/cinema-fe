import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import App from './App.tsx';
import { AuthProvider } from './hooks/AuthContext.tsx';
import './index.css';
import darkTheme from './utils/theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
