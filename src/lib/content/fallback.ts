import type {
	BusinessHour,
	GalleryItem,
	HomepageSection,
	MenuCategory,
	MenuItem,
	Promotion,
	SiteSettings
} from '$lib/types/content';

export const fallbackSite: SiteSettings = {
	name: 'Ember & Fig',
	tagline: 'Neighborhood fire-kitchen with seasonal cocktails and late-night glow.',
	currencyCode: 'USD',
	phone: '+1 212 555 0188',
	email: 'hello@emberandfig.com',
	addressLines: ['214 Orchard Street', 'Lower East Side, New York, NY'],
	locationNote: 'Steps from Delancey-Essex with dinner service until late.',
	reservationUrl: 'https://www.opentable.com/',
	mapsUrl: 'https://maps.google.com/?q=214+Orchard+Street+New+York+NY',
	whatsappUrl: 'https://wa.me/12125550188',
	heroBadge: 'Seasonal plates. Late pours. Warm room.',
	heroTitle: 'A restaurant site made for nightly menu edits and promo drops.',
	heroBody:
		'Ember & Fig blends wood-fired mains, bright market vegetables, and a bar program designed for long dinners and quick walk-ins alike.',
	heroPrimaryLabel: 'Book a table',
	heroPrimaryUrl: 'https://www.opentable.com/',
	heroSecondaryLabel: 'View the menu',
	heroSecondaryUrl: '/menu',
	storyHeading: 'Built for operators who change offers as often as the weather changes.',
	storyBody:
		'Use Directus to update signature dishes, lunch specials, brunch promos, private dining callouts, and all the details guests care about before they visit.',
	aboutTitle: 'A hospitality brand with a little heat and a lot of rhythm.',
	aboutBody:
		'Ember & Fig is imagined as a modern neighborhood restaurant: open kitchen energy, charcoal-led dishes, and a website that helps guests decide quickly whether they are coming for lunch, cocktails, or a full dinner reservation.',
	seoTitle: 'Ember & Fig | Seasonal Restaurant Website Demo',
	seoDescription:
		'A Directus-powered SvelteKit restaurant website with menus, promotions, hours, gallery content, and reservation CTAs.',
	footerNote: 'Happy hour every weekday from 5-7pm. Private dining inquiries welcome.',
	socials: [
		{ label: 'Instagram', url: 'https://instagram.com/' },
		{ label: 'TikTok', url: 'https://tiktok.com/' },
		{ label: 'OpenTable', url: 'https://www.opentable.com/' }
	]
};

export const fallbackSections: HomepageSection[] = [
	{
		id: 'hero',
		sectionType: 'hero',
		eyebrow: 'Tonight’s mood',
		title: 'Menus that change fast deserve a CMS that does too.',
		body: 'Swap in weekend specials, tasting menus, and event promos without redeploying the site.',
		ctaLabel: 'See promos',
		ctaUrl: '/promos',
		secondaryLabel: 'Plan your visit',
		secondaryUrl: '/contact',
		imageUrl:
			'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
		sort: 1
	},
	{
		id: 'story',
		sectionType: 'story',
		eyebrow: 'For restaurant teams',
		title: 'Menus, promos, and gallery updates all come from structured content.',
		body: 'That means your homepage can stay polished while staff still get simple forms for prices, descriptions, hours, and limited-time offers.',
		sort: 2
	},
	{
		id: 'contact-cta',
		sectionType: 'contact-cta',
		eyebrow: 'Reservations and events',
		title: 'Turn homepage traffic into bookings.',
		body: 'Add a direct reservation link, private dining inquiry flow, or messaging CTA based on how your team books tables.',
		ctaLabel: 'Reserve now',
		ctaUrl: 'https://www.opentable.com/',
		sort: 3
	}
];

export const fallbackCategories: MenuCategory[] = [
	{
		name: 'Small Plates',
		slug: 'small-plates',
		description: 'Raw bar, vegetables, and snacks designed to start the table strong.',
		imageUrl:
			'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80',
		sort: 1,
		active: true
	},
	{
		name: 'Wood-Fired Mains',
		slug: 'wood-fired-mains',
		description: 'Charcoal-cooked proteins and vegetables with bright sauces and market sides.',
		imageUrl:
			'https://images.unsplash.com/photo-1559847844-d721426d6edc?auto=format&fit=crop&w=1200&q=80',
		sort: 2,
		active: true
	},
	{
		name: 'Cocktails & Zero-Proof',
		slug: 'cocktails',
		description: 'House drinks, spritzes, nightcaps, and non-alcoholic signatures.',
		imageUrl:
			'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
		sort: 3,
		active: true
	}
];

export const fallbackItems: MenuItem[] = [
	{
		name: 'Charred carrots with whipped feta',
		slug: 'charred-carrots',
		description: 'Hot honey, pistachio dukkah, mint, and citrus.',
		price: 15,
		promoPrice: null,
		imageUrl:
			'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=900&q=80',
		categorySlug: 'small-plates',
		labels: ['Vegetarian', 'Best seller'],
		heatLevel: 1,
		featured: true,
		available: true,
		sort: 1
	},
	{
		name: 'Yellowtail crudo',
		slug: 'yellowtail-crudo',
		description: 'Calabrian chili oil, grapefruit, and crispy shallot.',
		price: 19,
		promoPrice: null,
		imageUrl:
			'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
		categorySlug: 'small-plates',
		labels: ['Gluten free'],
		heatLevel: 2,
		featured: false,
		available: true,
		sort: 2
	},
	{
		name: 'Half chicken over ember jus',
		slug: 'half-chicken',
		description: 'Roasted lemon, grilled scallion, and crispy potatoes.',
		price: 31,
		promoPrice: 27,
		imageUrl:
			'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80',
		categorySlug: 'wood-fired-mains',
		labels: ['Featured', 'Dinner'],
		heatLevel: 1,
		featured: true,
		available: true,
		sort: 3
	},
	{
		name: 'Miso-glazed salmon',
		slug: 'miso-salmon',
		description: 'Coconut rice, charred greens, and pickled cucumber.',
		price: 34,
		promoPrice: null,
		imageUrl:
			'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
		categorySlug: 'wood-fired-mains',
		labels: ['Gluten free'],
		heatLevel: 1,
		featured: true,
		available: true,
		sort: 4
	},
	{
		name: 'Smoked pineapple spritz',
		slug: 'pineapple-spritz',
		description: 'Rum, pineapple, amaro, lime, and smoked salt.',
		price: 16,
		promoPrice: 13,
		imageUrl:
			'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80',
		categorySlug: 'cocktails',
		labels: ['Happy hour'],
		heatLevel: 0,
		featured: false,
		available: true,
		sort: 5
	},
	{
		name: 'Midnight fig old fashioned',
		slug: 'fig-old-fashioned',
		description: 'Bourbon, black fig syrup, bitters, and orange peel.',
		price: 18,
		promoPrice: null,
		imageUrl:
			'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80',
		categorySlug: 'cocktails',
		labels: ['House favorite'],
		heatLevel: 0,
		featured: true,
		available: true,
		sort: 6
	}
];

export const fallbackPromotions: Promotion[] = [
	{
		title: 'Golden Hour Pairing',
		slug: 'golden-hour-pairing',
		shortDescription: 'Weekday cocktail and snack pairing from 5pm to 7pm.',
		fullDescription:
			'Feature rotating bar snacks and signature pours for the after-work crowd without changing the page structure.',
		imageUrl:
			'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80',
		startDate: '2026-05-01',
		endDate: '2026-08-31',
		ctaLabel: 'See details',
		ctaUrl: '/promos',
		featured: true,
		active: true
	},
	{
		title: 'Weekend Brunch Flights',
		slug: 'weekend-brunch-flights',
		shortDescription: 'Mini cocktails and share plates for late mornings.',
		fullDescription:
			'A useful example of a timed campaign that should disappear automatically once the end date passes.',
		imageUrl:
			'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80',
		startDate: '2026-05-01',
		endDate: '2026-07-31',
		ctaLabel: 'Reserve brunch',
		ctaUrl: 'https://www.opentable.com/',
		featured: true,
		active: true
	},
	{
		title: 'Private Dining Preview',
		slug: 'private-dining-preview',
		shortDescription: 'A polished callout for birthdays, launches, and rehearsal dinners.',
		fullDescription:
			'This slot can highlight event packages, private room minimums, or buyout inquiries with clear next steps.',
		imageUrl:
			'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80',
		ctaLabel: 'Contact the team',
		ctaUrl: '/contact',
		featured: false,
		active: true
	}
];

export const fallbackHours: BusinessHour[] = [
	{ day: 'Monday', open: '17:00', close: '22:00', closed: false, sort: 1 },
	{ day: 'Tuesday', open: '17:00', close: '22:00', closed: false, sort: 2 },
	{ day: 'Wednesday', open: '17:00', close: '22:00', closed: false, sort: 3 },
	{ day: 'Thursday', open: '17:00', close: '23:00', closed: false, sort: 4 },
	{ day: 'Friday', open: '17:00', close: '23:30', closed: false, sort: 5 },
	{
		day: 'Saturday',
		open: '11:00',
		close: '23:30',
		closed: false,
		note: 'Brunch until 15:00',
		sort: 6
	},
	{
		day: 'Sunday',
		open: '11:00',
		close: '21:00',
		closed: false,
		note: 'Brunch until 15:00',
		sort: 7
	}
];

export const fallbackGallery: GalleryItem[] = [
	{
		imageUrl:
			'https://images.unsplash.com/photo-1515669097368-22e68427d265?auto=format&fit=crop&w=1200&q=80',
		altText: 'Guests dining in a warmly lit restaurant',
		caption: 'A warm room with a little low-light drama.',
		sort: 1
	},
	{
		imageUrl:
			'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
		altText: 'Cocktails on a bar counter',
		caption: 'Promote the bar program as aggressively as the kitchen.',
		sort: 2
	},
	{
		imageUrl:
			'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
		altText: 'Plated main course on a dark table',
		caption: 'Upload fresh hero dishes without touching code.',
		sort: 3
	},
	{
		imageUrl:
			'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
		altText: 'Restaurant interior and lighting detail',
		caption: 'Give guests a feel for the room before they visit.',
		sort: 4
	}
];
