'use client';
import { BoardStateContext } from "@/context/BoardState";
import type { BoardContextType, Coordinates, MoveType, PieceType } from "@/types/ChessTypes.d.ts";
import { useContext, useState } from "react";
import styles from "./Board.module.css";
import Piece from "@/components/Piece/Piece.tsx";
import { dispatch } from "@/context/EventsObserver.ts";

export default function Board() {
    const boardState: BoardContextType = useContext(BoardStateContext);
    const [highlightCases, setHighlightCases] = useState([] as Coordinates[]);
    const [selectedPiece, setSelectedPiece] = useState(null as (PieceType | null));

    const caseColour: Function = (i: number, j: number): boolean => {
        return (i + j) % 2 > 0;
    };

    const handlePieceSelect = (piece: PieceType | null) => {
        if (piece === null) {
            setHighlightCases([]);
            setSelectedPiece(null);
            return;
        }
        const possibleMoves = piece.getPossibleMoves();
        setHighlightCases(possibleMoves);
        setSelectedPiece(piece);
    };

    return (
        <>
            <div className={styles.board}>
                {boardState.positions.rows.map((row: {
                    columns: Array<PieceType | null>;
                }, i) => {
                    return <div key={"row" + i} className={styles.row}>
                        {row.columns.map((piece: PieceType | null, j) => {

                            const caseCol = caseColour(i, j) ? styles.black : styles.white;
                            const isHighlighted = highlightCases.find(c => (c.x === j && c.y === i)) ? styles.highlight : '';

                            return (
                                <p
                                    onClick={() => {
                                        if (isHighlighted) {
                                            selectedPiece?.move({ x: j - selectedPiece.coord.x, y: i - selectedPiece.coord.y }) &&
                                                dispatch('refresh-board', {});
                                        }

                                        handlePieceSelect(piece ?? null);
                                    }}
                                    key={"col" + j}
                                    className={`${styles.item} ${caseCol} ${isHighlighted}`}>
                                    {piece ? <Piece p={piece} /> : " "}
                                </p>
                            );
                        })}
                    </div>;
                })}
            </div>
            <p>It is {boardState.player ? 'white' : 'black'}'s turn to play.</p>
        </>);
}
