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

  useEffect(() => {
    async function getAssistants() {
      const res = await fetch(
        "https://next-events-karin210.vercel.app/api/assistants",
        {
          method: "GET",
        }
      );
      const data = await res.json();
      console.log(data);
    }
    getAssistants();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    const res = fetch(
      "https://next-events-karin210.vercel.app/api/assistants",
      {
        method: "POST",
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        // },
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
