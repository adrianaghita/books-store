import { Navigate } from "react-router-dom";
import { useLoggedInContext } from "../context/LoggedInContext";
import RegisterPage from "../pages/RegisterPage";

const RegisterRoute = () => {
  const { isLoggedIn } = useLoggedInContext();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return <RegisterPage />;
  }
};

export default RegisterRoute;
