'use client';
import type { Pieces } from "@/pieces/Pieces.js";

export type BoardPositionsType = {
    row: Array<{
        column: Array<PieceType>;
    }>;
};

export type BoardContextType = {
    positions: BoardPositionsType;
    /**
     * true for white, false for black
     */
    player: boolean;
};

export enum PiecesEnum {

    None = 0,

    WhitePawn = 11,
    WhiteBishop = 12,
    WhiteKnight = 13,
    WhiteRook = 14,
    WhiteQueen = 15,
    WhiteKing = 16,

    BlackPawn = 21,
    BlackBishop = 22,
    BlackKnight = 23,
    BlackRook = 24,
    BlackQueen = 25,
    BlackKing = 26,
}

export interface PieceType {
    public name: string;
    public colour: "Black" | "White";
    public type: PiecesEnum;
    public moves: MoveType[];
}

export interface MoveType {
    x: number;
    y: number;
    ranged: boolean;
    condition?: Function;
}

