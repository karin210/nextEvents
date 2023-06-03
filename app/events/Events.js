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
    async function getData() {
      // https://next-events-hyppouicf-karin210.vercel.app/api/events
      const res = await fetch("http://localhost:3000/api/events");
      const allEvents = await res.json();

      if (
        (city !== "All" || city !== "") &&
        (month !== "All" || month !== "" || month !== "undefined")
      ) {
        const events = allEvents.filter(
          (event) => event.city === city && event.date.month.includes(month)
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
        const events = allEvents.filter((event) =>
          event.date.month.includes(month)
        );
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

  const date = new Date().toDateString();

  return (
    <main className={styles.main}>
      <h1>Events</h1>
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
            finished={date > item.date.finish}
          />
        ))}
      </section>
    </main>
  );
}
