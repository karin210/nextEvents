"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Controls from "../components/Controls";
import styles from "./styles/Events.module.scss";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [anyEvents, setAnyEvents] = useState(1);
  const searchParams = useSearchParams();
  let city = searchParams.get("city");
  let month = searchParams.get("month");

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        "https://next-events-hyppouicf-karin210.vercel.app/api/events"
      );
      const allEvents = await res.json();

      if (
        (city !== "All" || city !== "") &&
        (month !== "All" || month !== "" || month !== "undefined")
      ) {
        const events = allEvents.filter(
          (event) => event.city === city && event.Date.month === month
        );
        setEvents(events);
      }
      if (
        (city !== "All" || city !== "") &&
        (month === "All" || month === "" || month === "undefined")
      ) {
        const events1 = allEvents.filter((event) => event.city === city);
        setEvents(events1);
      }
      if (
        (month !== "All" || month !== "" || month !== "undefined") &&
        (city === "All" || city === "")
      ) {
        const events = allEvents.filter((event) => event.Date.month === month);
        setEvents(events);
      }
      if (
        (city === "All" || city === "") &&
        (month === "All" || month === "" || month === "undefined")
      ) {
        setEvents(allEvents);
      }
      if (city === null && month === null) {
        setEvents(allEvents);
      }
    }
    getData();
  }, [city, events.length, month]);

  useEffect(() => {
    if (events.length < 1) {
      setAnyEvents(0);
    } else {
      setAnyEvents(1);
    }
  }, [events]);

  return (
    <main className={styles.main}>
      <h1>Events</h1>
      <Controls />
      {anyEvents === 0 && <h2>Sorry, there is no events</h2>}
      <section className={styles.events}>
        {events.map((item) => (
          <Link href={`/events/${item.id}`} key={item.id}>
            <article className={styles.item}>
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
          </Link>
        ))}
      </section>
    </main>
  );
}
