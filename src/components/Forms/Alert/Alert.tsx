import { Link } from "react-router-dom";
import styles from "./Alert.module.scss";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { OrderDetails, useOrdersContext } from "../../../context/OrdersContext";

interface alertProps {
  title: string;
  message: string;
  updatedDetails: OrderDetails;
}

const Alert = ({ message, title, updatedDetails }: alertProps) => {
  const { updateOrder } = useOrdersContext();

  return (
    <div className={styles.alert}>
      <div className={styles[`alert-box`]}>
        <div className={styles[`alert-content`]}>
          <h3 className={styles[`alert-title`]}>
            <AiOutlineExclamationCircle className={styles[`alert-icon`]} />
            {title}
          </h3>
          <p className={styles[`alert-message`]}>{message}</p>
        </div>
        <div className={styles[`alert-buttons`]}>
          <Link to={"/orders"}>
            <button className={styles[`alert-cancel-button`]}>Cancel</button>
          </Link>
          <Link to={"/orders"}>
            <button
              className={styles[`alert-confirm-button`]}
              onClick={() => updateOrder(updatedDetails)}
            >
              Confirm
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Alert;
