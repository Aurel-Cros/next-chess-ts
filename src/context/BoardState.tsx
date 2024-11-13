'use client';

import type { BoardContextType } from "@/types/ChessTypes.d.ts";
import newBoardPositions, { drawBoard } from "@/utils/resetBoardPositions.ts";
import { createContext, useState, type Context } from "react";
import { subscribe } from "./EventsObserver.ts";
import { PieceType } from '../types/ChessTypes';
import { PlayerColour } from "@/types/enums.ts";

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
        const pieces: PieceType[] = [];
        boardState.positions.rows.forEach((row) => {

            row.columns.forEach((c: PieceType | null) => {
                if (c)
                    pieces.push(c);
            });
        });
        const newBoard = drawBoard(pieces);
        updateState({
            positions: newBoard,
            player: boardState.player === PlayerColour.White ? PlayerColour.Black : PlayerColour.White,
        });
    };

    subscribe('update-state', updateState);
    subscribe('refresh-board', refreshBoard);

    return (
        <BoardStateContext.Provider value={boardState}>
            {children}
        </BoardStateContext.Provider>
    );
}