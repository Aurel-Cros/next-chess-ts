import type { BoardPositionsType, PieceType } from "@/types/ChessTypes.d.ts";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "@/components/Piece/PieceClasses";

export default function newBoardPositions(playerIsWhite: boolean = true): BoardPositionsType {
    const pieces: PieceType[] = [
        new Rook(!playerIsWhite, { x: 0, y: 0 }),
        new Knight(!playerIsWhite, { x: 1, y: 0 }),
        new Bishop(!playerIsWhite, { x: 2, y: 0 }),
        new Queen(!playerIsWhite, { x: 3, y: 0 }),
        new King(!playerIsWhite, { x: 4, y: 0 }),
        new Bishop(!playerIsWhite, { x: 5, y: 0 }),
        new Knight(!playerIsWhite, { x: 6, y: 0 }),
        new Rook(!playerIsWhite, { x: 7, y: 0 }),
        new Pawn(!playerIsWhite, 1, { x: 0, y: 1 }),
        new Pawn(!playerIsWhite, 1, { x: 1, y: 1 }),
        new Pawn(!playerIsWhite, 1, { x: 2, y: 1 }),
        new Pawn(!playerIsWhite, 1, { x: 3, y: 1 }),
        new Pawn(!playerIsWhite, 1, { x: 4, y: 1 }),
        new Pawn(!playerIsWhite, 1, { x: 5, y: 1 }),
        new Pawn(!playerIsWhite, 1, { x: 6, y: 1 }),
        new Pawn(!playerIsWhite, 1, { x: 7, y: 1 }),
        new Pawn(playerIsWhite, -1, { x: 0, y: 6 }),
        new Pawn(playerIsWhite, -1, { x: 1, y: 6 }),
        new Pawn(playerIsWhite, -1, { x: 2, y: 6 }),
        new Pawn(playerIsWhite, -1, { x: 3, y: 6 }),
        new Pawn(playerIsWhite, -1, { x: 4, y: 6 }),
        new Pawn(playerIsWhite, -1, { x: 7, y: 6 }),
        new Pawn(playerIsWhite, -1, { x: 5, y: 6 }),
        new Pawn(playerIsWhite, -1, { x: 6, y: 6 }),
        new Rook(playerIsWhite, { x: 0, y: 7 }),
        new Knight(playerIsWhite, { x: 1, y: 7 }),
        new Bishop(playerIsWhite, { x: 2, y: 7 }),
        new Queen(playerIsWhite, { x: 3, y: 7 }),
        new King(playerIsWhite, { x: 4, y: 7 }),
        new Bishop(playerIsWhite, { x: 5, y: 7 }),
        new Knight(playerIsWhite, { x: 6, y: 7 }),
        new Rook(playerIsWhite, { x: 7, y: 7 }),
    ];

    const board: BoardPositionsType = drawBoard(pieces);
    if (!playerIsWhite)
        board.rows.reverse();

    return board;
}

export function drawBoard(pieces: PieceType[]): BoardPositionsType {

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
    return board;
}