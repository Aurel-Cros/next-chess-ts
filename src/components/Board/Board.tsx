'use client';
import { BoardStateContext } from "@/context/BoardState";
import type { BoardContextType, Coordinates } from "@/types/ChessTypes.d.ts";
import { useContext, useState } from "react";
import styles from "./Board.module.css";
import Piece from "@/components/Piece/Piece.tsx";
import { dispatch } from "@/context/EventObserver";
import type { AbstractPiece } from "../../classes/Piece/AbstractPiece";
import { PiecesEnum, PlayerColour } from "@/types/enums";
import { BoardManager } from "@/classes/Board/BoardManager";

export default function Board() {
    const boardState = useContext<BoardContextType>(BoardStateContext);
    const [highlightCases, setHighlightCases] = useState<Coordinates[]>([]);
    const [selectedPiece, setSelectedPiece] = useState<AbstractPiece | null>(null);

    const caseColour: Function = (i: number, j: number): boolean => {
        return (i + j) % 2 > 0;
    };

    const handlePieceSelect = (piece: AbstractPiece | null) => {
        if (piece === null) {
            setHighlightCases([]);
            setSelectedPiece(null);
            return;
        }

        if (boardState.player !== piece.colour)
            return;

        const possibleMoves = piece.getPossibleMoves(boardState.positions);
        setHighlightCases(possibleMoves);
        setSelectedPiece(piece);
    };

    return (
        <>
            <div className={styles.board}>
                {boardState.positions.rows.map((row: {
                    columns: Array<AbstractPiece | null>;
                }, i) => {
                    return <div key={"row" + i} className={styles.row}>
                        {row.columns.map((piece: AbstractPiece | null, j) => {

                            const caseCol = caseColour(i, j) ? styles.black : styles.white;
                            const isHighlighted = highlightCases.find(c => (c.x === j && c.y === i)) ? styles.highlight : '';
                            const isInCheck =
                                ((piece?.type === PiecesEnum.BlackKing && BoardManager.isInCheck(PlayerColour.Black, boardState.positions))
                                    || (piece?.type === PiecesEnum.WhiteKing && BoardManager.isInCheck(PlayerColour.White, boardState.positions))) ?
                                    styles.inCheck : '';

                            return (
                                <p
                                    onClick={() => {
                                        if (isHighlighted) {
                                            if (!selectedPiece)
                                                throw new Error("Selected piece should not be null if possible moves are highlighted wtf");

                                            const destinationCoord = { x: j - selectedPiece.coord.x, y: i - selectedPiece.coord.y };
                                            if (selectedPiece.move(destinationCoord, boardState.positions)) {
                                                dispatch('refresh-board');
                                                handlePieceSelect(null);
                                            }
                                        }
                                        else
                                            handlePieceSelect(piece ?? null);
                                    }}
                                    key={"col" + j}
                                    className={`${styles.item} ${caseCol} ${isHighlighted} ${isInCheck}`}>
                                    {piece ? <Piece p={piece} /> : " "}
                                </p>
                            );
                        })}
                    </div>;
                })}
            </div>
            <p>It is {boardState.player}'s turn to play.</p>
        </>);
}
