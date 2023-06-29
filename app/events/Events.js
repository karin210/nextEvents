"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Controls from "../components/Controls";
import EventCard from "../components/events/EventCard";
import styles from "./styles/Events.module.scss";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [anyEvents, setAnyEvents] = useState(1);
  const searchParams = useSearchParams();
  let city = searchParams.get("city");
  let month = searchParams.get("month");

  useEffect(() => {
    console.log(0, city, month);
    async function getData() {
      const res = await fetch(
        "https://next-events-pi-sandy.vercel.app/api/events"
      );
      const allEvents = await res.json();
      if (
        (city !== "All" || city !== "City") &&
        (month !== "All" || month !== "Month" || month !== "undefined")
      ) {
        const events = allEvents.filter(
          (event) => event.city === city && event.date.month.includes(month)
        );
        setEvents(events);
      }
      if (
        (city !== "All" || city !== "City") &&
        (month === "All" || month === "Month" || month === "undefined")
      ) {
        const events1 = allEvents.filter((event) => event.city === city);
        setEvents(events1);
      }
      if (
        (month !== "All" || month !== "Month" || month !== "undefined") &&
        (city === "All" || city === "City")
      ) {
        const events = allEvents.filter((event) =>
          event.date.month.includes(month)
        );
        setEvents(events);
      }
      if (
        (city === "All" || city === "City") &&
        (month === "All" || month === "Month" || month === "undefined")
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
      <Controls />
      {anyEvents === 0 && <h2>Sorry, there is no events</h2>}
      <section className={styles.events}>
        {events.map((item) => (
          <EventCard
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            city={item.city}
            country={item.country}
            popularity={item.popularity}
            lapse={item.date.lapse}
            year={item.date.year}
            topic={item.topic}
          />
        ))}
      </section>
    </main>
  );
}
