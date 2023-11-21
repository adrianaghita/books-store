import { Book } from "../context/BooksContext";

export async function fetchBestBooks() {
  const response = await fetch(
    "https://raw.githubusercontent.com/adrianaghita/books/main/booksDataBase"
  );
  if (!response.ok) {
    throw new Error("Could not fetch book detail");
  }
  const data: Book[] = await response.json();
  const filteredBestBooks = data.filter((book) => book.isFavorite);

  return filteredBestBooks;
}

export async function fetchRecentlyAddedBooksData() {
  const response = await fetch(
    "https://raw.githubusercontent.com/adrianaghita/books/main/booksDataBase"
  );
  if (!response.ok) {
    throw new Error("Could not fetch book detail");
  }
  const data: Book[] = await response.json();
  const filteredRecentBooks = data.filter((book) => book.isNew);

  return filteredRecentBooks;
}
