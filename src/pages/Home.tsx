import { Container, Typography } from "@mui/material";

const AdminHome: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Home User Page
      </Typography>
    </Container>
  );
};

export default AdminHome;
