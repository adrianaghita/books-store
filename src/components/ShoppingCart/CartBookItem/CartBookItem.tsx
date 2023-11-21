import { GoTrash } from "react-icons/go";
import styles from "./CartBookItem.module.scss";
import { useShoppingCartContext } from "../../../context/ShoppingCartContext";
import { Book } from "../../../context/BooksContext";

const CartBookItem = ({
  image,
  title,
  author,
  price,
  id,
  isFavorite,
  isNew,
  quantity,
}: Book) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useShoppingCartContext();

  const cartBook: Book = {
    id,
    title,
    author,
    image,
    price,
    isFavorite,
    isNew,
    quantity,
  };

  return (
    <article className={styles[`cart-item`]} key={id}>
      <img src={image} className={styles[`cart-item-image`]} />
      <div>
        <h2 className={styles[`cart-item-title`]}>{title}</h2>
        <p className={styles[`cart-item-author`]}>
          <span> by </span> {author}
        </p>
      </div>
      <div className={styles[`cart-item-price-container`]}>
        <p className={styles[`cart-item-price`]}>{`$${price}`}</p>
        <button
          className={styles[`cart-item-action`]}
          onClick={() => removeFromCart(cartBook)}
        >
          <GoTrash className={styles[`cart-item-action-icon`]} />
          Remove
        </button>
        <div className={styles.quantity}>
          <button
            disabled={quantity <= 1}
            onClick={() => decreaseQuantity(cartBook)}
          >
            -
          </button>
          <p>{quantity} </p>
          <button onClick={() => increaseQuantity(cartBook)}> + </button>{" "}
        </div>
      </div>
    </article>
  );
};

export default CartBookItem;
