import { PiecesEnum, PlayerColour } from "@/types/enums";
import { BoardPositionsType, Coordinates } from '../../types/ChessTypes';
import type { AbstractPiece } from "../Piece/AbstractPiece";

export abstract class BoardManager {

    public static isInCheck(playerColour: PlayerColour, board: BoardPositionsType): boolean {
        let isInCheck = false;

        /**
         * Check all squares on the board. If a piece belongs to player, skip it.
         * Check all possible moves for a piece, if it can "land" on the king, player is in check.
         * Exception made for pawns that cannot take while moving straight. 
         */

        board.rows.forEach(row => {
            if (isInCheck)
                return;

            row.columns.forEach((piece: AbstractPiece | null) => {
                if (isInCheck || !piece || piece.colour === playerColour)
                    return;

                const pieceMoves = piece.getPossibleMoves(board);
                if (pieceMoves.length === 0)
                    return;

                pieceMoves.forEach((move: Coordinates) => {

                    // Pawns moving forward are harmless
                    if ((piece.type === PiecesEnum.BlackPawn || piece.type === PiecesEnum.WhitePawn)
                        && move.x === 0)
                        return;

                    if (!piece.isMoveOnBoard(move))
                        return;

                    const destination: AbstractPiece | null = board.rows[move.y].columns[move.x];

                    if (!destination)
                        return;

                    if (destination.type === PiecesEnum.BlackKing && playerColour === PlayerColour.Black)
                        isInCheck = true;

                    if (destination.type === PiecesEnum.WhiteKing && playerColour === PlayerColour.White)
                        isInCheck = true;
                });

            });
        }
        );
        return isInCheck;
    }
}