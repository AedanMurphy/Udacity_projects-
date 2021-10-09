import { polarityScore } from "../src/client/js/formHandler";

describe('Testing the polarity score functionality', () => {
    test('Testing polarityScore()', () => {
        expect(polarityScore('P+')).toBe('Strongly Positive')
    })
    test('Testing polarityScore()', () => {
        expect(polarityScore('P')).toBe('Positive')
    })
    test('Testing polarityScore()', () => {
            expect(polarityScore('N')).toBe('Neutral')
    })
    test('Testing polarityScore()', () => {
        expect(polarityScore('P-')).toBe('Negative')
    })
    test('Testing polarityScore()', () => {
        expect(polarityScore('P--')).toBe('Strongly Negative')
    })
    test('Testing polarityScore()', () => {
        expect(polarityScore('N/A')).toBe('None')
    })
});
