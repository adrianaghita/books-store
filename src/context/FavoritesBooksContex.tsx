import { ReactNode, createContext, useContext, useState } from "react";
import { Book } from "./BooksContext";

interface FavoriteBooksContextType {
  favoriteList: Book[];
  addToFavoriteList: (book: Book) => void;
  removeFromFavoriteList: (book: Book) => void;
  isBookInFavorites: (book: Book) => boolean;
}

const FavoritesBooksContext = createContext<
  FavoriteBooksContextType | undefined
>(undefined);

export const useFavoritesBooksContext = () => {
  const context = useContext(FavoritesBooksContext);

  if (!context) {
    throw new Error(
      "useFavoritesBooksContext must be used within a FavoritesBooksProvider"
    );
  }

  return context;
};

export const FavoritesBooksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favoriteList, setFavoriteList] = useState<Book[]>([]);

  const addToFavoriteList = (book: Book) => {
    const isBookInFavorites = favoriteList.find((item) => item.id === book.id);

    if (isBookInFavorites) {
      removeFromFavoriteList(book);
    } else {
      setFavoriteList((prevList) => [book, ...prevList]);
    }
  };

  const removeFromFavoriteList = (book: Book) => {
    setFavoriteList((prevList) =>
      prevList.filter((item) => item.id !== book.id)
    );
  };

  const isBookInFavorites = (book: Book) => {
    const isBookInFavorites = favoriteList.find((item) => item.id === book.id);
    if (isBookInFavorites) {
      return true;
    } else return false;
  };

  return (
    <FavoritesBooksContext.Provider
      value={{
        favoriteList,
        addToFavoriteList,
        removeFromFavoriteList,
        isBookInFavorites,
      }}
    >
      {children}
    </FavoritesBooksContext.Provider>
  );
};
