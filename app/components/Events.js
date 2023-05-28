// "use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import getevents from "../actions/getevents";
import styles from "./styles/Events.module.scss";

export default async function Events() {
  const events = await getevents();
  let trends = events.filter((item) => item.trend);

  return (
    <section className={styles.events}>
      {trends.map((item) => (
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
      ))}
    </section>
  );
}
