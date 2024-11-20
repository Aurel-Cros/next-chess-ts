'use client'
import Menu from "@/components/Menu/Menu";
import styles from "./page.module.css";
import Board from "@/components/Board/Board";

export default function Home() {
  return (
    <main className={styles.main}>
      <Board></Board>
      <Menu></Menu>
    </main>
  );
}
