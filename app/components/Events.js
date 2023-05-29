"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./styles/Events.module.scss";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        "https://next-events-hyppouicf-karin210.vercel.app/api/events"
      );
      const allEvents = await res.json();
      const trends = allEvents.filter((event) => event.trend);
      setEvents(trends);
    }
    getData();
  }, []);

  return (
    // <h1>Events</h1>
    <section className={styles.events}>
      {events.map((item) => (
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
