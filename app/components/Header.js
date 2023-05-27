import React from "react";
import styles from "./styles/Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.home}>HotEvents</div>
      <section>
        <span></span>
        <span></span>
      </section>
    </header>
  );
}
