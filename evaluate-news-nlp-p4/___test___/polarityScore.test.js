import { polarityScore } from "../src/client/js/formHandler";

describe('Testing the polarity score functionality', () => {
    test('Testing polarityScore()', () => {
            expect(polarityScore('N')).toBe('neutral')
    })
    test('Testing polarityScore()', () => {
        expect(polarityScore('P+')).toBe('Strongly positive')
    })
    test('Testing polarityScore()', () => {
        expect(polarityScore('P-')).toBe('Negative')
    })
    test('Testing polarityScore()', () => {
        expect(polarityScore('None')).toBe('None')
    })
});