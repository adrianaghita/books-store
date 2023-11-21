import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import HomePage from "../pages/HomePage";
import BookDetailPage from "../pages/BookDetailPage/BookDetailPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import PlaceOrderDetailsPage from "../pages/PlaceOrderDetailsPage";
import UpdateOrderPage from "../pages/UpdateOrderDetailsPage";
import OrdersRoute from "./OrdersRoute";
import LoginRoute from "../routes/LogInRoute";
import RegisterRoute from "./RegisterRoute";
import FavoritesRoute from "./FavoritesRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "details/:bookId", element: <BookDetailPage /> },
      { path: "cart", element: <ShoppingCartPage /> },
      { path: "orders", element: <OrdersRoute /> },
      { path: "orderDetails", element: <PlaceOrderDetailsPage /> },
      { path: "updateOrder/:orderId", element: <UpdateOrderPage /> },
      { path: "logIn", element: <LoginRoute /> },
      { path: "register", element: <RegisterRoute /> },
      { path: "favoriteList", element: <FavoritesRoute /> },
    ],
  },
]);

export default routes;
