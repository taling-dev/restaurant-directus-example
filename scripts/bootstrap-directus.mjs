import process from 'node:process';

const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL ?? 'http://localhost:8055').replace(
	/\/$/,
	''
);
const DIRECTUS_EMAIL = process.env.DIRECTUS_ADMIN_EMAIL;
const DIRECTUS_PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD;
const shouldSeed = process.argv.includes('--seed');

if (!DIRECTUS_EMAIL || !DIRECTUS_PASSWORD) {
	console.error('Missing DIRECTUS_ADMIN_EMAIL or DIRECTUS_ADMIN_PASSWORD.');
	process.exit(1);
}

const collections = [
	{
		collection: 'site_settings',
		meta: { icon: 'storefront', note: 'Global restaurant settings', singleton: true },
		fields: [
			field('name'),
			field('tagline', 'text'),
			field('currency_code', 'string'),
			field('phone'),
			field('email'),
			jsonField('address_lines'),
			field('location_note', 'text'),
			field('reservation_url'),
			field('maps_url'),
			field('whatsapp_url'),
			field('hero_badge'),
			field('hero_title'),
			field('hero_body', 'text'),
			field('hero_primary_label'),
			field('hero_primary_url'),
			field('hero_secondary_label'),
			field('hero_secondary_url'),
			field('story_heading'),
			field('story_body', 'text'),
			field('about_title'),
			field('about_body', 'text'),
			field('seo_title'),
			field('seo_description', 'text'),
			field('footer_note', 'text'),
			jsonField('socials')
		]
	},
	{
		collection: 'homepage_sections',
		meta: { icon: 'view_agenda', note: 'Editable homepage blocks' },
		fields: [
			field('section_type'),
			field('eyebrow'),
			field('title'),
			field('body', 'text'),
			field('cta_label'),
			field('cta_url'),
			field('secondary_label'),
			field('secondary_url'),
			field('image_url'),
			numberField('sort')
		]
	},
	{
		collection: 'menu_categories',
		meta: { icon: 'restaurant_menu' },
		fields: [
			field('name'),
			field('slug'),
			field('description', 'text'),
			field('image_url'),
			numberField('sort'),
			booleanField('active')
		]
	},
	{
		collection: 'menu_items',
		meta: { icon: 'lunch_dining' },
		fields: [
			field('name'),
			field('slug'),
			field('description', 'text'),
			decimalField('price'),
			decimalField('promo_price', true),
			field('image_url'),
			field('category_slug'),
			jsonField('labels'),
			numberField('heat_level'),
			booleanField('featured'),
			booleanField('available'),
			numberField('sort')
		]
	},
	{
		collection: 'promotions',
		meta: { icon: 'local_offer' },
		fields: [
			field('title'),
			field('slug'),
			field('short_description', 'text'),
			field('full_description', 'text'),
			field('image_url'),
			dateField('start_date', true),
			dateField('end_date', true),
			field('cta_label'),
			field('cta_url'),
			booleanField('featured'),
			booleanField('active')
		]
	},
	{
		collection: 'business_hours',
		meta: { icon: 'schedule' },
		fields: [
			field('day'),
			field('open'),
			field('close'),
			booleanField('closed'),
			field('note', 'text'),
			numberField('sort')
		]
	},
	{
		collection: 'gallery_items',
		meta: { icon: 'photo_library' },
		fields: [field('image_url'), field('alt_text'), field('caption', 'text'), numberField('sort')]
	}
];

const seedRecords = {
	site_settings: [
		{
			name: 'Ember & Fig',
			tagline: 'Neighborhood fire-kitchen with seasonal cocktails and late-night glow.',
			currency_code: 'USD',
			phone: '+1 212 555 0188',
			email: 'hello@emberandfig.com',
			address_lines: ['214 Orchard Street', 'Lower East Side, New York, NY'],
			location_note: 'Steps from Delancey-Essex with dinner service until late.',
			reservation_url: 'https://www.opentable.com/',
			maps_url: 'https://maps.google.com/?q=214+Orchard+Street+New+York+NY',
			whatsapp_url: 'https://wa.me/12125550188',
			hero_badge: 'Seasonal plates. Late pours. Warm room.',
			hero_title: 'A restaurant site made for nightly menu edits and promo drops.',
			hero_body: 'Swap in tasting menus, promos, and gallery moments without touching code.',
			hero_primary_label: 'Book a table',
			hero_primary_url: 'https://www.opentable.com/',
			hero_secondary_label: 'View the menu',
			hero_secondary_url: '/menu',
			story_heading: 'Built for operators who change offers often.',
			story_body: 'Menus, promos, and service information stay editable in one place.',
			about_title: 'A hospitality brand with a little heat and a lot of rhythm.',
			about_body:
				'This seed content gives the site enough material to show the intended editorial structure.',
			seo_title: 'Ember & Fig | Seasonal Restaurant Website Demo',
			seo_description:
				'A Directus-powered restaurant website demo with menus, promos, hours, and gallery content.',
			footer_note: 'Happy hour every weekday from 5-7pm. Private dining inquiries welcome.',
			socials: [
				{ label: 'Instagram', url: 'https://instagram.com/' },
				{ label: 'TikTok', url: 'https://tiktok.com/' },
				{ label: 'OpenTable', url: 'https://www.opentable.com/' }
			]
		}
	],
	homepage_sections: [
		{
			section_type: 'hero',
			eyebrow: 'Tonight’s mood',
			title: 'Menus that change fast deserve a CMS that does too.',
			body: 'Swap in weekend specials, tasting menus, and event promos without redeploying the site.',
			cta_label: 'See promos',
			cta_url: '/promos',
			secondary_label: 'Plan your visit',
			secondary_url: '/contact',
			image_url:
				'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
			sort: 1
		}
	],
	menu_categories: [
		{
			name: 'Small Plates',
			slug: 'small-plates',
			description: 'Raw bar, vegetables, and snacks designed to start the table strong.',
			image_url:
				'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80',
			sort: 1,
			active: true
		},
		{
			name: 'Wood-Fired Mains',
			slug: 'wood-fired-mains',
			description: 'Charcoal-cooked proteins and vegetables with bright sauces and market sides.',
			image_url:
				'https://images.unsplash.com/photo-1559847844-d721426d6edc?auto=format&fit=crop&w=1200&q=80',
			sort: 2,
			active: true
		}
	],
	menu_items: [
		{
			name: 'Charred carrots with whipped feta',
			slug: 'charred-carrots',
			description: 'Hot honey, pistachio dukkah, mint, and citrus.',
			price: 15,
			promo_price: null,
			image_url:
				'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=900&q=80',
			category_slug: 'small-plates',
			labels: ['Vegetarian', 'Best seller'],
			heat_level: 1,
			featured: true,
			available: true,
			sort: 1
		},
		{
			name: 'Half chicken over ember jus',
			slug: 'half-chicken',
			description: 'Roasted lemon, grilled scallion, and crispy potatoes.',
			price: 31,
			promo_price: 27,
			image_url:
				'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80',
			category_slug: 'wood-fired-mains',
			labels: ['Featured', 'Dinner'],
			heat_level: 1,
			featured: true,
			available: true,
			sort: 2
		}
	],
	promotions: [
		{
			title: 'Golden Hour Pairing',
			slug: 'golden-hour-pairing',
			short_description: 'Weekday cocktail and snack pairing from 5pm to 7pm.',
			full_description: 'Feature rotating bar snacks and signature pours for the after-work crowd.',
			image_url:
				'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80',
			start_date: '2026-05-01',
			end_date: '2026-08-31',
			cta_label: 'See details',
			cta_url: '/promos',
			featured: true,
			active: true
		}
	],
	business_hours: [
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
	],
	gallery_items: [
		{
			image_url:
				'https://images.unsplash.com/photo-1515669097368-22e68427d265?auto=format&fit=crop&w=1200&q=80',
			alt_text: 'Guests dining in a warmly lit restaurant',
			caption: 'A warm room with a little low-light drama.',
			sort: 1
		},
		{
			image_url:
				'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
			alt_text: 'Cocktails on a bar counter',
			caption: 'Promote the bar program as aggressively as the kitchen.',
			sort: 2
		}
	]
};

const token = await login();

for (const collection of collections) {
	await ensureCollection(token, collection);
	for (const currentField of collection.fields) {
		await ensureField(token, collection.collection, currentField);
	}
}

if (shouldSeed) {
	for (const [collection, items] of Object.entries(seedRecords)) {
		await seedCollection(token, collection, items);
	}
}

console.log('Directus bootstrap complete.');

function field(name, interfaceType = 'input') {
	return {
		field: name,
		type: 'string',
		meta: {
			interface: interfaceType,
			width: 'full'
		},
		schema: {
			name,
			data_type: 'varchar',
			max_length: 255
		}
	};
}

function jsonField(name) {
	return {
		field: name,
		type: 'json',
		meta: {
			interface: 'input-code',
			options: { language: 'json' },
			width: 'full'
		},
		schema: {
			name,
			data_type: 'json'
		}
	};
}

function numberField(name) {
	return {
		field: name,
		type: 'integer',
		meta: {
			interface: 'input',
			width: 'half'
		},
		schema: {
			name,
			data_type: 'integer'
		}
	};
}

function decimalField(name, nullable = false) {
	return {
		field: name,
		type: 'decimal',
		meta: {
			interface: 'input',
			width: 'half'
		},
		schema: {
			name,
			data_type: 'decimal',
			numeric_precision: 10,
			numeric_scale: 2,
			is_nullable: nullable
		}
	};
}

function booleanField(name) {
	return {
		field: name,
		type: 'boolean',
		meta: {
			interface: 'boolean',
			width: 'half'
		},
		schema: {
			name,
			data_type: 'boolean',
			default_value: false
		}
	};
}

function dateField(name, nullable = false) {
	return {
		field: name,
		type: 'date',
		meta: {
			interface: 'datetime',
			width: 'half'
		},
		schema: {
			name,
			data_type: 'date',
			is_nullable: nullable
		}
	};
}

async function login() {
	const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email: DIRECTUS_EMAIL, password: DIRECTUS_PASSWORD })
	});

	if (!response.ok) {
		throw new Error(`Unable to log in to Directus: ${response.status} ${response.statusText}`);
	}

	const payload = await response.json();
	return payload.data.access_token;
}

async function ensureCollection(token, collection) {
	const existing = await fetchJson(`/collections/${collection.collection}`, token, {
		allowNotFound: true
	});
	if (existing) {
		console.log(`Collection exists: ${collection.collection}`);
		return;
	}

	await fetchJson('/collections', token, {
		method: 'POST',
		body: {
			collection: collection.collection,
			meta: collection.meta,
			schema: { name: collection.collection }
		}
	});

	console.log(`Created collection: ${collection.collection}`);
}

async function ensureField(token, collection, fieldConfig) {
	const existing = await fetchJson(`/fields/${collection}/${fieldConfig.field}`, token, {
		allowNotFound: true
	});
	if (existing) {
		return;
	}

	await fetchJson(`/fields/${collection}`, token, {
		method: 'POST',
		body: fieldConfig
	});
	console.log(`Created field: ${collection}.${fieldConfig.field}`);
}

async function seedCollection(token, collection, items) {
	const existing = await fetchJson(`/items/${collection}?limit=1`, token);
	if (Array.isArray(existing?.data) && existing.data.length > 0) {
		console.log(`Seed skipped for ${collection}; records already exist.`);
		return;
	}

	await fetchJson(`/items/${collection}`, token, {
		method: 'POST',
		body: items
	});
	console.log(`Seeded ${collection}`);
}

async function fetchJson(path, token, options = {}) {
	const response = await fetch(`${DIRECTUS_URL}${path}`, {
		method: options.method ?? 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: options.body ? JSON.stringify(options.body) : undefined
	});

	if (response.status === 404 && options.allowNotFound) {
		return null;
	}

	if (!response.ok) {
		const details = await response.text();
		throw new Error(`Directus API error for ${path}: ${response.status} ${details}`);
	}

	return response.status === 204 ? null : response.json();
}
