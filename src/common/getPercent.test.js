import { getPercent } from './getPercent';

describe('Test getPercent component', () => {
	test('getPercent has the correct text', () => {
		expect(getPercent(10, 100)).toBe(10);
		expect(getPercent(100, 100)).toBe(100);
		expect(getPercent(2.5, 10)).toBe(25);
	});
});
