'use client';

import { newBoardPositions } from "@/components/Board.jsx";
import type { BoardContextType } from "@/types/ChessTypes.d.ts";
import { createContext, type Context } from "react";

export const BoardStateContext: Context<BoardContextType> = createContext({
    positions: newBoardPositions(),
    player: true
} as BoardContextType);

export default function BoardProvider({ children }: { children: React.ReactNode; }) {
    return <BoardStateContext.Provider value={{ positions: newBoardPositions(), player: true }}>{children}</BoardStateContext.Provider>;
}