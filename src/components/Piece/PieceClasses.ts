import type { Coordinates, MoveType, PieceType } from "@/types/ChessTypes.d.ts";
import { PiecesEnum } from '../../types/enums.ts';

abstract class Piece implements PieceType {
    public name: string = '';
    public colour: "Black" | "White";
    public type: PiecesEnum = 0;
    public isAlive: boolean = true;
    public moves: MoveType[] = [];
    public sprite: string = "";
    public coord: Coordinates = { x: 0, y: 0 };

    constructor(isWhite: boolean, type: PiecesEnum) {
        this.colour = isWhite ? "White" : "Black";

        if (type === PiecesEnum.None)
            throw new Error("Can't create a piece with no type. Try instantiating a child piece class.");
    }

    move(move: Coordinates): boolean {
        if (!this.isMoveOnBoard(move))
            return false;

        console.log(`Moving ${this.colour} ${this.name} from ${this.coord.x} ${this.coord.y}`);
        this.coord.x += move.x;
        this.coord.y += move.y;
        console.log(`Moved to ${this.coord.x} ${this.coord.y}`);
        return true;
    }

    public getPossibleMoves(): Coordinates[] {
        return this.moves
            .filter((move: MoveType) => {
                if (this.isMoveOnBoard(move) &&
                    (move.condition === undefined || move.condition() === true))
                    return true;
                return false;
            })
            .flatMap((move: MoveType) => {
                if (!move.ranged)
                    return {
                        x: this.coord.x + move.x,
                        y: this.coord.y + move.y,
                    };

                const buffer: Coordinates[] = [];
                for (let i = 0; i < 8; i++) {
                    buffer.push({
                        x: this.coord.x + i * move.x,
                        y: this.coord.y + i * move.y,
                    });
                }
                return buffer;
            });
    }

    isMoveOnBoard(move: Coordinates): boolean {

        const new_x = this.coord.x + move.x;
        const new_y = this.coord.y + move.y;

        if (new_x < 0 ||
            new_x > 7 ||
            new_y < 0 ||
            new_y > 7)
            return false;

        return true;
    }
}

export class Rook extends Piece {
    /**
     * @param isWhite: boolean defining the colour of the piece. true for white, false for black
     */
    constructor(isWhite: boolean, coords: Coordinates = { x: 0, y: 0 }) {
        const type = isWhite ? PiecesEnum.WhiteRook : PiecesEnum.BlackRook;
        super(isWhite, type);
        this.coord = coords;
        this.type = type;
        this.name = `${this.colour} Rook`;
        this.sprite = `${this.colour}Rook.png`;
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
     * @param isWhite: boolean defining the colour of the piece. true for white, false for black
     */
    constructor(isWhite: boolean, coords: Coordinates = { x: 0, y: 0 }) {
        const type = isWhite ? PiecesEnum.WhiteBishop : PiecesEnum.BlackBishop;
        super(isWhite, type);
        this.coord = coords;
        this.type = type;
        this.name = `${this.colour} Bishop`;
        this.sprite = `${this.colour}Bishop.png`;
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
     * @param isWhite: boolean defining the colour of the piece. true for white, false for black
     */
    constructor(isWhite: boolean, coords: Coordinates = { x: 0, y: 0 }) {
        const type = isWhite ? PiecesEnum.WhiteKnight : PiecesEnum.BlackKnight;
        super(isWhite, type);
        this.coord = coords;
        this.type = type;
        this.name = `${this.colour} Knight`;
        this.sprite = `${this.colour}Knight.png`;
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
    direction: 1 | -1;
    /**
     * @param isWhite: boolean defining the colour of the piece. true for white, false for black
     */
    constructor(isWhite: boolean, direction: 1 | -1, coords: Coordinates = { x: 0, y: 0 }) {
        const type = isWhite ? PiecesEnum.WhitePawn : PiecesEnum.BlackPawn;
        super(isWhite, type);
        this.direction = direction;
        this.coord = coords;
        this.type = type;
        this.name = `${this.colour} Pawn`;
        this.sprite = `${this.colour}Pawn.png`;
        this.moves = [
            {
                x: 0,
                y: this.direction,
                ranged: false,
            },
            {
                x: 0,
                y: this.direction * 2,
                ranged: false,
                condition: () => (this.direction === 1 && this.coord.y === 1) || (this.direction === -1 && this.coord.y === 6)
            },
            {
                x: 1,
                y: this.direction,
                ranged: false,
                condition: () => false
            },
            {
                x: -1,
                y: this.direction,
                ranged: false,
                condition: () => false
            },
        ];
    }
}

export class King extends Piece {
    /**
     * @param isWhite: boolean defining the colour of the piece. true for white, false for black
     */
    constructor(isWhite: boolean, coords: Coordinates = { x: 0, y: 0 }) {
        const type = isWhite ? PiecesEnum.WhiteKing : PiecesEnum.BlackKing;
        super(isWhite, type);
        this.coord = coords;
        this.type = type;
        this.name = `${this.colour} King`;
        this.sprite = `${this.colour}King.png`;
        this.moves = [
            {
                x: -1,
                y: 0,
                ranged: false,
            },
            {
                x: 1,
                y: 0,
                ranged: false,
            },
            {
                x: 0,
                y: 1,
                ranged: false,
            },
            {
                x: 0,
                y: -1,
                ranged: false,
            },
            {
                x: -1,
                y: -1,
                ranged: false,
            },
            {
                x: 1,
                y: -1,
                ranged: false,
            },
            {
                x: -1,
                y: 1,
                ranged: false,
            },
            {
                x: 1,
                y: 1,
                ranged: false,
            },
        ];
    }
}

export class Queen extends Piece {
    /**
     * @param isWhite: boolean defining the colour of the piece. true for white, false for black
     */
    constructor(isWhite: boolean, coords: Coordinates = { x: 0, y: 0 }) {
        const type = isWhite ? PiecesEnum.WhiteQueen : PiecesEnum.BlackQueen;
        super(isWhite, type);
        this.coord = coords;
        this.type = type;
        this.name = `${this.colour} Queen`;
        this.sprite = `${this.colour}Queen.png`;
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