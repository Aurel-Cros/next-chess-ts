'use client';

import type { AbstractPiece } from "@/classes/Piece/AbstractPiece";
import type { PlayerColour } from "./enums";

export type BoardPositionsType = {
    rows: Array<{
        columns: Array<AbstractPiece | null>;
    }>;
};

export type BoardContextType = {
    positions: BoardPositionsType;
    /**
     * true for white, false for black
     */
    player: PlayerColour;
};


export interface Coordinates {
    x: number;
    y: number;
}

export type PieceType = {
    public name: string;
    public colour: PlayerColour;
    public type: PiecesEnum;
    public isAlive: boolean;
    public sprite: string;
    public coord: { x: number, y: number; };
    public moves: MoveType[];
    public hasMoved: boolean;
};

export interface PieceInterface {
    public move(m: Coordinates, context: BoardPositionsType): boolean;
    public getPossibleMoves(context: BoardPositionsType): Coordinates[];
}

export interface MoveType extends Coordinates {
    isRanged: boolean;
    condition?: (...args: any[]) => boolean;
}

