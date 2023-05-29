import Link from "next/link";
import React from "react";
import styles from "./styles/Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <section>
        <Link href="/" className={styles.home}>
          HotEvents
        </Link>
      </section>
      <section>
        <Link href="/events">Events</Link>
        <span></span>
      </section>
    </header>
  );
}
