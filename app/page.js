import Image from "next/image";
import styles from "./styles/page.module.scss";
import Controls from "./components/Controls";
import Events from "./components/events/Events";

export default function Home() {
  return (
    <main className={styles.main}>
      <Controls />
      <h1 className={styles.title}>Trending</h1>
      <Events />
    </main>
  );
}
