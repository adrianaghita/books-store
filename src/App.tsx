import "./App.css";
import { RouterProvider } from "react-router-dom";
import { BookProvider } from "./context/BooksContext";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import routes from "./routes/Routes";
import { LoggedInProvider } from "./context/LoggedInContext";
import { OrdersProvider } from "./context/OrdersContext";
import { FavoritesBooksProvider } from "./context/FavoritesBooksContex";

function App() {
  return (
    <>
      <LoggedInProvider>
        <OrdersProvider>
          <BookProvider>
            <FavoritesBooksProvider>
              <ShoppingCartProvider>
                <RouterProvider router={routes}></RouterProvider>
              </ShoppingCartProvider>
            </FavoritesBooksProvider>
          </BookProvider>
        </OrdersProvider>
      </LoggedInProvider>
    </>
  );
}

export default App;
