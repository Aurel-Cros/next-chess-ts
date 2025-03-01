import type { BoardPositionsType, Coordinates, MoveType, PieceInterface } from "@/types/ChessTypes.d.ts";
import { PiecesEnum, PlayerColour } from '../../types/enums.ts';
import { CheckValidator } from "../Board/CheckValidator.ts";
import { drawBoard } from "@/utils/resetBoardPositions.ts";
import Piece from "@/components/Piece/Piece.tsx";

export abstract class AbstractPiece implements PieceInterface {
    public name: string = '';
    public colour: PlayerColour;
    public type: PiecesEnum = 0;
    public isAlive: boolean = true;
    public sprite: string = "";

    public moves: MoveType[] = [];
    public coord: Coordinates = { x: 0, y: 0 };
    public hasMoved: boolean = false;

    public constructor(pieceColour: PlayerColour, type: PiecesEnum) {
        this.colour = pieceColour;

        if (type === PiecesEnum.None)
            throw new Error("Can't create a piece with no type. Try instantiating a child piece class.");
    }

    /**
     * Perform given move and removes taken ennemy piece from play
     */
    public move(move: Coordinates, boardContext: BoardPositionsType): boolean {
        const destinationCoord = {
            x: this.coord.x + move.x,
            y: this.coord.y + move.y,
        };
        if (!this.isMoveOnBoard(destinationCoord))
            return false;

        if (!this.previewMove(destinationCoord, boardContext)) {
            console.log("Still in check.");
            return false;
        }

        this.coord.x += move.x;
        this.coord.y += move.y;
        this.hasMoved = true;

        const destinationContent: AbstractPiece | null = boardContext.rows[destinationCoord.y].columns[destinationCoord.x];

        if (destinationContent !== null && destinationContent.colour !== this.colour) {
            destinationContent.isAlive = false;
            destinationContent.coord = { x: -1, y: -1 };
        }

        return true;
    }

    /**
     * Get list of possible moves for this piece with the current board positions
     */
    public getPossibleMoves(currentBoardState: BoardPositionsType): Coordinates[] {
        const movesOnBoardWithRange = this.moves
            .flatMap((move: MoveType) => {

                const movesToReturn: Coordinates[] = [];
                const destinationCoord = {
                    x: this.coord.x + move.x,
                    y: this.coord.y + move.y,
                };


                if (!this.isMoveOnBoard(destinationCoord))
                    return movesToReturn;

                const destinationContent: AbstractPiece | null = currentBoardState.rows[destinationCoord.y].columns[destinationCoord.x];

                if (move.condition && !move.condition(destinationContent))
                    return movesToReturn;


                if (!move.isRanged) {
                    if (this.isDestinationValid(destinationContent))
                        movesToReturn.push(destinationCoord);
                    return movesToReturn;
                }

                for (let i = 1; i < 8; i++) {
                    const rangedDestinationCoord = {
                        x: this.coord.x + i * move.x,
                        y: this.coord.y + i * move.y,
                    };

                    if (!this.isMoveOnBoard(rangedDestinationCoord))
                        break;

                    const rangedDestinationContent: AbstractPiece | null = currentBoardState.rows[rangedDestinationCoord.y].columns[rangedDestinationCoord.x];

                    if (this.isDestinationValid(rangedDestinationContent))
                        movesToReturn.push(rangedDestinationCoord);

                    if (rangedDestinationContent !== null) {
                        if (this.moveException(rangedDestinationContent))
                            movesToReturn.push(rangedDestinationCoord);
                        break;
                    }
                }

                return movesToReturn;
            });

        return movesOnBoardWithRange;
    }

    /**
     * Checks for particular rules like king's rock
     */
    public moveException(rangedDestContent: AbstractPiece): boolean {
        return false;
    }

    /**
     * Make the move, verify player is not in check, then reverse the move, returning whether it is valid to perform.
     */
    public previewMove(destinationCoord: Coordinates, boardContext: BoardPositionsType): boolean {

        const oldCoords = { ...this.coord };

        if (!this.isMoveOnBoard(destinationCoord))
            return false;

        const destinationContent: AbstractPiece | null = boardContext.rows[destinationCoord.y].columns[destinationCoord.x];

        this.coord = { ...destinationCoord };

        let dcWasAlive = true;
        if (destinationContent instanceof AbstractPiece) {
            dcWasAlive = destinationContent.isAlive;
            destinationContent.isAlive = false;
            destinationContent.coord.x += 10;
            destinationContent.coord.y += 10;
        }

        const newState = drawBoard(boardContext.rows.flatMap(row => row.columns.filter(p => p !== null)));
        const previewIsInCheck = CheckValidator.isInCheck(this.colour, newState);

        if (destinationContent instanceof AbstractPiece) {
            destinationContent.isAlive = dcWasAlive;
            destinationContent.coord.x -= 10;
            destinationContent.coord.y -= 10;
        }

        this.coord = oldCoords;

        return !previewIsInCheck;
    }

    /**
     * Check whether move stays on the board
     */
    public isMoveOnBoard(targetCoords: Coordinates): boolean {

        if (targetCoords.x < 0 ||
            targetCoords.x > 7 ||
            targetCoords.y < 0 ||
            targetCoords.y > 7)
            return false;

        return true;
    }

    /**
     * Check whether the target square is free or a takeable adversary piece
     */
    public isDestinationValid(destinationContent: AbstractPiece | null): boolean {

        if (destinationContent === null)
            return true;

        if (destinationContent.colour !== this.colour)
            return true;

        return false;
    }
}
