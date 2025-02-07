import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx';
import { AuthProvider } from './hooks/AuthContext.tsx';
import './index.css';
import store, { persistor } from './redux/store.ts';
import darkTheme from './utils/theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
