import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import darkTheme from './utils/theme.ts'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css';
import { AuthProvider } from './hooks/AuthContext.tsx'

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
)
