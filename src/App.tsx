import { Route, Routes } from "react-router-dom"
import { routes } from "./routes"
import Home from "./pages/Home"
import FilmDetails from "./pages/FilmDetails"

function App() {

  return (
    <>
      <Routes>
        <Route path={routes.PUBLIC.HOME} element={<Home />} />
        <Route path={`${routes.PUBLIC.FILMS}/:id`} element={<FilmDetails />} />
      </Routes>
    </>
  )
}

export default App
