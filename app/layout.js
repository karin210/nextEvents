import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import styles from "./styles/Layout.module.scss";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HotEvents",
  description: "Get registered to the main events in the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
