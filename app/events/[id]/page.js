"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./Event.module.scss";

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
    console.log(input);
    const res = fetch("http://localhost:3000/api/assistants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
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
        "https://next-events-hyppouicf-karin210.vercel.app/api/events"
      );
      const allEvents = await res.json();

      const data = allEvents.find((item) => item.id === id);
      setEvent(data);
    }
    getData();
  }, []);

  return (
    <main>
      <figure>
        <img src={event.image} width={500} height={300} alt={event.title} />
      </figure>
      <section>
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <form onSubmit={handleSubmit} className="email-registration">
          <label>Get registered for this event!</label>
          <input
            type="email"
            id="email"
            placeholder="Please insert your email here"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
      </section>
    </main>
  );
}
