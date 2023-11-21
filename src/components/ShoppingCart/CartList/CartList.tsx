import { Link } from "react-router-dom";
import { useShoppingCartContext } from "../../../context/ShoppingCartContext";
import CartBookItem from "../CartBookItem/CartBookItem";
import styles from "./CartList.module.scss";

const CartBookList = () => {
  const { cart, totalPrice } = useShoppingCartContext();

  return (
    <>
      {cart.length === 0 ? (
        <div className={styles[`empty-cart`]}>
          <p className={styles[`empty-cart-message`]}>Your Cart is empty! 🛒</p>
          <Link to={"/"}>
            <button className={styles[`cart-button-bright`]}>
              View the products
            </button>
          </Link>
        </div>
      ) : (
        <div className={styles.cart}>
          <ul>
            <h2 className={styles[`cart-title`]}>Your Products</h2>
            {cart.map((book) => (
              <li key={book.id}>
                <CartBookItem
                  title={book.title}
                  author={book.author}
                  price={book.price * book.quantity}
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
          <p className={styles[`cart-total-price`]}>
            Total: <span> ${totalPrice} </span>
          </p>
          <div className={styles[`cart-actions`]}>
            <Link to={"/"}>
              <button className={styles[`cart-button-bright`]}>
                Continue Shopping
              </button>
            </Link>
            <Link to={"/orderDetails"}>
              <button className={styles[`cart-button-black`]}>
                Place Order
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartBookList;
