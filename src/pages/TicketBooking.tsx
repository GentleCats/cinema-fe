import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Button } from "@mui/material";
import { Hall } from "../models/Hall";
import axiosInstance from "@/utils/axios";

const TicketBooking: React.FC = () => {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Record<number, Set<number>>>({});

  useEffect(() => {
    axiosInstance
      .get("/Hall/get-all")
      .then((res) => setHalls(res.data))
      .catch((err) => console.error("Failed to fetch halls", err));
  }, []);

  const toggleSeat = (hallId: number, seatIndex: number) => {
    setSelectedSeats((prev) => {
      const hallSeats = new Set(prev[hallId] || []);
      if (hallSeats.has(seatIndex)) {
        hallSeats.delete(seatIndex);
      } else {
        hallSeats.add(seatIndex);
      }
      return { ...prev, [hallId]: hallSeats };
    });
  };

  const bookTickets = () => {
    console.log("Selected seats:", selectedSeats);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Available Halls</h2>
      {halls.map((hall) => (
        <div key={hall.id} className="mb-6">
          <h3 className="text-lg font-semibold">{hall.name}</h3>
          <div
            className="grid gap-2 border p-4 bg-gray-100"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 50px)",
              gridTemplateRows: "repeat(5, 50px)",
            }}
          >
            {Array.from({ length: 25 }).map((_, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedSeats[hall.id]?.has(index) ?? false}
                    onChange={() => toggleSeat(hall.id, index)}
                    color="primary"
                  />
                }
                label={index + 1}
                className="w-10 h-10 flex items-center justify-center"
              />
            ))}
          </div>
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={bookTickets}
        className="mt-4"
      >
        Book
      </Button>
    </div>
  );
};

export default TicketBooking;
