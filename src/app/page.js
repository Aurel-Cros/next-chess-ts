'use client'
import Menu from "@/components/Menu/Menu";
import styles from "./page.module.css";
import Board from "@/components/Board/Board";
import GameStatusModal from "@/components/GameStatusModal/GameStatusModal";

export default function Home() {
  return (
    <main className={styles.main}>
      <GameStatusModal>
        <Board></Board>
      </GameStatusModal>
      <Menu></Menu>
    </main>
  );
}
