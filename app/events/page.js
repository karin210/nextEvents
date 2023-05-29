"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Controls from "../components/Controls";
import styles from "./styles/Events.module.scss";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [test, setTest] = useState(0);
  const searchParams = useSearchParams();
  let city = searchParams.get("city");

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        "https://next-events-hyppouicf-karin210.vercel.app/api/events"
      );
      const allEvents = await res.json();
      const events = allEvents.filter((event) => event.city === city);
      if (events.length === 0) {
        setEvents(allEvents);
      } else {
        setEvents(events);
      }
    }
    getData();
  }, [city]);

  return (
    <div>
      <Controls />
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
    </div>
  );
}
