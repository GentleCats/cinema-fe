import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Hall } from "../models/Hall";
import axiosInstance from "@/utils/axios";
import HallSeats from "@/components/Hall/HallSeats";

const TicketBooking: React.FC = () => {
  const [halls, setHalls] = useState<Hall[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/Hall/get-all")
      .then((res) => setHalls(res.data))
      .catch((err) => console.error("Failed to fetch halls", err));
  }, []);

  const hall: Hall = {
    id: 100,
    name: "Hall_Name",
    capacity: 100,
    rows: 8,
    cols: 10,
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}>
      <HallSeats hall={hall || []} />
    </Box>
  );
};

export default TicketBooking;
