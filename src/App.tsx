import { Route, Routes } from "react-router-dom"
import { routes } from "./routes"
import Home from "./pages/Home"
import FilmDetails from "./pages/FilmDetails"
import { Box } from "@mui/material"
import BaseLayout from "./pages/layouts/BaseLayout"

function App() {

  return (
    <Box sx={{ height: '100%', position: 'relative', backgroundColor: 'secondary.main' }}>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path={routes.PUBLIC.HOME} element={<Home />} />
          <Route path={`${routes.PUBLIC.FILMS}/:id`} element={<FilmDetails />} />
        </Route>
        {/* <Route element={<AuthLayout />}>
        <Route path={routes.PUBLIC.REGISTER} element={<SignUp />} />
        <Route path={routes.PUBLIC.LOGIN} element={<SignIn />} />
      </Route> */}
      </Routes>
    </Box >
  )
}

export default App
