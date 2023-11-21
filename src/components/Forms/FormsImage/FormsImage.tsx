import Image from "../../../assets/OrderDetailsImage/OrderDetails.jpg";
import styles from "./FormsImage.module.scss";

const FormsImage = () => {
  return (
    <figure className={styles[`forms-image`]}>
      <img src={Image} />
    </figure>
  );
};

export default FormsImage;
