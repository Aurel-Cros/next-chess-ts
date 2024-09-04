import type { BoardContextType, BoardPositionsType } from "@/types/ChessTypes.d.ts";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "@/components/Piece.ts";

export default function newBoardPositions(playerIsWhite: boolean = true): BoardPositionsType {
    const board: BoardPositionsType = {
        row: [
            {
                column: [
                    new Rook(false),
                    new Knight(false),
                    new Bishop(false),
                    new Queen(false),
                    new King(false),
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
            {
                column: [
                    '', '', '', '', '', '', '', ''
                ]
            },
            {
                column: [
                    '', '', '', '', '', '', '', ''
                ]
            },
            {
                column: [
                    '', '', '', '', '', '', '', ''
                ]
            },
            {
                column: [
                    '', '', '', '', '', '', '', ''
                ]
            },
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
                    new Queen(true),
                    new King(true),
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