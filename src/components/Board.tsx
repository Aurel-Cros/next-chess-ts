'use client';
import { BoardStateContext } from "@/context/BoardState";
import type { BoardContextType, BoardPositionsType } from "@/types/ChessTypes.d.ts";
import { useContext } from "react";

export default function Board() {
    const boardState: BoardContextType = useContext(BoardStateContext);

    return (
        <div>
            <div> This is a chess board, right ?.</div>
            <p>It is {boardState.player ? 'white' : 'false'}'s turn to play.</p>
        </div>);
}
