"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./Event.module.scss";
import dateIcon from "../../../public/date-range-svgrepo-com.svg";
import locationIcon from "../../../public/location-pin-svgrepo-com.svg";
import star from "../../../public/star-svgrepo-com.svg";
import redirectIcon from "../../../public/redirect-svgrepo-com.svg";
import Link from "next/link";
import okIcon from "../../../public/ok-svgrepo-com.svg";
import warningIcon from "../../../public/error-svgrepo-com.svg";

export default function Page() {
  const [message, setMessage] = useState("");
  const [event, setEvent] = useState({});
  const [input, setInput] = useState({ email: "" });
  const path = useParams();
  const id = path.id;

  function handleChange(e) {
    setInput({ email: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const res = fetch(
      "https://next-events-karin210.vercel.app/api/assistants",
      {
        method: "POST",
        body: JSON.stringify(input),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        "https://next-events-pi-sandy.vercel.app/api/events"
      );
      const allEvents = await res.json();

      const data = allEvents.find((item) => item.id === id);
      setEvent(data);
    }
    getData();
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{event.title}</h1>
      <section className={styles.row1}>
        <figure className={styles.fig}>
          <Image
            className={styles.img}
            src={event.image}
            width={800}
            height={800}
            alt={event.title}
          />
        </figure>
        <ul className={styles.infoList}>
          <li className={styles.infoEven}>
            <Image
              className={styles.icon}
              alt="Date icon"
              width={200}
              height={200}
              src={dateIcon}
            />
            <div>
              <span>
                {event.date?.lapse}, {event.date?.year}
              </span>
            </div>
          </li>
          <li className={styles.infoEven}>
            <Image
              className={styles.icon}
              alt="Location icon"
              width={200}
              height={200}
              src={locationIcon}
            />
            <span>
              {event.city}, {event.country}
            </span>
          </li>
          <li className={styles.infoPair}>
            <span>Topic: {event.topic}</span>
            <div className={styles.infoPair}>
              <Image
                className={styles.icon}
                alt="Location icon"
                width={200}
                height={200}
                src={star}
              />
              {event.popularity}
            </div>
          </li>
          <li className={styles.infoEven}>
            <Image
              className={styles.icon}
              alt="Date icon"
              width={200}
              height={200}
              src={redirectIcon}
            />
            <span>Website:</span>
            {event.website && (
              <Link href={event?.website}>{event.website}</Link>
            )}
          </li>
        </ul>
      </section>
      <p className={styles.description}>{event.description}</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Get registered for this event!</label>
        <input
          type="email"
          id="email"
          placeholder="Please enter your email here"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {message &&
        (message === "Successful registration. Enjoy your event!" ? (
          <div className={styles.formResponse}>
            <Image
              className={styles.registrationIcon}
              alt="OK sign"
              width={300}
              height={300}
              src={okIcon}
            />
            <span className={styles.registeredText}>{message}</span>
          </div>
        ) : (
          <div className={styles.formResponse}>
            <Image
              className={styles.registrationIcon}
              alt="Warning sign"
              width={300}
              height={300}
              src={warningIcon}
            />
            <span className={styles.emailExistText}>{message}</span>
          </div>
        ))}
    </main>
  );
}
