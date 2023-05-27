import Image from "next/image";
import styles from "./page.module.css";
import getevents from "./actions/getevents";

export default async function Home() {
  const events = await getevents();
  return (
    <main>
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
