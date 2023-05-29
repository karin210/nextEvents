"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import styles from "./styles/Events.module.scss";

export default async function Events() {
  const allEvents = await fetch(
    "https://next-events-md9uta47a-karin210.vercel.app/api/events"
  );
  const res = await allEvents.json();
  // let events = events.filter((item) => filter);
  //   const query = new URLSearchParams()

  return (
    <section className={styles.events}>
      <h1>{res[0].id}</h1>
      {/* {events.map((item) => (
        <article className={styles.item} key={item.id}>
          <figure className={styles.fig}>
            <img src={item.image} alt={item.id} />
          </figure>
          <h2>{item.title}</h2>
          <ul className={styles.itemDetails}>
            <li>{item.city}</li>
            <li className={styles.rateBar}>
              <label for="popularity">Popularity</label>

              <progress
                id="popularity"
                max="5"
                value={item.popularity}
              ></progress>
            </li>
          </ul>
        </article>
      ))} */}
    </section>
  );
}
