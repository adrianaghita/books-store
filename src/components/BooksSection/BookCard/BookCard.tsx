import { useShoppingCartContext } from "../../../context/ShoppingCartContext";
import styles from "./BookCard.module.scss";
import { AiOutlineShoppingCart, AiFillHeart } from "react-icons/ai";
import { Book } from "../../../context/BooksContext";
import { useFavoritesBooksContext } from "../../../context/FavoritesBooksContex";
import { useLoggedInContext } from "../../../context/LoggedInContext";
import { Link } from "react-router-dom";

const BookCard = ({
  title,
  author,
  image,
  id,
  price,
  isFavorite,
  isNew,
  quantity,
}: Book) => {
  const { addToCart } = useShoppingCartContext();
  const { addToFavoriteList, isBookInFavorites } = useFavoritesBooksContext();
  const { isLoggedIn } = useLoggedInContext();

  const book: Book = {
    id,
    title,
    author,
    price,
    image,
    isFavorite,
    isNew,
    quantity,
  };

  return (
    <div className={styles.card} key={id}>
      <section className={styles[`cover-section`]}>
        {isLoggedIn ? (
          <div className={styles.favorites}>
            <button
              onClick={() => addToFavoriteList(book)}
              className={styles[`add-to-favorites`]}
            >
              <AiFillHeart
                className={isBookInFavorites(book) ? styles.red : styles.black}
              />
            </button>
          </div>
        ) : (
          ""
        )}
        <Link to={`/details/${book.id}`}>
          <img
            src={image}
            className={styles["card-image"]}
            alt="Book cover"
          ></img>
        </Link>
      </section>
      <div className={styles[`two-columns-grid`]}>
        <section>
          <Link to={`/details/${book.id}`}>
            <h3 className={styles["card-title"]}>{title}</h3>{" "}
          </Link>
          <Link to={`/details/${book.id}`}>
            <h4 className={styles["card-author"]}>{author}</h4>{" "}
          </Link>
        </section>
        <section>
          <p className={styles["card-price"]}>{`$${price}`} </p>
        </section>
      </div>
      <section>
        <button className={styles.button} onClick={() => addToCart(book)}>
          <AiOutlineShoppingCart className={styles["button-icon"]} />
          Add to cart
        </button>
      </section>
    </div>
  );
};

export default BookCard;
