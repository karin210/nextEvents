import Image from "next/image";
import styles from "./page.module.css";

async function getData() {
  const res = await fetch(
    "next-events-dcmwtrfmf-karin210.vercel.app/api/events/"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <main>
      <article>
        {data.map((item) => (
          <>
            <h2>{item.id}</h2>
            <img className={styles.img} src={item.image} alt={item.id} />
          </>
        ))}
      </article>
    </main>
  );
}
