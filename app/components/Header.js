// css
import styles from "./styles/Header.module.scss";
// system tools
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className={styles.header}>
      <section>
        <Link href="/" className={styles.home}>
          HotEvents
        </Link>
      </section>
      <section>
        <Link href="/events">All Events</Link>
        <span></span>
      </section>
    </header>
  );
}
