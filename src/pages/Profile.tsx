import { logoutUser } from "@/api/authAPI";
import { routes } from "@/routes";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    logoutUser();
    navigate(routes.PUBLIC.LOGIN);
  }

  return (
    <Button variant="contained" color="primary" onClick={handleLogOut}>
      Log out
    </Button>
  );
}

export default Profile;