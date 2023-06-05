"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import styles from "./styles/Events.module.scss";

export default function Events() {
  const [events, setEvents] = useState([]);

  // "https://next-events-hyppouicf-karin210.vercel.app/api/events"
  useEffect(() => {
    async function getData() {
      const res = await fetch(
        "https://next-events-pi-sandy.vercel.app/api/events"
      );
      const allEvents = await res.json();
      const trends = allEvents.filter((event) => event.trend);
      setEvents(trends);
    }
    getData();
  }, []);

  return (
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
  );
}
