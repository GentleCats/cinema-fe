import { Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';

import TicketBooking from '@/pages/TicketBooking.tsx';

import AdminHome from './pages/AdminHome';
import FilmDetails from './pages/FilmDetails';
import FilmManaging from './pages/FilmManaging';
import HallCreateForm from './pages/HallCreateForm';
import Halls from './pages/Halls';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AuthLayout from './pages/layouts/AuthLayout';
import BaseLayout from './pages/layouts/BaseLayout';
import ProtectedRoute from './pages/layouts/ProtectedRoute';
import RoleProtectedRoute from './pages/layouts/RoleProtectedRoute';
import { routes } from './routes';

function App() {
  return (
    <Box sx={{ height: '100%', position: 'relative', backgroundColor: 'secondary.main' }}>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <BaseLayout />{' '}
            </ProtectedRoute>
          }
        >
          <Route path={routes.PUBLIC.HOME} element={<Home />} />
          <Route path={routes.PUBLIC.PROFILE} element={<Profile />} />
          <Route path={`${routes.PUBLIC.FILMS}/:id`} element={<FilmDetails />} />
          <Route path={routes.PUBLIC.TICKET_BOOKING} element={<TicketBooking />} />
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <RoleProtectedRoute>
                <BaseLayout />{' '}
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        >
          <Route path={routes.PRIVATE.HOME} element={<AdminHome />} />
          <Route path={`${routes.PRIVATE.FILMS}/:id`} element={<FilmManaging />} />
          <Route path={routes.PRIVATE.HALLS} element={<Halls />} />
          <Route path={routes.PRIVATE.HALLS_CREATE} element={<HallCreateForm />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={routes.PUBLIC.REGISTER} element={<SignUp />} />
          <Route path={routes.PUBLIC.LOGIN} element={<SignIn />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
