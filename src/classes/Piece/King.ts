import type { Coordinates } from "@/types/ChessTypes.d.ts";
import { PiecesEnum, PlayerColour } from '../../types/enums.ts';
import { AbstractPiece } from "./AbstractPiece.ts";

export class King extends AbstractPiece {
    /**
     * @param isWhite: boolean defining the colour of the piece. true for white, false for black
     */
    constructor(pieceColour: PlayerColour, coords: Coordinates = { x: 0, y: 0 }) {
        const type = pieceColour === PlayerColour.White ? PiecesEnum.WhiteKing : PiecesEnum.BlackKing;
        super(pieceColour, type);
        this.coord = coords;
        this.type = type;
        this.name = `${this.colour} King`;
        this.sprite = `${this.colour}King.png`;
        this.moves = [
            {
                x: -1,
                y: 0,
                isRanged: false,
            },
            {
                x: 1,
                y: 0,
                isRanged: false,
            },
            {
                x: 0,
                y: 1,
                isRanged: false,
            },
            {
                x: 0,
                y: -1,
                isRanged: false,
            },
            {
                x: -1,
                y: -1,
                isRanged: false,
            },
            {
                x: 1,
                y: -1,
                isRanged: false,
            },
            {
                x: -1,
                y: 1,
                isRanged: false,
            },
            {
                x: 1,
                y: 1,
                isRanged: false,
            },
        ];
    }
}