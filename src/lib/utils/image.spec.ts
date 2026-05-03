import { describe, expect, it } from 'vitest';
import { CARD_WIDTHS, HERO_WIDTHS, toSrcset } from '$lib/utils/image';

describe('image helpers', () => {
	it('emits responsive candidates for Unsplash images with default quality', () => {
		const srcset = toSrcset('https://images.unsplash.com/photo-123?auto=format&fit=crop');

		expect(srcset).toContain('w=320');
		expect(srcset).toContain('w=640');
		expect(srcset).toContain('q=65');
	});

	it('emits responsive candidates for Directus assets with default quality', () => {
		const srcset = toSrcset(
			'https://cms.example.com/assets/abc123?width=800&quality=82&format=auto'
		);

		expect(srcset).toContain('width=320');
		expect(srcset).toContain('width=640');
		expect(srcset).toContain('quality=65');
	});

	it('uses custom widths when provided', () => {
		const srcset = toSrcset('https://images.unsplash.com/photo-123', {
			widths: HERO_WIDTHS
		});

		expect(srcset).toContain('w=1200');
		expect(srcset).not.toContain('w=1600');
	});

	it('uses custom quality when provided', () => {
		const srcset = toSrcset('https://images.unsplash.com/photo-123', {
			quality: 50
		});

		expect(srcset).toContain('q=50');
	});

	it('caps card widths to avoid over-downloading', () => {
		const srcset = toSrcset('https://images.unsplash.com/photo-123', {
			widths: CARD_WIDTHS
		});

		expect(srcset).toContain('w=320');
		expect(srcset).toContain('w=800');
		expect(srcset).not.toContain('w=960');
	});
});
