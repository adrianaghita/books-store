import { Navigate } from "react-router-dom";
import { useLoggedInContext } from "../context/LoggedInContext";
import LogInPage from "../pages/LogInPage";

const LoginRoute = () => {
  const { isLoggedIn } = useLoggedInContext();
  if (!isLoggedIn) {
    return <LogInPage />;
  } else {
    return <Navigate to="/" />;
  }
};

export default LoginRoute;
