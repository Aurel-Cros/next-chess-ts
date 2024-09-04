import { MoveType, PiecesEnum, PieceType } from "@/types/ChessTypes.d.js";

abstract class Piece implements PieceType {
    public name: string = '';
    public colour: "Black" | "White";
    public type: PiecesEnum = 0;
    public moves: MoveType[] = [];

    constructor(colour: boolean, type: PiecesEnum) {
        this.colour = colour ? "White" : "Black";

        if (type === PiecesEnum.None)
            throw new Error("Can't create a piece with no type. Try instantiating a child piece class.");
    }

    die() {
        // Move this piece in graveyard
    }
    getMoves(): [number, number] {
        return [0, 0];
    }
}

export class Rook extends Piece {
    /**
     * @param c: boolean defining the colour of the piece. true for white, false for black
     */
    constructor(c: boolean) {
        const type = c ? PiecesEnum.WhiteRook : PiecesEnum.BlackRook;
        super(c, type);
        this.type = type;
        this.name = `${this.colour} Rook`;
        this.moves = [
            {
                x: -1,
                y: 0,
                ranged: true,
            },
            {
                x: 1,
                y: 0,
                ranged: true,
            },
            {
                x: 0,
                y: 1,
                ranged: true,
            },
            {
                x: 0,
                y: -1,
                ranged: true,
            },
        ];
    }
}

export class Bishop extends Piece {
    /**
     * @param c: boolean defining the colour of the piece. true for white, false for black
     */
    constructor(c: boolean) {
        const type = c ? PiecesEnum.WhiteBishop : PiecesEnum.BlackBishop;
        super(c, type);
        this.type = type;
        this.name = `${this.colour} Bishop`;
        this.moves = [
            {
                x: -1,
                y: -1,
                ranged: true,
            },
            {
                x: 1,
                y: -1,
                ranged: true,
            },
            {
                x: -1,
                y: 1,
                ranged: true,
            },
            {
                x: 1,
                y: 1,
                ranged: true,
            },
        ];
    }
}

export class Knight extends Piece {
    /**
     * @param c: boolean defining the colour of the piece. true for white, false for black
     */
    constructor(c: boolean) {
        const type = c ? PiecesEnum.WhiteKnight : PiecesEnum.BlackKnight;
        super(c, type);
        this.type = type;
        this.name = `${this.colour} Knight`;
        this.moves = [
            {
                x: -1,
                y: -2,
                ranged: false,
            },
            {
                x: 1,
                y: -2,
                ranged: false,
            },
            {
                x: -1,
                y: 2,
                ranged: false,
            },
            {
                x: 1,
                y: 2,
                ranged: false,
            },
            {
                x: -2,
                y: -1,
                ranged: false,
            },
            {
                x: -2,
                y: 1,
                ranged: false,
            },
            {
                x: 2,
                y: -1,
                ranged: false,
            },
            {
                x: 2,
                y: 1,
                ranged: false,
            },
        ];
    }
}

export class Pawn extends Piece {
    /**
     * @param c: boolean defining the colour of the piece. true for white, false for black
     */
    constructor(c: boolean) {
        const type = c ? PiecesEnum.WhitePawn : PiecesEnum.BlackPawn;
        super(c, type);
        this.type = type;
        this.name = `${this.colour} Pawn`;
        this.moves = [
            {
                x: 0,
                y: 1,
                ranged: false,
            },
            {
                x: 1,
                y: 1,
                ranged: false,
                condition: () => { }
            },
            {
                x: -1,
                y: 1,
                ranged: false,
                condition: () => { }
            },
        ];
    }
}