import Image from "next/image";
import styles from "./page.module.css";
import getevents from "./actions/getevents";

async function getData() {
  let url;
  if (process.env.NODE_ENV === "production") {
    url = "next-events-6wo5atoj2-karin210.vercel.app";
  } else {
    url = "http://localhost:3000";
  }
  // const res = await fetch(`/api/events`);

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  // return res.json();
}

export default async function Home() {
  // const data = await getData();
  const events = await getevents();
  return (
    <main>
      <h1>hello</h1>
      <article>
        {events.map((item) => (
          <>
            <h2>{item.id}</h2>
            <img className={styles.img} src={item.image} alt={item.id} />
          </>
        ))}
      </article>
    </main>
  );
}
