'use client';

import type { BoardContextType } from "@/types/ChessTypes.d.ts";
import newBoardPositions, { drawBoard } from "@/utils/resetBoardPositions.ts";
import { createContext, useState, type Context } from "react";
import { dispatch, subscribe } from "./EventObserver.ts";
import { ContextEvent, GameStatus, PiecesEnum, PlayerColour } from "@/types/enums.ts";
import type { AbstractPiece } from "@/classes/Piece/AbstractPiece.ts";
import { BoardManager } from "@/classes/Board/BoardManager.ts";
import { Queen } from "@/classes/Piece/Queen.ts";

export const BoardStateContext: Context<BoardContextType> = createContext({
    positions: newBoardPositions(),
    player: PlayerColour.White
} as BoardContextType);

export default function BoardProvider({ children }: { children: React.ReactNode; }) {
    const startingState: BoardContextType = { positions: newBoardPositions(), player: PlayerColour.White };
    const [boardState, setBoardState] = useState<BoardContextType>(startingState);

    const updateBoardState = (newState: BoardContextType) => {
        setBoardState((oldState) => {
            const state = {
                ...oldState,
                ...newState
            };
            return state;
        });
    };

    const refreshBoard = () => {
        const pieces: AbstractPiece[] = boardState.positions.rows.flatMap((row) => row.columns.filter((p: AbstractPiece | null) => p && p.isAlive)).filter(p => p !== null);

        /* Promote pawns before re-draw */
        pieces.forEach((piece, i) => {
            if (piece.type !== PiecesEnum.WhitePawn && piece.type !== PiecesEnum.BlackPawn)
                return;

            if (piece.coord.y === 7 || piece.coord.y === 0)
                pieces[i] = new Queen(piece.colour, piece.coord);
        });

        const newBoard = drawBoard(pieces);

        updateBoardState({
            positions: newBoard,
            player: boardState.player === PlayerColour.White ? PlayerColour.Black : PlayerColour.White,
        });
    };

    if (BoardManager.isCheckMate(boardState.player, boardState.positions))
        dispatch(ContextEvent.STATUS, boardState.player === PlayerColour.White ? GameStatus.BlackWin : GameStatus.WhiteWin);


    subscribe(ContextEvent.UPDATE, updateBoardState);
    subscribe(ContextEvent.REFRESH, refreshBoard);
    subscribe(ContextEvent.RESET, () => {
        updateBoardState(startingState);
        dispatch(ContextEvent.STATUS, null);
    });

    return (
        <BoardStateContext.Provider value={boardState}>
            {children}
        </BoardStateContext.Provider>
    );
}