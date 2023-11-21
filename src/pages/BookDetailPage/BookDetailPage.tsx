import { useParams } from "react-router-dom";
import { useBookContext } from "../../context/BooksContext";
import styles from "./BookDetailPage.module.scss";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { useFavoritesBooksContext } from "../../context/FavoritesBooksContex";
import { useLoggedInContext } from "../../context/LoggedInContext";

function BookDetailPage() {
  const { bookId } = useParams<{ bookId?: string }>();
  const { bestBooksData, recentlyAddedBooksData } = useBookContext();
  const { addToCart } = useShoppingCartContext();
  const { addToFavoriteList, isBookInFavorites } = useFavoritesBooksContext();
  const { isLoggedIn } = useLoggedInContext();

  const parsedBookId = bookId ? parseInt(bookId, 10) : undefined;

  const book =
    bestBooksData.find((b) => b.id === parsedBookId) ||
    recentlyAddedBooksData.find((b) => b.id === parsedBookId);

  if (!book) {
    return <h1>Product not found</h1>;
  }

  const handleAddToCartClick = () => {
    addToCart(book);
  };

  return (
    <div className={styles[`book-details`]}>
      <img
        src={`/${book.image}.png`}
        className={styles[`book-details-image`]}
      />
      <div className={styles[`book-details-content`]}>
        <div className={styles[`two-columns-grid`]}>
          <div>
            <h2 className={styles[`book-details-title`]}>{book.title}</h2>
            <h3 className={styles[`book-details-author`]}>
              <span>by </span>
              {book.author}
            </h3>
          </div>
          <div>
            <h3 className={styles[`book-details-price`]}>${book.price}</h3>
          </div>
        </div>
        <p className={styles[`book-details-description`]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae
          turpis massa sed elementum tempus. Pellentesque adipiscing commodo
          elit at imperdiet dui accumsan sit amet. Ridiculus mus mauris vitae
          ultricies. Aenean et tortor at risus. Massa tincidunt nunc pulvinar
          sapien et. Dignissim suspendisse in est ante. Ultricies mi quis
          hendrerit dolor magna eget est. Id aliquet lectus proin nibh nisl.
          Porttitor eget dolor morbi non arcu. Iaculis at erat pellentesque
          adipiscing. Lectus arcu bibendum at varius vel. Nibh praesent
          tristique magna sit amet purus gravida. Sed euismod nisi porta lorem
          mollis aliquam ut.
        </p>
        <div className={styles.actions}>
          <button className={styles.button} onClick={handleAddToCartClick}>
            <AiOutlineShoppingCart className={styles["button-icon"]} />
            Add to cart
          </button>

          {isLoggedIn ? (
            <button
              onClick={() => addToFavoriteList(book)}
              className={styles[`add-to-favorites`]}
            >
              <AiFillHeart
                className={isBookInFavorites(book) ? styles.red : styles.black}
              />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
