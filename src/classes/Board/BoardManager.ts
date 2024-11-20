import { PiecesEnum, PlayerColour } from '@/types/enums';
import { BoardPositionsType } from '../../types/ChessTypes';
import { AbstractPiece } from "../Piece/AbstractPiece";

export abstract class BoardManager {

    public static isInCheck(playerColour: PlayerColour, board: BoardPositionsType): boolean {
        let isInCheck = false;

        /**
         * Check all squares on the board. If a piece belongs to player, skip it.
         * Check all possible moves for a piece, if it can "land" on the king, player is in check.
         * Exception made for pawns that cannot take while moving straight. 
         */

        rows: for (const row of board.rows) {
            if (isInCheck)
                break;

            for (const piece of row.columns) {
                if (isInCheck || !piece || piece.colour === playerColour)
                    continue;

                const pieceMoves = piece.getPossibleMoves(board);
                if (pieceMoves.length === 0)
                    continue;

                for (const move of pieceMoves) {

                    // Pawns moving forward are harmless
                    if ((piece.type === PiecesEnum.BlackPawn || piece.type === PiecesEnum.WhitePawn)
                        && move.x === 0)
                        continue;

                    if (!piece.isMoveOnBoard(move))
                        continue;

                    const destination: AbstractPiece | null = board.rows[move.y].columns[move.x];

                    if (!destination)
                        continue;

                    if (destination.type === PiecesEnum.BlackKing && playerColour === PlayerColour.Black) {
                        isInCheck = true;
                        break rows;
                    }

                    if (destination.type === PiecesEnum.WhiteKing && playerColour === PlayerColour.White) {
                        isInCheck = true;
                        break rows;
                    }
                };
            }
        }

        return isInCheck;
    }

    /**
     * For a given player, try every possible move they can make to see if there is a solution to remove check.
     */
    public static isCheckMate(playerColour: PlayerColour, board: BoardPositionsType): boolean {

        // Return early if there is no regular check
        if (!BoardManager.isInCheck(playerColour, board))
            return false;

        // Get all player's remaining pieces
        const playerPieces: (AbstractPiece | null)[] = board.rows.flatMap(row => row.columns.filter((piece: AbstractPiece | null) => piece && piece?.isAlive && piece.colour === playerColour));

        // Check all possible moves per piece
        // If a move removes the check, return false early

        for (const piece of playerPieces)
            if (piece)
                for (const move of piece.getPossibleMoves(board))
                    if (piece.previewMove(move, board))
                        return false;

        return true;
    }
}