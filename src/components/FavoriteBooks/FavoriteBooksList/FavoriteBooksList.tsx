import { MdHeartBroken } from "react-icons/md";
import { Book } from "../../../context/BooksContext";
import { useFavoritesBooksContext } from "../../../context/FavoritesBooksContex";
import FavoriteBookItem from "../FavoriteBookItem/FavoriteBookItem";
import styles from "./FavoriteBooksList.module.scss";
import { AiFillHeart } from "react-icons/ai";

const FavoriteBooksList = () => {
  const { favoriteList } = useFavoritesBooksContext();

  return (
    <>
      {favoriteList.length === 0 ? (
        <p className={styles[`empty-favorite-list`]}>
          Your Favorite List is empty
          <MdHeartBroken className={styles[`broken-heart`]} />
        </p>
      ) : (
        <div className={styles[`favorite-list`]}>
          <h2 className={styles[`favorite-list-title`]}>
            Favorite List <AiFillHeart className={styles.heart} />
          </h2>
          <ul>
            {favoriteList.map((book: Book) => (
              <li key={book.id}>
                <FavoriteBookItem
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  image={
                    book.image.endsWith("png")
                      ? book.image
                      : `/${book.image}.png`
                  }
                  id={book.id}
                  isFavorite
                  isNew
                  quantity={book.quantity}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FavoriteBooksList;
