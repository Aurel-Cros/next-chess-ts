import type { Coordinates } from "@/types/ChessTypes.d.ts";
import { PiecesEnum, PlayerColour } from '../../types/enums.ts';
import { AbstractPiece } from "./AbstractPiece.ts";

export class Knight extends AbstractPiece {
    /**
     * @param isWhite: boolean defining the colour of the piece. true for white, false for black
     */
    constructor(pieceColour: PlayerColour, coords: Coordinates = { x: 0, y: 0 }) {
        const type = pieceColour === PlayerColour.White ? PiecesEnum.WhiteKnight : PiecesEnum.BlackKnight;
        super(pieceColour, type);
        this.coord = coords;
        this.type = type;
        this.name = `${this.colour} Knight`;
        this.sprite = `${this.colour}Knight.png`;
        this.moves = [
            {
                x: -1,
                y: -2,
                isRanged: false,
            },
            {
                x: 1,
                y: -2,
                isRanged: false,
            },
            {
                x: -1,
                y: 2,
                isRanged: false,
            },
            {
                x: 1,
                y: 2,
                isRanged: false,
            },
            {
                x: -2,
                y: -1,
                isRanged: false,
            },
            {
                x: -2,
                y: 1,
                isRanged: false,
            },
            {
                x: 2,
                y: -1,
                isRanged: false,
            },
            {
                x: 2,
                y: 1,
                isRanged: false,
            },
        ];
    }
}
