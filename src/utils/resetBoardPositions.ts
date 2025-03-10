import type { AbstractPiece } from "@/classes/Piece/AbstractPiece";
import { Bishop } from "@/classes/Piece/Bishop";
import { King } from "@/classes/Piece/King";
import { Knight } from "@/classes/Piece/Knight";
import { Pawn } from "@/classes/Piece/Pawn";
import { Queen } from "@/classes/Piece/Queen";
import { Rook } from "@/classes/Piece/Rook";
import type { BoardPositionsType } from "@/types/ChessTypes.d.ts";
import { PlayerColour } from "@/types/enums";

export default function newBoardPositions(playerIsWhite: boolean = true): BoardPositionsType {
    const pieces: AbstractPiece[] = [
        new Rook(PlayerColour.Black, { x: 0, y: 0 }),
        new Knight(PlayerColour.Black, { x: 1, y: 0 }),
        new Bishop(PlayerColour.Black, { x: 2, y: 0 }),
        new Queen(PlayerColour.Black, { x: 3, y: 0 }),
        new King(PlayerColour.Black, { x: 4, y: 0 }),
        new Bishop(PlayerColour.Black, { x: 5, y: 0 }),
        new Knight(PlayerColour.Black, { x: 6, y: 0 }),
        new Rook(PlayerColour.Black, { x: 7, y: 0 }),
        new Pawn(PlayerColour.Black, 1, { x: 0, y: 1 }),
        new Pawn(PlayerColour.Black, 1, { x: 1, y: 1 }),
        new Pawn(PlayerColour.Black, 1, { x: 2, y: 1 }),
        new Pawn(PlayerColour.Black, 1, { x: 3, y: 1 }),
        new Pawn(PlayerColour.Black, 1, { x: 4, y: 1 }),
        new Pawn(PlayerColour.Black, 1, { x: 5, y: 1 }),
        new Pawn(PlayerColour.Black, 1, { x: 6, y: 1 }),
        new Pawn(PlayerColour.Black, 1, { x: 7, y: 1 }),
        new Pawn(PlayerColour.White, -1, { x: 0, y: 6 }),
        new Pawn(PlayerColour.White, -1, { x: 1, y: 6 }),
        new Pawn(PlayerColour.White, -1, { x: 2, y: 6 }),
        new Pawn(PlayerColour.White, -1, { x: 3, y: 6 }),
        new Pawn(PlayerColour.White, -1, { x: 4, y: 6 }),
        new Pawn(PlayerColour.White, -1, { x: 7, y: 6 }),
        new Pawn(PlayerColour.White, -1, { x: 5, y: 6 }),
        new Pawn(PlayerColour.White, -1, { x: 6, y: 6 }),
        new Rook(PlayerColour.White, { x: 0, y: 7 }),
        new Knight(PlayerColour.White, { x: 1, y: 7 }),
        new Bishop(PlayerColour.White, { x: 2, y: 7 }),
        new Queen(PlayerColour.White, { x: 3, y: 7 }),
        new King(PlayerColour.White, { x: 4, y: 7 }),
        new Bishop(PlayerColour.White, { x: 5, y: 7 }),
        new Knight(PlayerColour.White, { x: 6, y: 7 }),
        new Rook(PlayerColour.White, { x: 7, y: 7 }),
    ];

    const board: BoardPositionsType = drawBoard(pieces);
    if (!playerIsWhite)
        board.rows.reverse();

    return board;
}

export function drawBoard(pieces: AbstractPiece[]): BoardPositionsType {

    const board: BoardPositionsType = {
        rows: []
    };

    for (let i = 0; i < 8; i++) {
        const columns: Array<AbstractPiece | null> = [];

        for (let j = 0; j < 8; j++) {
            columns.push(pieces.find(piece => piece.coord.x === j && piece.coord.y === i) ?? null);
        }

        board.rows.push({ columns });
    }
    return board;
}