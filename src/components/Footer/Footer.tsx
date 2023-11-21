import { useState } from "react";
import styles from "./Footer.module.scss";

import { BiSolidChevronUpSquare } from "react-icons/bi";

const Footer = () => {
  const [buttonVisible, setButtonVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setButtonVisible(true);
    } else if (scrolled <= 300) {
      setButtonVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <footer className={styles.footer}>
      <p className={styles[`footer-content`]}>
        ©Copyright
        <a
          href="https://www.itperspectives.ro/"
          className={styles[`footer-link`]}
        >
          IT Perspectives
        </a>
      </p>
      <button
        onClick={scrollToTop}
        className={buttonVisible ? styles.button : styles[`button-invisible`]}
      >
        <BiSolidChevronUpSquare className={styles[`footer-icon`]} />
      </button>
    </footer>
  );
};

export default Footer;
