'use client'
import styles from "./page.module.css";
import Board from "@/components/Board";

export default function Home() {
  return (
    <main className={styles.main}>
      <Board></Board>
    </main>
  );
}
