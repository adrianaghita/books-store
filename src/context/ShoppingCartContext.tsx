import { ReactNode, createContext, useContext, useState } from "react";
import { Book } from "./BooksContext";

interface ShoppingCartContextType {
  cart: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (book: Book) => void;
  emptyCart: () => void;
  itemsCounter: number;
  totalPrice: number;
  increaseQuantity: (book: Book) => void;
  decreaseQuantity: (book: Book) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined
);

export const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw new Error(
      "useShoppingCartContext must be used within a ShoppingCartProvider"
    );
  }

  return context;
};

export const ShoppingCartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Book[]>([]);

  const addToCart = (cartBook: Book) => {
    const existingBook = cart.find((item) => item.id === cartBook.id);

    if (existingBook) {
      const cartCopy = [...cart];
      const bookIndex = cart.findIndex((item) => item.id === cartBook.id);
      cartCopy[bookIndex].quantity = cartCopy[bookIndex].quantity + 1;
      setCart(cartCopy);
    } else {
      cartBook.quantity = 1;
      setCart((prevCart) => [...prevCart, cartBook]);
    }
  };

  const removeFromCart = (cartBook: Book) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartBook.id));
  };

  const emptyCart = () => {
    setCart([]);
  };

  const decreaseQuantity = (cartBook: Book) => {
    cartBook.quantity = cartBook.quantity - 1;
    updateCartList(cartBook);
  };

  const increaseQuantity = (cartBook: Book) => {
    cartBook.quantity = cartBook.quantity + 1;
    updateCartList(cartBook);
  };

  const updateCartList = (cartBook: Book) => {
    const cartCopy = [...cart];
    const bookIndex = cart.findIndex((item) => item.id === cartBook.id);
    cartCopy[bookIndex].quantity = cartBook.quantity;
    setCart(cartCopy);
  };

  const totalPrice = cart.reduce(
    (accumulator, cartBook) => accumulator + cartBook.price * cartBook.quantity,
    0
  );

  const itemsCounter = cart.reduce(
    (accumulator, cartBook) => accumulator + cartBook.quantity,
    0
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        emptyCart,
        itemsCounter,
        totalPrice,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
