import Link from "next/link";
import React from "react";
import styles from "./styles/Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.home}>
        HotEvents
      </Link>
      <section>
        <span></span>
        <span></span>
      </section>
    </header>
  );
}
