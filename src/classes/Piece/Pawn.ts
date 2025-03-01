import type { BoardPositionsType, Coordinates } from "@/types/ChessTypes.d.ts";
import { PiecesEnum, PlayerColour } from '../../types/enums.ts';
import { AbstractPiece } from "./AbstractPiece.ts";
import { Queen } from "./Queen.ts";

export class Pawn extends AbstractPiece {
    direction: 1 | -1;
    /**
     * @param isWhite: boolean defining the colour of the piece. true for white, false for black
     */
    constructor(pieceColour: PlayerColour, direction: 1 | -1, coords: Coordinates = { x: 0, y: 0 }) {
        const type = pieceColour === PlayerColour.White ? PiecesEnum.WhitePawn : PiecesEnum.BlackPawn;
        super(pieceColour, type);
        this.direction = direction;
        this.coord = coords;
        this.type = type;
        this.name = `${this.colour} Pawn`;
        this.sprite = `${this.colour}Pawn.png`;
        this.moves = [
            {
                x: 0,
                y: this.direction,
                isRanged: false,
                condition: (destination: AbstractPiece | null) => destination === null
            },
            {
                x: 0,
                y: this.direction * 2,
                isRanged: false,
                condition: (destination: AbstractPiece | null) => this.hasMoved === false && destination === null
            },
            {
                x: 1,
                y: this.direction,
                isRanged: false,
                condition: (destination: AbstractPiece | null) => destination !== null && destination.colour !== this.colour,
            },
            {
                x: -1,
                y: this.direction,
                isRanged: false,
                condition: (destination: AbstractPiece | null) => destination !== null && destination.colour !== this.colour,
            },
        ];
    }
}
