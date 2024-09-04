'use client';
import { BoardStateContext } from "@/context/BoardState";
import type { BoardContextType, BoardPositionsType } from "@/types/ChessTypes.d.ts";
import { PiecesEnum } from "@/types/ChessTypes.js";
import { useContext } from "react";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./Piece.js";

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
                    new Knight(false),
                    new Bishop(false),
                    new King(false),
                    new Queen(false),
                    new Bishop(false),
                    new Knight(false),
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
                    new Knight(true),
                    new Bishop(true),
                    new King(true),
                    new Queen(true),
                    new Bishop(true),
                    new Knight(true),
                    new Rook(true),
                ]
            },
        ]
    };
    if (!playerIsWhite)
        board.row.reverse();

    return board;
}