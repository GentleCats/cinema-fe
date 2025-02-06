import React, { useState, useEffect } from "react";
import ListFilm from "@/components/FilmList";
import { Film } from "@/models/Film";
import { Container, Typography, Pagination } from "@mui/material";
import axiosInstance from "@/utils/axios";

const AdminHome: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filmsPerPage = 8;

  useEffect(() => {
    {/* /Admin/get-popular?page=1 */}
    axiosInstance.get("/Movie/get-popular?page=1")
      .then((res) => setFilms(res.data))
      .catch((err) => console.error("Failed to fetch films", err));
  }, [currentPage]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Now Showing
      </Typography>
      <ListFilm films={films.slice((currentPage - 1) * filmsPerPage, currentPage * filmsPerPage)} />
      <Pagination
        count={Math.ceil(films.length / filmsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      />
    </Container>
  );
};

export default AdminHome;
