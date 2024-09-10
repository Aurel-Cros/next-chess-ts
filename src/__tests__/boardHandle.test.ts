'use client';
import type { BoardPositionsType } from "../types/ChessTypes.d.ts";
import { it, describe, expect } from "vitest";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "../components/PieceClasses.ts";
import newBoardPositions from "@/utils/resetBoardPositions.ts";

describe('Basic board testing', () => {
    it("should create a new board according to player colour", () => {
        const expected: BoardPositionsType = {
            rows: [
                {
                    columns: [
                        new Rook(false),
                        new Knight(false),
                        new Bishop(false),
                        new King(false),
                        new Queen(false),
                        new Bishop(false),
                        new Knight(false),
                        new Rook(false),
                    ]
                },
                {
                    columns: [
                        new Pawn(false),
                        new Pawn(false),
                        new Pawn(false),
                        new Pawn(false),
                        new Pawn(false),
                        new Pawn(false),
                        new Pawn(false),
                        new Pawn(false)
                    ]
                },
                { columns: [] },
                { columns: [] },
                { columns: [] },
                { columns: [] },
                {
                    columns: [
                        new Pawn(true),
                        new Pawn(true),
                        new Pawn(true),
                        new Pawn(true),
                        new Pawn(true),
                        new Pawn(true),
                        new Pawn(true),
                        new Pawn(true)
                    ]
                },
                {
                    columns: [
                        new Rook(true),
                        new Knight(true),
                        new Bishop(true),
                        new King(true),
                        new Queen(true),
                        new Bishop(true),
                        new Knight(true),
                        new Rook(true),
                    ]
                },
            ]
        };
        const boardWhitePlayer: BoardPositionsType = newBoardPositions(true);
        const boardBlackPlayer: BoardPositionsType = newBoardPositions(false);

        // For some reason, toEqual doesn't match objects that are deeply equal ??
        expect(JSON.stringify(boardWhitePlayer)).toEqual(JSON.stringify(expected));

        expected.rows.reverse();

        expect(JSON.stringify(boardBlackPlayer)).toEqual(JSON.stringify(expected));
    });
});