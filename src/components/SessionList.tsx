import { useState, useEffect } from "react";
import { Box, List, Typography, Grid, Button } from "@mui/material"; 
import { Session } from "../models/Session";  
import Loader from "./Loader";
import SessionComponent from "./Session";  
import axiosInstance from "@/utils/axios";

interface SessionListProps {
  filmId: string;
}

const SessionList = ({ filmId }: SessionListProps) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axiosInstance.get(`/Sessions/get-by-film-id/${filmId}`);
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [filmId]);

  const handleAddSession = () =>{
    alert(`Sorry, but the session cannot be added at this time!`)
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <Typography variant="h5" sx={{ color: "white" }}>Available Sessions</Typography>
        </Grid>
        <Grid item>
        <Button
        variant="outlined"
        onClick={handleAddSession}
        sx={{
            borderColor: "yellow", 
            color: "white", 
            '&:hover': {
            backgroundColor: "yellow", 
            color: "black", 
            },
            padding: "6px 16px",
            fontSize: "12px",
            display: "flex",
            alignItems: "center", 
        }}
        >
        <span style={{ fontSize: "18px", marginRight: "8px" }}>+</span>
        ADD SESSION
        </Button>
        </Grid>
      </Grid>

      <Box sx={{ border: "2px solid yellow", borderRadius: 2, p: 2 }}>
        {loading ? (
          <Loader />
        ) : sessions.length > 0 ? (
          <List>
            {sessions.map((session) => (
              <SessionComponent key={session.id} session={session} />  
            ))}
          </List>
        ) : (
          <Typography>No sessions available for this film.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SessionList;
