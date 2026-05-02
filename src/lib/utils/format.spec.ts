import { describe, expect, it } from 'vitest';
import { formatCurrency, formatServiceWindow, isPromotionCurrent } from '$lib/utils/format';

describe('format helpers', () => {
	it('formats currency without cents', () => {
		expect(formatCurrency(27, 'USD')).toBe('$27');
	});

	it('formats service window for open days', () => {
		expect(
			formatServiceWindow({ day: 'Friday', open: '17:00', close: '23:30', closed: false, sort: 5 })
		).toMatch('5:00');
	});

	it('marks an expired promo as inactive', () => {
		expect(
			isPromotionCurrent({
				title: 'Past',
				slug: 'past',
				shortDescription: '',
				fullDescription: '',
				imageUrl: '',
				startDate: '2020-01-01',
				endDate: '2020-01-10',
				featured: false,
				active: true
			})
		).toBe(false);
	});
});
