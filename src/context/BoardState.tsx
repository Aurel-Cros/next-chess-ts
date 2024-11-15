'use client';

import type { BoardContextType } from "@/types/ChessTypes.d.ts";
import newBoardPositions, { drawBoard } from "@/utils/resetBoardPositions.ts";
import { createContext, useState, type Context } from "react";
import { subscribe } from "./EventObserver.ts";
import { PlayerColour } from "@/types/enums.ts";
import type { AbstractPiece } from "@/classes/Piece/AbstractPiece.ts";
import { BoardManager } from "@/classes/Board/BoardManager.ts";
import { redirect } from "next/navigation";

export const BoardStateContext: Context<BoardContextType> = createContext({
    positions: newBoardPositions(),
    player: PlayerColour.White
} as BoardContextType);

export default function BoardProvider({ children }: { children: React.ReactNode; }) {
    const [boardState, setBoardState] = useState({ positions: newBoardPositions(), player: PlayerColour.White });

    const updateState = (newState: BoardContextType) => {
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

        updateState({
            positions: newBoard,
            player: boardState.player === PlayerColour.White ? PlayerColour.Black : PlayerColour.White,
        });
    };

    if (BoardManager.isInCheck(boardState.player, boardState.positions))
        console.log("CHECK !");

    if (BoardManager.isCheckMate(boardState.player, boardState.positions))
        console.log("CHECK MATE OMG.");


    subscribe('update-state', updateState);
    subscribe('refresh-board', refreshBoard);

    return (
        <BoardStateContext.Provider value={boardState}>
            {children}
        </BoardStateContext.Provider>
    );
}