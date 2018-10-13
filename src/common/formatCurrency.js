export const formatCurrency = num =>
	new Intl.NumberFormat('en-EN', { currency: 'GBP' }).format(num);
