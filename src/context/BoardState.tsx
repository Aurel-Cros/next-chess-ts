'use client';

import type { BoardContextType } from "@/types/ChessTypes.d.ts";
import newBoardPositions from "@/utils/resetBoardPositions.ts";
import { createContext, useState, type Context } from "react";
import { subscribe } from "./EventsHandler.ts";
import Board from '../components/Board';

export const BoardStateContext: Context<BoardContextType> = createContext({
    positions: newBoardPositions(),
    player: true
} as BoardContextType);

export default function BoardProvider({ children }: { children: React.ReactNode; }) {
    const [boardState, setBoardState] = useState({ positions: newBoardPositions(), player: true });

    const updateState = (newState: BoardContextType) => {
        setBoardState((oldState) => {
            const state = {
                ...oldState,
                ...newState
            };
            return state;
        });
    };

    subscribe('updateState', updateState);

    return (
        <BoardStateContext.Provider value={boardState}>
            {children}
        </BoardStateContext.Provider>
    );
}