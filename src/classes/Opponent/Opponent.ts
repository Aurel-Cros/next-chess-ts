import type { BoardContextType, Coordinates } from "@/types/ChessTypes";
import { ContextEvent, PlayerColour } from "@/types/enums";
import type { AbstractPiece } from "../Piece/AbstractPiece";
import { BoardManager } from "../Board/BoardManager";
import { dispatch } from "@/context/EventObserver";

export default class Opponent {
    private colour: PlayerColour;
    private oppColour: PlayerColour;
    private context: BoardContextType;
    private depth: number;

    constructor(colour: PlayerColour, context: BoardContextType, depth: number = 1) {
        this.colour = colour;
        this.context = context;
        this.depth = depth;
        this.oppColour = colour === PlayerColour.White ? PlayerColour.Black : PlayerColour.White;
    }

    public makeRandomMove() {
        let moved = false;

        while (!moved) {
            const pieces = this.getMyPieces();
            const randomPiece = pieces.at(Math.floor(Math.random() * pieces.length)) as AbstractPiece;
            const randomPieceMoves = randomPiece.getPossibleMoves(this.context.positions);
            const randomMove = randomPieceMoves.at(Math.floor(Math.random() * randomPieceMoves.length)) as Coordinates;

            moved = randomPiece.move(randomMove, this.context.positions);
        }

        dispatch(ContextEvent.REFRESH);
    }

    public getMyPieces(): AbstractPiece[] {
        return this.context.positions.rows
            .flatMap(row => row.columns)
            .filter(a => a?.colour === this.colour)
            .filter((p: AbstractPiece | null) => p !== null);
    }

    public getOppPieces(): AbstractPiece[] {
        return this.context.positions.rows
            .flatMap(row => row.columns)
            .filter(a => a?.colour !== this.colour)
            .filter((p: AbstractPiece | null) => p !== null);
    }

    public scoreSnapshot(context: BoardContextType): number {
        let score = 0;
        const snapshot = context.positions;
        if (BoardManager.isCheckMate(this.oppColour, snapshot))
            score += 1000;

        if (BoardManager.isInCheck(this.oppColour, snapshot))
            score += 50;

        const oppPcs: AbstractPiece[] = snapshot.rows.flatMap(row => row.columns).filter(p => p?.colour === this.oppColour).filter(p => p !== null);
        const myPcs: AbstractPiece[] = snapshot.rows.flatMap(row => row.columns).filter(p => p?.colour === this.colour).filter(p => p !== null);

        // Pieces remaining
        score += myPcs.reduce((total, current) => {
            return total + (current.type % 10);
        }, 0);
        score -= oppPcs.reduce((total, current) => {
            return total + (current.type % 10);
        }, 0);

        // Pieces near center
        // Center 4
        score += myPcs.filter(p => [3, 4].includes(p.coord.x) && [3, 4].includes(p.coord.y)).length * 4;
        score -= oppPcs.filter(p => [3, 4].includes(p.coord.x) && [3, 4].includes(p.coord.y)).length * 4;

        // Center 16
        score += myPcs.filter(p => [2, 5].includes(p.coord.x) && [2, 5].includes(p.coord.y)).length * 2;
        score -= oppPcs.filter(p => [2, 5].includes(p.coord.x) && [2, 5].includes(p.coord.y)).length * 2;

        return score;
    }
}