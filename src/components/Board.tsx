'use client';
import { BoardStateContext } from "@/context/BoardState";
import type { BoardContextType, BoardPositionsType } from "@/types/ChessTypes.d.ts";
import { PiecesEnum } from "@/types/ChessTypes.js";
import { useContext } from "react";
import { Bishop, Pawn, Rook } from "./Piece.js";

export default function Board() {
    const boardState: BoardContextType = useContext(BoardStateContext);

    return (
        <div>
            <div> This is a chess board, right ?.</div>
            <p>It is {boardState.player ? 'white' : 'false'}'s turn to play.</p>
        </div>);
}

export function newBoardPositions(playerIsWhite: boolean = true): BoardPositionsType {
    const board: BoardPositionsType = {
        row: [
            {
                column: [
                    new Rook(false),
                    PiecesEnum.BlackKnight,
                    new Bishop(false),
                    PiecesEnum.BlackKing,
                    PiecesEnum.BlackQueen,
                    new Bishop(false),
                    PiecesEnum.BlackKnight,
                    new Rook(false),
                ]
            },
            {
                column: [
                    new Pawn(false),
                    new Pawn(false),
                    new Pawn(false),
                    new Pawn(false),
                    new Pawn(false),
                    new Pawn(false),
                    new Pawn(false),
                    new Pawn(false)
                ]
            },
            { column: [] },
            { column: [] },
            { column: [] },
            { column: [] },
            {
                column: [
                    new Pawn(true),
                    new Pawn(true),
                    new Pawn(true),
                    new Pawn(true),
                    new Pawn(true),
                    new Pawn(true),
                    new Pawn(true),
                    new Pawn(true)
                ]
            },
            {
                column: [
                    new Rook(true),
                    PiecesEnum.WhiteKnight,
                    new Bishop(true),
                    PiecesEnum.WhiteKing,
                    PiecesEnum.WhiteQueen,
                    new Bishop(true),
                    PiecesEnum.WhiteKnight,
                    new Rook(true),
                ]
            },
        ]
    };
    return board;
}