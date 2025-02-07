import React, { useState, useEffect } from "react";
import { Button, Container, Typography, Grid, Box } from "@mui/material";
import axiosInstance from "@/utils/axios";
import { Hall } from "@/models/Hall";
import { useNavigate } from "react-router-dom";
import { routes } from "@/routes";
import HallInfo from "@/components/HallInfo";

const Halls: React.FC = () => {
  const [halls, setHalls] = useState<Hall[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(routes.API.HALLS)
      .then((res) => setHalls(res.data))
      .catch((err) => console.error("Failed to fetch halls", err));
  }, []);

  const handleCreateHall = () => {
    navigate(`${routes.PRIVATE.HALLS}/create`);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      {/* Контейнер для заголовка і кнопки на одному рівні */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Cinema Halls</Typography>
        <Button
          variant="outlined"
          onClick={handleCreateHall}
          sx={{
            borderColor: "yellow",
            color: "white",
            "&:hover": {
              backgroundColor: "yellow",
              color: "black",
            },
          }}
        >
          Add New Hall
        </Button>
      </Box>

      <Grid container spacing={2}>
        {halls.map((hall) => (
          <Grid item xs={12} sm={6} md={4} key={hall.id}>
            <HallInfo hall={hall} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Halls;
