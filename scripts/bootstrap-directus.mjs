import process from 'node:process';

const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL ?? 'http://localhost:8055').replace(
	/\/$/,
	''
);
const DIRECTUS_ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN ?? process.env.DIRECTUS_TOKEN;
const DIRECTUS_EMAIL = process.env.DIRECTUS_ADMIN_EMAIL;
const DIRECTUS_PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD;
const shouldSeed = process.argv.includes('--seed');
const shouldRepairBroken =
	process.argv.includes('--repair-broken') ||
	process.env.DIRECTUS_BOOTSTRAP_REPAIR_BROKEN === 'true';
let currentIdentity = null;

if (!DIRECTUS_ADMIN_TOKEN && (!DIRECTUS_EMAIL || !DIRECTUS_PASSWORD)) {
	console.error(
		'Missing bootstrap credentials. Set DIRECTUS_ADMIN_TOKEN, or set DIRECTUS_ADMIN_EMAIL and DIRECTUS_ADMIN_PASSWORD.'
	);
	process.exit(1);
}

const collections = [
	{
		collection: 'site_settings',
		meta: { icon: 'storefront', note: 'Global restaurant settings', singleton: true },
		fields: [
			stringField('name'),
			textField('tagline'),
			stringField('currency_code'),
			stringField('phone'),
			stringField('email'),
			jsonField('address_lines'),
			textField('location_note'),
			stringField('reservation_url'),
			stringField('maps_url'),
			stringField('whatsapp_url'),
			stringField('hero_badge'),
			stringField('hero_title'),
			textField('hero_body'),
			fileField('hero_image'),
			stringField('hero_primary_label'),
			stringField('hero_primary_url'),
			stringField('hero_secondary_label'),
			stringField('hero_secondary_url'),
			stringField('story_heading'),
			textField('story_body'),
			stringField('about_title'),
			textField('about_body'),
			fileField('about_image'),
			stringField('promos_eyebrow'),
			stringField('promos_title'),
			textField('promos_body'),
			stringField('menu_eyebrow'),
			stringField('menu_title'),
			textField('menu_body'),
			stringField('gallery_eyebrow'),
			stringField('gallery_title'),
			textField('gallery_body'),
			stringField('contact_eyebrow'),
			stringField('contact_title'),
			textField('contact_body'),
			stringField('chef_pick_label'),
			stringField('chef_pick_item_slug'),
			jsonField('stats_cards'),
			jsonField('nav_links'),
			jsonField('about_cards'),
			stringField('hours_heading'),
			stringField('connect_heading'),
			stringField('accent_color'),
			stringField('dark_color'),
			fileField('favicon'),
			fileField('logo'),
			stringField('seo_title'),
			textField('seo_description'),
			textField('footer_note'),
			jsonField('socials')
		]
	},
	{
		collection: 'homepage_sections',
		meta: { icon: 'view_agenda', note: 'Editable homepage blocks' },
		fields: [
			stringField('section_type'),
			stringField('eyebrow'),
			stringField('title'),
			textField('body'),
			stringField('cta_label'),
			stringField('cta_url'),
			stringField('secondary_label'),
			stringField('secondary_url'),
			fileField('image'),
			stringField('image_url'),
			numberField('sort')
		]
	},
	{
		collection: 'menu_categories',
		meta: { icon: 'restaurant_menu' },
		fields: [
			stringField('name'),
			stringField('slug'),
			textField('description'),
			fileField('image'),
			stringField('image_url'),
			numberField('sort'),
			booleanField('active')
		]
	},
	{
		collection: 'menu_items',
		meta: { icon: 'lunch_dining' },
		fields: [
			stringField('name'),
			stringField('slug'),
			textField('description'),
			decimalField('price'),
			decimalField('promo_price', true),
			fileField('image'),
			stringField('image_url'),
			stringField('category_slug'),
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
			stringField('title'),
			stringField('slug'),
			textField('short_description'),
			textField('full_description'),
			fileField('image'),
			stringField('image_url'),
			dateField('start_date', true),
			dateField('end_date', true),
			stringField('cta_label'),
			stringField('cta_url'),
			booleanField('featured'),
			booleanField('active')
		]
	},
	{
		collection: 'business_hours',
		meta: { icon: 'schedule' },
		fields: [
			stringField('day'),
			stringField('open'),
			stringField('close'),
			booleanField('closed'),
			textField('note'),
			numberField('sort')
		]
	},
	{
		collection: 'gallery_items',
		meta: { icon: 'photo_library' },
		fields: [
			fileField('image'),
			stringField('image_url'),
			stringField('alt_text'),
			textField('caption'),
			numberField('sort')
		]
	}
];

const seedStrategies = {
	site_settings: { type: 'singleton' },
	homepage_sections: { type: 'by-key', key: 'section_type' },
	menu_categories: { type: 'by-key', key: 'slug' },
	menu_items: { type: 'by-key', key: 'slug' },
	promotions: { type: 'by-key', key: 'slug' },
	business_hours: { type: 'by-key', key: 'day' },
	gallery_items: { type: 'by-key', key: 'sort' }
};

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

const token = await getAccessToken();
await loadCurrentIdentity(token);
await assertSchemaAccess(token);
await clearInternalCache(token);

for (const collection of collections) {
	const created = await ensureCollection(token, collection);

	if (created) {
		await clearInternalCache(token);
		continue;
	}

	let existingFields;

	try {
		existingFields = await waitForCollectionFields(token, collection, created);
	} catch (error) {
		if (shouldRepairBroken && isBrokenCollectionError(error)) {
			await repairBrokenCollection(token, collection);
			continue;
		}

		throw error;
	}

	const existingFieldNames = new Set(
		Array.isArray(existingFields?.data)
			? existingFields.data.map((field) => field.field).filter(Boolean)
			: []
	);

	for (const currentField of collection.fields) {
		if (existingFieldNames.has(currentField.field)) {
			continue;
		}

		await createField(token, collection.collection, currentField);
		existingFieldNames.add(currentField.field);
	}
}

await clearInternalCache(token);

if (shouldSeed) {
	for (const [collection, items] of Object.entries(seedRecords)) {
		await seedCollection(token, collection, items);
	}
}

console.log('Directus bootstrap complete.');

function stringField(name) {
	return {
		field: name,
		type: 'string',
		meta: {
			interface: 'input',
			width: 'full'
		},
		schema: {
			name,
			data_type: 'varchar',
			max_length: 255
		}
	};
}

function textField(name) {
	return {
		field: name,
		type: 'text',
		meta: {
			interface: 'input-multiline',
			width: 'full'
		},
		schema: {
			name,
			data_type: 'text'
		}
	};
}

function fileField(name) {
	return {
		field: name,
		type: 'uuid',
		meta: {
			special: ['file'],
			interface: 'file-image',
			width: 'full'
		},
		schema: {
			name,
			data_type: 'uuid',
			is_nullable: true
		}
	};
}

function idField() {
	return {
		field: 'id',
		type: 'integer',
		meta: {
			hidden: true,
			readonly: true,
			interface: 'input',
			special: ['auto-increment']
		},
		schema: {
			is_primary_key: true,
			has_auto_increment: true
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

async function getAccessToken() {
	if (DIRECTUS_ADMIN_TOKEN) {
		console.log('Using DIRECTUS_ADMIN_TOKEN for Directus bootstrap authentication.');
		return DIRECTUS_ADMIN_TOKEN;
	}

	return login();
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

async function loadCurrentIdentity(token) {
	try {
		const payload = await fetchJson('/users/me?fields=id,email,role.id,role.name', token);
		currentIdentity = payload?.data ?? null;

		if (!currentIdentity) {
			return;
		}

		const roleName = currentIdentity.role?.name ?? 'unknown';
		console.log(
			`Authenticated as ${currentIdentity.email ?? currentIdentity.id} (role: ${roleName})`
		);
	} catch {
		console.warn('Authenticated, but could not inspect Directus user identity.');
	}
}

async function assertSchemaAccess(token) {
	const response = await fetch(`${DIRECTUS_URL}/collections?limit=1`, {
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/json'
		}
	});

	if (response.ok) {
		return;
	}

	const details = await response.text();
	throw new Error(
		[
			`Schema access preflight failed: GET /collections returned ${response.status} ${details}`,
			currentIdentity
				? `Authenticated identity: ${currentIdentity.email ?? currentIdentity.id} (role: ${currentIdentity.role?.name ?? 'unavailable'})`
				: 'Authenticated identity could not be inspected.',
			'In Directus v11, admin access is policy-based and role details may be hidden on /users/me. Compare the returned user ID with the user in the Directus admin UI and verify that user has the expected Administrator access policy.',
			'If the token belongs to the correct admin user but /collections still returns 403, you are likely pointing at the wrong Directus instance or using a token from a different project or environment.'
		].join('\n')
	);
}

async function ensureCollection(token, collection) {
	const existing = await fetchJson(
		`/collections?filter[collection][_eq]=${encodeURIComponent(collection.collection)}&limit=1`,
		token
	);
	const existingCollection = Array.isArray(existing?.data) ? existing.data[0] : null;
	if (existingCollection) {
		console.log(`Collection exists: ${collection.collection}`);
		return false;
	}

	await createCollection(token, collection);
	return true;
}

async function createField(token, collection, fieldConfig) {
	await fetchJson(`/fields/${collection}`, token, {
		method: 'POST',
		body: fieldConfig
	});
	console.log(`Created field: ${collection}.${fieldConfig.field}`);
}

async function waitForCollectionFields(
	token,
	collectionConfig,
	createdThisRun,
	retries = 10,
	delayMs = 500
) {
	const collection = collectionConfig.collection;
	let lastError = null;

	for (let attempt = 1; attempt <= retries; attempt += 1) {
		try {
			return await fetchJson(`/fields/${collection}`, token);
		} catch (error) {
			lastError = error;

			if (!isMissingCollectionError(error)) {
				throw error;
			}

			if (attempt < retries) {
				await sleep(delayMs);
			}
		}
	}

	throw new Error(
		[
			createdThisRun
				? `Collection "${collection}" was created but its fields endpoint never became available.`
				: `Collection "${collection}" already exists, but its fields endpoint is still unavailable.`,
			createdThisRun
				? 'This usually means Directus has not refreshed the schema cache yet.'
				: 'This usually means the collection was left in a broken partial state by an earlier failed bootstrap or schema change.',
			!createdThisRun
				? shouldRepairBroken
					? `Repair mode is enabled, but the collection still could not be repaired automatically.`
					: `Rerun with --repair-broken to delete and recreate this managed collection automatically, or reset the Directus database if this environment is disposable.`
				: null,
			lastError instanceof Error ? lastError.message : String(lastError)
		]
			.filter(Boolean)
			.join('\n')
	);
}

async function clearInternalCache(token) {
	await fetchJson('/utils/cache/clear?system=true', token, {
		method: 'POST'
	});
	console.log('Cleared Directus internal cache.');
}

async function seedCollection(token, collection, items) {
	const strategy = seedStrategies[collection];

	if (!strategy) {
		throw new Error(`No seed strategy configured for collection "${collection}".`);
	}

	if (strategy.type === 'singleton') {
		const existing = await fetchJson(`/items/${collection}?limit=1&fields=id`, token);
		const existingItem = Array.isArray(existing?.data) ? existing.data[0] : null;
		const payload = items[0];

		if (!payload) {
			return;
		}

		if (existingItem?.id) {
			await fetchJson(`/items/${collection}/${existingItem.id}`, token, {
				method: 'PATCH',
				body: payload
			});
			console.log(`Updated singleton seed for ${collection}`);
			return;
		}

		await fetchJson(`/items/${collection}`, token, {
			method: 'POST',
			body: payload
		});
		console.log(`Created singleton seed for ${collection}`);
		return;
	}

	for (const item of items) {
		const key = strategy.key;
		const value = item[key];
		const filterValue = encodeURIComponent(String(value));
		const existing = await fetchJson(
			`/items/${collection}?limit=1&fields=id&filter[${encodeURIComponent(key)}][_eq]=${filterValue}`,
			token
		);
		const existingItem = Array.isArray(existing?.data) ? existing.data[0] : null;

		if (existingItem?.id) {
			await fetchJson(`/items/${collection}/${existingItem.id}`, token, {
				method: 'PATCH',
				body: item
			});
			console.log(`Updated seed record for ${collection}.${key}=${value}`);
			continue;
		}

		await fetchJson(`/items/${collection}`, token, {
			method: 'POST',
			body: item
		});
		console.log(`Created seed record for ${collection}.${key}=${value}`);
	}
}

async function fetchJson(path, token, options = {}) {
	const response = await fetch(`${DIRECTUS_URL}${path}`, {
		method: options.method ?? 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			'Cache-Control': 'no-store',
			Pragma: 'no-cache'
		},
		body: options.body ? JSON.stringify(options.body) : undefined
	});

	if (response.status === 404 && options.allowNotFound) {
		return null;
	}

	if (!response.ok) {
		const details = await response.text();

		if (
			response.status === 403 &&
			isSchemaWritePath(path) &&
			options.method &&
			options.method !== 'GET'
		) {
			if (options.method === 'DELETE' && path.startsWith('/collections/')) {
				throw new Error(
					[
						`Directus API error for ${path}: ${response.status} ${details}`,
						'This is not necessarily a bad admin token.',
						'Directus can return 403 here when the collection-specific schema view is stale or inconsistent, even while list-based schema endpoints still show the collection.',
						'Clear cache, restart Directus on a single replica, and recheck the collection list before retrying repair.'
					].join('\n')
				);
			}

			throw new Error(
				[
					`Directus API error for ${path}: ${response.status} ${details}`,
					'Authentication succeeded, but this identity does not have permission to modify the Directus schema.',
					'Use a Directus admin account or provide a full-access token via DIRECTUS_ADMIN_TOKEN.',
					'If this is a Coolify deployment, verify the Directus admin user you are logging in as still has the Administrator role.'
				].join('\n')
			);
		}

		throw new Error(`Directus API error for ${path}: ${response.status} ${details}`);
	}

	if (response.status === 204) {
		return null;
	}

	const contentType = response.headers.get('content-type') ?? '';
	const body = await response.text();

	if (body.trim().length === 0) {
		return null;
	}

	if (contentType.includes('application/json')) {
		return JSON.parse(body);
	}

	return body;
}

function isSchemaWritePath(path) {
	return (
		path.startsWith('/collections') || path.startsWith('/fields') || path.startsWith('/relations')
	);
}

function isMissingCollectionError(error) {
	if (!(error instanceof Error)) {
		return false;
	}

	return (
		error.message.includes('Directus API error for /fields/') &&
		error.message.includes('does not exist')
	);
}

function isBrokenCollectionError(error) {
	return error instanceof Error && error.message.includes('fields endpoint is still unavailable');
}

async function repairBrokenCollection(token, collectionConfig) {
	console.warn(`Repairing broken collection: ${collectionConfig.collection}`);
	await clearInternalCache(token);

	const existingBeforeDelete = await getCollectionByName(token, collectionConfig.collection);

	if (!existingBeforeDelete) {
		console.warn(
			`Collection ${collectionConfig.collection} disappeared after cache clear. Recreating it cleanly.`
		);
		await createCollection(token, collectionConfig);
		await clearInternalCache(token);
		return;
	}

	try {
		await fetchJson(`/collections/${collectionConfig.collection}`, token, {
			method: 'DELETE'
		});
	} catch (error) {
		const stillExists = await getCollectionByName(token, collectionConfig.collection);

		if (stillExists) {
			throw new Error(
				[
					`Collection "${collectionConfig.collection}" still appears in list-based schema results, but Directus refused DELETE /collections/${collectionConfig.collection}.`,
					'This points to stale or split schema state inside Directus rather than invalid admin credentials.',
					'Run Directus with a single replica, restart it, keep CACHE_SCHEMA=false during bootstrap if possible, then rerun with --repair-broken.',
					error instanceof Error ? error.message : String(error)
				].join('\n'),
				error instanceof Error ? { cause: error } : undefined
			);
		}

		throw error;
	}

	await clearInternalCache(token);
	await createCollection(token, collectionConfig);
	await clearInternalCache(token);
}

async function getCollectionByName(token, collectionName) {
	const existing = await fetchJson(
		`/collections?filter[collection][_eq]=${encodeURIComponent(collectionName)}&limit=1`,
		token
	);

	return Array.isArray(existing?.data) ? (existing.data[0] ?? null) : null;
}

async function createCollection(token, collection) {
	await fetchJson('/collections', token, {
		method: 'POST',
		body: {
			collection: collection.collection,
			meta: collection.meta,
			schema: {
				name: collection.collection,
				primary_key: 'id'
			},
			fields: [idField(), ...collection.fields]
		}
	});

	console.log(`Created collection: ${collection.collection}`);
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
