'use client';
import { BoardStateContext } from "@/context/BoardState";
import type { BoardContextType, BoardPositionsType } from "@/types/ChessTypes.d.ts";
import { useContext } from "react";
import styles from "./Board.module.css";

export default function Board() {
    const boardState: BoardContextType = useContext(BoardStateContext);

    const caseColour = (i: number, j: number) => {
        return (i + j) % 2 > 0;
    };

    return (
        <>
            <div className={styles.board}>
                {boardState.positions.row.map((r, i) => {
                    return <div key={"row" + i} className={styles.row}>
                        {r.column.map((col, j) => {
                            const caseCol = caseColour(i, j) ? styles.black : styles.white;
                            return <div key={"col" + j} className={`${styles.item} ${caseCol}`}>{col.name ?? " "}</div>;
                        })}
                    </div>;
                })}
            </div>
            <p>It is {boardState.player ? 'white' : 'false'}'s turn to play.</p>
        </>);
}
