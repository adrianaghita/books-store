import styles from "./CarouselSection.module.scss";
import CarouselItem from "../CarouselItem/CarouselItem";

const CarouselSection = () => {
  return (
    <section className={styles.carousel}>
      <div className={styles[`carousel-content`]}>
        <h1 className={styles[`carousel-title`]}>
          Buy textbooks <span>for the best price</span>
        </h1>

        <p className={styles[`carousel-text`]}>
          From applied literature to educational resources, we have a lot of
          <span> textbooks to offer you. We sell only the best books.</span>
        </p>
      </div>
      <div>
        <CarouselItem />
      </div>
    </section>
  );
};

export default CarouselSection;
