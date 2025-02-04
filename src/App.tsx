import { Route, Routes } from "react-router-dom"
import { routes } from "./routes"
import FilmDetails from "./pages/FilmDetails"
import { Box } from "@mui/material"
import BaseLayout from "./pages/layouts/BaseLayout"
import AuthLayout from "./pages/layouts/AuthLayout"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import ProtectedRoute from "./pages/layouts/ProtectedRoute"
import RoleProtectedRoute from "./pages/layouts/RoleProtectedRoute"
import AdminHome from "./pages/AdminHome"
import Home from "./pages/Home"
import Profile from "./pages/Profile"

function App() {

  return (
    <Box sx={{ height: '100%', position: 'relative', backgroundColor: 'secondary.main' }}>
      <Routes>
        <Route element={<ProtectedRoute><BaseLayout /> </ProtectedRoute>}>
          <Route path={routes.PUBLIC.HOME} element={<Home />} />
          <Route path={routes.PUBLIC.PROFILE} element={<Profile />} />
          <Route path={`${routes.PUBLIC.FILMS}/:id`} element={<FilmDetails />} />
        </Route>
        <Route element={<ProtectedRoute><RoleProtectedRoute><BaseLayout /> </RoleProtectedRoute></ProtectedRoute>}>
          <Route path={routes.PRIVATE.HOME} element={<AdminHome />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={routes.PUBLIC.REGISTER} element={<SignUp />} />
          <Route path={routes.PUBLIC.LOGIN} element={<SignIn />} />
        </Route>
      </Routes>
    </Box >
  )
}

export default App
