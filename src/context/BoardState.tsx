'use client';

import type { BoardContextType } from "@/types/ChessTypes.d.ts";
import newBoardPositions, { drawBoard } from "@/utils/resetBoardPositions.ts";
import { createContext, useState, type Context } from "react";
import { dispatch, subscribe } from "./EventObserver.ts";
import { PlayerColour } from "@/types/enums.ts";
import type { AbstractPiece } from "@/classes/Piece/AbstractPiece.ts";
import { BoardManager } from "@/classes/Board/BoardManager.ts";

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
        const pieces: AbstractPiece[] = boardState.positions.rows.flatMap((row) => row.columns.filter((p: AbstractPiece | null) => p && p.isAlive));

        const newBoard = drawBoard(pieces);

        updateBoardState({
            positions: newBoard,
            player: boardState.player === PlayerColour.White ? PlayerColour.Black : PlayerColour.White,
        });
    };

    if (BoardManager.isInCheck(boardState.player, boardState.positions))
        console.log("CHECK !");

    if (BoardManager.isCheckMate(boardState.player, boardState.positions))
        console.log("CHECK MATE OMG.");


    subscribe('update-state', updateBoardState);
    subscribe('refresh-board', refreshBoard);
    subscribe('reset-board', () => updateBoardState(startingState));

    return (
        <BoardStateContext.Provider value={boardState}>
            {children}
        </BoardStateContext.Provider>
    );
}