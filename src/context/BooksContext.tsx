import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import {
  fetchBestBooks,
  fetchRecentlyAddedBooksData,
} from "../services/BooksService";

export interface Book {
  id: number;
  author: string;
  title: string;
  price: number;
  image: string;
  isFavorite: boolean;
  isNew: boolean;
  quantity: number;
}

interface BookContextType {
  bestBooksData: Book[];
  recentlyAddedBooksData: Book[];
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("use BookContext must be used within a BookProvider");
  }
  return context;
};

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bestBooksData, setBestBooksData] = useState<Book[]>([]);
  const [recentlyAddedBooksData, setRecentlyAddedBooksData] = useState<Book[]>(
    []
  );

  useEffect(() => {
    const fetchBestData = async () => {
      const bestBookList = await fetchBestBooks();
      setBestBooksData(bestBookList);
    };

    const fetchRecentData = async () => {
      const recentBookList = await fetchRecentlyAddedBooksData();
      setRecentlyAddedBooksData(recentBookList);
    };
    fetchBestData();
    fetchRecentData();
  }, []);

  return (
    <BookContext.Provider value={{ bestBooksData, recentlyAddedBooksData }}>
      {children}
    </BookContext.Provider>
  );
};
