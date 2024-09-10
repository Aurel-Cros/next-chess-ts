import type { BoardPositionsType } from "@/types/ChessTypes.d.ts";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "@/components/PieceClasses.ts";

export default function newBoardPositions(playerIsWhite: boolean = true): BoardPositionsType {
    const board: BoardPositionsType = {
        rows: [
            {
                columns: [
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
                columns: [
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
                columns: [
                    null, null, null, null, null, null, null, null
                ]
            },
            {
                columns: [
                    null, null, null, null, null, null, null, null
                ]
            },
            {
                columns: [
                    null, null, null, null, null, null, null, null
                ]
            },
            {
                columns: [
                    null, null, null, null, null, null, null, null
                ]
            },
            {
                columns: [
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
                columns: [
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
        board.rows.reverse();

    return board;
}