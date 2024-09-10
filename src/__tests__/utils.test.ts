'use client';
import deepEqual from "@/utils/deepEqual.ts";
import { it, describe, expect } from "vitest";

describe('Runtime deepEqual testing', () => {

    const test1a = { a: 1, b: 2, c: 3, string: "Hello" };
    const test1b = { a: 1, b: 2, c: 3, string: "Hello" };
    const test1c = { c: 3, a: 1, string: "Hello" };

    const test2a = [1, 2, 3];
    const test2b = [1, 2, 3];
    const test2c = [3, 2, 1];

    const deepTestA = { 123: "lol", tests: [{ test1a, test1b }, { test2a, test2b }] };
    const deepTestB = { 123: "lol", tests: [{ test1a, test1b }, { test2a, test2b }] };

    it('should be true', () => {
        expect(deepEqual(test1a, test1b)).toBe(true);
    });
    it('should be false', () => {
        expect(deepEqual(test1a, test2a)).toBe(false);
    });
    it('should be false', () => {
        expect(deepEqual(test1a, test1c)).toBe(false);
    });
    it('should be true', () => {
        expect(deepEqual(test2a, test2b)).toBe(true);
    });
    it('should be true', () => {
        expect(deepEqual(test2a, test2c)).toBe(true);
    });
    it('should be true', () => {
        expect(deepEqual(deepTestA, deepTestB)).toBe(true);
    });

});