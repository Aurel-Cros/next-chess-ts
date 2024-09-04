'use client';
import type { BoardPositionsType } from "../types/ChessTypes.d.ts";
import { it, describe, expect } from "vitest";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "../components/Piece.ts";
import newBoardPositions from "@/utils/resetBoardPositions.ts";

describe('Basic board testing', () => {
    it("should create a new board according to player colour", () => {
        const expected: BoardPositionsType = {
            row: [
                {
                    column: [
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
                    column: [
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
                { column: [] },
                { column: [] },
                { column: [] },
                { column: [] },
                {
                    column: [
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
                    column: [
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

        expected.row.reverse();

        expect(JSON.stringify(boardBlackPlayer)).toEqual(JSON.stringify(expected));
    });
});