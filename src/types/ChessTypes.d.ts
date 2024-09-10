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


export interface PieceType {
    public name: string;
    public colour: "Black" | "White";
    public type: PiecesEnum;
    public isAlive: boolean;
    public sprite: string;
    public moves: MoveType[];
}

export interface MoveType {
    x: number;
    y: number;
    ranged: boolean;
    condition?: Function;
}

