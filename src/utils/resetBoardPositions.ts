import type { BoardPositionsType, PieceType } from "@/types/ChessTypes.d.ts";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "@/components/Piece/PieceClasses";

export default function newBoardPositions(playerIsWhite: boolean = true): BoardPositionsType {
    const pieces: PieceType[] = [
        new Rook(false, { x: 0, y: 0 }),
        new Knight(false, { x: 1, y: 0 }),
        new Bishop(false, { x: 2, y: 0 }),
        new Queen(false, { x: 3, y: 0 }),
        new King(false, { x: 4, y: 0 }),
        new Bishop(false, { x: 5, y: 0 }),
        new Knight(false, { x: 6, y: 0 }),
        new Rook(false, { x: 7, y: 0 }),
        new Pawn(false, { x: 0, y: 1 }),
        new Pawn(false, { x: 1, y: 1 }),
        new Pawn(false, { x: 2, y: 1 }),
        new Pawn(false, { x: 3, y: 1 }),
        new Pawn(false, { x: 4, y: 1 }),
        new Pawn(false, { x: 5, y: 1 }),
        new Pawn(false, { x: 6, y: 1 }),
        new Pawn(false, { x: 7, y: 1 }),
        new Pawn(true, { x: 0, y: 6 }),
        new Pawn(true, { x: 1, y: 6 }),
        new Pawn(true, { x: 2, y: 6 }),
        new Pawn(true, { x: 3, y: 6 }),
        new Pawn(true, { x: 4, y: 6 }),
        new Pawn(true, { x: 7, y: 6 }),
        new Pawn(true, { x: 5, y: 6 }),
        new Pawn(true, { x: 6, y: 6 }),
        new Rook(true, { x: 0, y: 7 }),
        new Knight(true, { x: 1, y: 7 }),
        new Bishop(true, { x: 2, y: 7 }),
        new Queen(true, { x: 3, y: 7 }),
        new King(true, { x: 4, y: 7 }),
        new Bishop(true, { x: 5, y: 7 }),
        new Knight(true, { x: 6, y: 7 }),
        new Rook(true, { x: 7, y: 7 }),
    ];

    const board: BoardPositionsType = {
        rows: []
    };

    for (let i = 0; i < 8; i++) {
        const columns: Array<PieceType | null> = [];

        for (let j = 0; j < 8; j++) {
            columns.push(pieces.find(piece => piece.coord.x === j && piece.coord.y === i) ?? null);
        }

        board.rows.push({ columns });
    }
    if (!playerIsWhite)
        board.rows.reverse();

    return board;
}