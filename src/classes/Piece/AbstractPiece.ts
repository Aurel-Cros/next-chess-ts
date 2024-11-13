import type { BoardPositionsType, Coordinates, MoveType, PieceInterface } from "@/types/ChessTypes.d.ts";
import { PiecesEnum, PlayerColour } from '../../types/enums.ts';

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

    public move(move: Coordinates, boardContext: BoardPositionsType): boolean {
        const destinationCoord = {
            x: this.coord.x + move.x,
            y: this.coord.y + move.y,
        };
        if (!this.isMoveOnBoard(destinationCoord))
            return false;

        console.log(`Moving ${this.colour} ${this.name} from ${this.coord.x} ${this.coord.y}`);
        this.coord.x += move.x;
        this.coord.y += move.y;
        this.hasMoved = true;

        const destinationContent: AbstractPiece | null = boardContext.rows[destinationCoord.y].columns[destinationCoord.x];

        if (destinationContent !== null) {
            destinationContent.isAlive = false;
            destinationContent.coord = { x: -1, y: -1 };
        }

        return true;
    }

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


                if (this.isMoveAllowed(destinationContent))
                    movesToReturn.push(destinationCoord);


                if (!move.isRanged)
                    return movesToReturn;

                for (let i = 2; i < 8; i++) {
                    const rangedDestinationCoord = {
                        x: this.coord.x + i * move.x,
                        y: this.coord.y + i * move.y,
                    };

                    if (!this.isMoveOnBoard(rangedDestinationCoord))
                        continue;

                    if (this.isMoveAllowed(destinationContent))
                        movesToReturn.push(rangedDestinationCoord);
                }

                return movesToReturn;
            });

        return movesOnBoardWithRange;
    }

    public isMoveOnBoard(targetCoords: Coordinates): boolean {

        if (targetCoords.x < 0 ||
            targetCoords.x > 7 ||
            targetCoords.y < 0 ||
            targetCoords.y > 7)
            return false;

        return true;
    }

    public isMoveAllowed(destinationContent: AbstractPiece | null): boolean {

        if (destinationContent === null)
            return true;

        if (destinationContent.colour !== this.colour)
            return true;

        return false;
    }
}
