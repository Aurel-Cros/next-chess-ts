import { PlayerColour } from '@/types/enums';
import { BoardPositionsType } from '../../types/ChessTypes';
import { CheckValidator } from './CheckValidator';

export abstract class BoardManager {
    public static isInCheck(playerColour: PlayerColour, board: BoardPositionsType): boolean {
        return CheckValidator.isInCheck(playerColour, board);
    }

    public static isCheckMate(playerColour: PlayerColour, board: BoardPositionsType): boolean {
        return CheckValidator.isCheckMate(playerColour, board);
    }

}