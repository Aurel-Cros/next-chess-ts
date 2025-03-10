import type { BoardPositionsType, Coordinates } from "@/types/ChessTypes.d.ts";
import { PiecesEnum, PlayerColour } from '../../types/enums.ts';
import { AbstractPiece } from "./AbstractPiece.ts";

export class Rook extends AbstractPiece {
    /**
     * @param isWhite: boolean defining the colour of the piece. true for white, false for black
     */
    constructor(pieceColour: PlayerColour, coords: Coordinates = { x: 0, y: 0 }) {
        const type = pieceColour === PlayerColour.White ? PiecesEnum.WhiteRook : PiecesEnum.BlackRook;
        super(pieceColour, type);
        this.coord = coords;
        this.type = type;
        this.name = `${this.colour} Rook`;
        this.sprite = `${this.colour}Rook.png`;
        this.moves = [
            {
                x: -1,
                y: 0,
                isRanged: true
            },
            {
                x: 1,
                y: 0,
                isRanged: true
            },
            {
                x: 0,
                y: 1,
                isRanged: true,
            },
            {
                x: 0,
                y: -1,
                isRanged: true,
            },
        ];
    }

    /**
     * Exception for king's rock
     */
    public moveException(rangedDestContent: AbstractPiece): boolean {
        // Only valid if we're targetting the king with the rook
        if (rangedDestContent.type !== PiecesEnum.WhiteKing && rangedDestContent.type !== PiecesEnum.BlackKing)
            return false;

        // Only valid if rook and king have not moved
        if (this.hasMoved || rangedDestContent.hasMoved)
            return false;

        // Only valid with same side pieces (shouldn't happen but early returns are free)
        if (rangedDestContent.colour !== this.colour)
            return false;

        // At this point, rook and king have not moved yet and line of sight is free

        return true;
    }

    /**
     * Perform given move and removes taken ennemy piece from play
     */
    public move(move: Coordinates, boardContext: BoardPositionsType): boolean {
        const destinationCoord = {
            x: this.coord.x + move.x,
            y: this.coord.y + move.y,
        };
        const destinationContent: AbstractPiece | null = boardContext.rows[destinationCoord.y].columns[destinationCoord.x];

        if (destinationContent !== null && destinationContent.colour === this.colour) {
            if (destinationContent.type === PiecesEnum.BlackKing || destinationContent.type === PiecesEnum.WhiteKing) {

                const kingXCorrection = this.coord.x > destinationContent.coord.x ? 1 : -1;

                move.x += kingXCorrection;

                destinationContent.move({ x: kingXCorrection * 2, y: 0 }, boardContext);
            }
        }

        return super.move(move, boardContext);
    }
}
