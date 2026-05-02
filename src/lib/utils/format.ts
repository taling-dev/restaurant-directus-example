import type { BusinessHour, Promotion } from '$lib/types/content';

export function formatCurrency(amount: number, currencyCode = 'USD') {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currencyCode,
		maximumFractionDigits: 0
	}).format(amount);
}

export function formatServiceWindow(entry: BusinessHour) {
	if (entry.closed) {
		return 'Closed';
	}

	return `${formatTime(entry.open)} - ${formatTime(entry.close)}`;
}

export function formatPromotionWindow(promotion: Promotion) {
	if (!promotion.startDate && !promotion.endDate) {
		return 'Available now';
	}

	const start = promotion.startDate ? formatShortDate(promotion.startDate) : 'Now';
	const end = promotion.endDate ? formatShortDate(promotion.endDate) : 'ongoing';

	return `${start} - ${end}`;
}

export function isPromotionCurrent(promotion: Promotion) {
	const now = new Date();
	const start = promotion.startDate ? new Date(promotion.startDate) : null;
	const end = promotion.endDate ? new Date(`${promotion.endDate}T23:59:59`) : null;

	if (start && now < start) {
		return false;
	}

	if (end && now > end) {
		return false;
	}

	return promotion.active;
}

function formatTime(value: string) {
	const [hours, minutes] = value.split(':').map(Number);
	const date = new Date();
	date.setHours(hours ?? 0, minutes ?? 0, 0, 0);

	return new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: '2-digit'
	}).format(date);
}

function formatShortDate(value: string) {
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric'
	}).format(new Date(value));
}
