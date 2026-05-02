import { describe, expect, it } from 'vitest';
import { toSrcset } from '$lib/utils/image';

describe('image helpers', () => {
	it('emits smaller responsive candidates for Unsplash images', () => {
		const srcset = toSrcset('https://images.unsplash.com/photo-123?auto=format&fit=crop', {
			ratio: 4 / 3
		});

		expect(srcset).toContain('w=320');
		expect(srcset).toContain('w=768');
		expect(srcset).toContain('q=78');
	});

	it('emits smaller responsive candidates for Directus assets', () => {
		const srcset = toSrcset(
			'https://cms.example.com/assets/abc123?width=800&quality=82&format=auto',
			{ ratio: 4 / 3 }
		);

		expect(srcset).toContain('width=320');
		expect(srcset).toContain('width=768');
		expect(srcset).toContain('quality=78');
	});
});
