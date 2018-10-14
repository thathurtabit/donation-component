import { formatCurrency } from './formatCurrency';

describe('Test formatCurrency component', () => {
	test('formatCurrency has the correct text', () => {
		expect(formatCurrency(1000)).toBe('1,000');
		expect(formatCurrency(1000000)).toBe('1,000,000');
		expect(formatCurrency(123)).toBe('123');
		expect(formatCurrency(99.99)).toBe('99.99');
	});
});
