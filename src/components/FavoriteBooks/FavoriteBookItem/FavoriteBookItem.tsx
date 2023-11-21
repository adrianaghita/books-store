import { Book } from "../../../context/BooksContext";
import styles from "./FavoriteBookItem.module.scss";
import { useFavoritesBooksContext } from "../../../context/FavoritesBooksContex";
import { AiFillHeart } from "react-icons/ai";

const FavoriteList = ({
  image,
  title,
  author,
  price,
  id,
  isFavorite,
  isNew,
  quantity,
}: Book) => {
  const { removeFromFavoriteList } = useFavoritesBooksContext();

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
    <article className={styles[`favorite-book`]} key={id}>
      <img
        src={image}
        alt="Book Cover"
        className={styles[`favorite-book-image`]}
      ></img>
      <div>
        <h2 className={styles[`favorite-book-title`]}>{title}</h2>
        <p className={styles[`favroite-book-author`]}> {author} </p>
      </div>
      <div className={styles[`favorite-book-price-container`]}>
        <p className={styles[`favorite-book-price`]}> {`$ ${price}`}</p>
        <button
          className={styles[`favorite-book-action`]}
          onClick={() => removeFromFavoriteList(book)}
        >
          <AiFillHeart className={styles[`favorite-book-action-icon`]} />
        </button>
      </div>
    </article>
  );
};

export default FavoriteList;
