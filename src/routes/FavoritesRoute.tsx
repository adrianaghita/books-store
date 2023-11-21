import { Navigate } from "react-router-dom";
import { useLoggedInContext } from "../context/LoggedInContext";
import FavoritesPage from "../pages/FavoritesPage";

const FavoritesRoute = () => {
  const { isLoggedIn } = useLoggedInContext();

  if (isLoggedIn) {
    return <FavoritesPage />;
  } else {
    return <Navigate to="/logIn" />;
  }
};

export default FavoritesRoute;
