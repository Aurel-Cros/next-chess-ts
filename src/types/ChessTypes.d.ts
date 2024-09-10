'use client';

export type BoardPositionsType = {
    rows: Array<{
        columns: Array<PieceType | null>;
    }>;
};

export type BoardContextType = {
    positions: BoardPositionsType;
    /**
     * true for white, false for black
     */
    player: boolean;
};


export interface Coordinates {
    x: number;
    y: number;
}

export interface PieceType {
    public name: string;
    public colour: "Black" | "White";
    public type: PiecesEnum;
    public isAlive: boolean;
    public sprite: string;
    public coord: { x: number, y: number; };
    public moves: MoveType[];
    public move(m: Coordinates): boolean;
    public getPossibleMoves(): Coordinates[];
}

export interface MoveType extends Coordinates {
    ranged: boolean;
    condition?: () => boolean;
}

