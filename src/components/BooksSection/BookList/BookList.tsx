import { useBookContext } from "../../../context/BooksContext";
import BookCard from "../BookCard/BookCard";
import styles from "./BookList.module.scss";

const BookList = () => {
  const { bestBooksData, recentlyAddedBooksData } = useBookContext();

  return (
    <section className={styles[`books-section`]}>
      <h2 className={styles[`books-section-title`]}>Best books of the month</h2>
      <div>
        <ul className={styles[`book-list`]}>
          {bestBooksData.map((bestBook) => (
            <li key={bestBook.id}>
              <BookCard
                title={bestBook.title}
                author={bestBook.author}
                image={`/${bestBook.image}.png`}
                price={bestBook.price}
                id={bestBook.id}
                key={bestBook.id}
                isFavorite
                isNew
                quantity={bestBook.quantity}
              />
            </li>
          ))}
        </ul>
      </div>
      <h2 className={styles[`books-section-title`]}>Recently added</h2>
      <ul className={styles[`book-list`]}>
        {recentlyAddedBooksData.map((recentBook) => (
          <li key={recentBook.id}>
            <BookCard
              title={recentBook.title}
              author={recentBook.author}
              image={`/${recentBook.image}.png`}
              price={recentBook.price}
              id={recentBook.id}
              key={recentBook.id}
              isFavorite
              isNew
              quantity={recentBook.quantity}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BookList;
