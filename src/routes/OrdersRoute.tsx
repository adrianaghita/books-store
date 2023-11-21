import { Navigate } from "react-router-dom";
import { useLoggedInContext } from "../context/LoggedInContext";
import OrdersPage from "../pages/OrdersPage";

const OrdersRoute = () => {
  const { isLoggedIn } = useLoggedInContext();

  if (isLoggedIn) {
    return <OrdersPage />;
  } else {
    return <Navigate to="/logIn" />;
  }
};

export default OrdersRoute;
