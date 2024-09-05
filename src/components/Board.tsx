'use client';
import { BoardStateContext } from "@/context/BoardState";
import type { BoardContextType, PieceType } from "@/types/ChessTypes.d.ts";
import { useContext } from "react";
import styles from "./Board.module.css";
import { dispatch } from "@/context/EventsHandler.ts";

export default function Board() {
    const boardState: BoardContextType = useContext(BoardStateContext);

    const caseColour: Function = (i: number, j: number): boolean => {
        return (i + j) % 2 > 0;
    };

    const handleNextPlayer = () => {
        dispatch('update-state', { player: !boardState.player });
    };

    return (
        <>
            <div className={styles.board}>
                {boardState.positions.rows.map((row: {
                    columns: Array<PieceType>;
                }, i) => {
                    return <div key={"row" + i} className={styles.row}>
                        {row.columns.map((piece: PieceType, j) => {

                            const caseCol = caseColour(i, j) ? styles.black : styles.white;

                            return <p key={"col" + j} className={`${styles.item} ${caseCol}`}>{piece.name ?? " "}</p>;
                        })}
                    </div>;
                })}
            </div>
            <p>It is {boardState.player ? 'white' : 'black'}'s turn to play.</p>
            <p><button onClick={handleNextPlayer}>Next player</button></p>
        </>);
}
