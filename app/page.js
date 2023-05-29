import Image from "next/image";
import styles from "./styles/page.module.scss";
import Controls from "./components/Controls";
import Main from "./components/main/Main";
import Events from "./components/Events";

export default function Home() {
  return (
    <main className={styles.main}>
      <Controls />
      <h1 className={styles.title}>Trending events</h1>
      <Main>
        <Events />
      </Main>
    </main>
  );
}
