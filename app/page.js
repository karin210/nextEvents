// css
import styles from "./styles/page.module.scss";
// system tools
import Image from "next/image";
// react components
import Events from "./components/events/Events";
import Controls from "./components/Controls";

export default function Home() {
  return (
    <main className={styles.main}>
      <Controls />
      <h1 className={styles.title}>Trending</h1>
      <Events />
    </main>
  );
}
