"use strict";

const calculateDistance = require('./calculateDistance');

describe('calculation', () => {
    test('should return zero distance between same points', () => {
        const point = {lat: 123, long: 234};
        expect(calculateDistance(point, point)).toBe(0);
    });

    test('should return rigth distance between different points', () => {
        const first = {lat: 58, long: 37};
        const second = {lat: 57, long: 36};
        const expectedValue = 126.26;

        expect(calculateDistance(first, second)).toBeCloseTo(expectedValue);
    });
});

describe('typing', () => {
    test('should not mutate arguments', () => {
        const first = Object.freeze({lat: 58, long: 37});

        calculateDistance(first, first);
        expect(calculateDistance).not.toThrowError(/TypeError/);
    });

    test('should throw error with less then two arguments', () => {
        try {
            calculateDistance();
        } catch (e) {
            expect(calculateDistance).toThrowError('expected more arguments');
        }
    });
});
