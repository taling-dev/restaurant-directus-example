import {
	fallbackCategories,
	fallbackGallery,
	fallbackHours,
	fallbackItems,
	fallbackPromotions,
	fallbackSections,
	fallbackSite
} from '$lib/content/fallback';
import type {
	BusinessHour,
	GalleryItem,
	HomeCard,
	HomepageSection,
	MenuCategory,
	MenuItem,
	Promotion,
	SiteSettings
} from '$lib/types/content';
import { isPromotionCurrent } from '$lib/utils/format';
import { readItems, toOptimizedAssetUrl, toDirectusAssetUrl } from '$lib/server/directus';

type JsonRecord = Record<string, unknown>;

export async function getSiteSettings() {
	const raw = await withFallback(
		() => readItems<JsonRecord>('site_settings', { limit: '1' }).then((response) => response.data),
		null
	);

	// Directus returns a single object for singleton collections, not an array.
	// Handle both shapes defensively.
	let record: JsonRecord | null = null;

	if (Array.isArray(raw)) {
		record = raw[0] ?? null;
	} else if (raw !== null && typeof raw === 'object') {
		record = raw as JsonRecord;
	}

	if (!record) {
		return fallbackSite;
	}

	return mapSiteSettings(record);
}

export async function getHomepageSections() {
	const rows = await withFallback(
		() =>
			readItems<JsonRecord>('homepage_sections', {
				sort: 'sort',
				limit: '20'
			}).then((response) => response.data),
		fallbackSections
	);

	return rows.map(mapHomepageSection).sort((left, right) => left.sort - right.sort);
}

export async function getMenuCategories() {
	const rows = await withFallback(
		() =>
			readItems<JsonRecord>('menu_categories', {
				sort: 'sort',
				limit: '50'
			}).then((response) => response.data),
		fallbackCategories
	);

	return rows
		.map(mapMenuCategory)
		.filter((category) => category.active)
		.sort((left, right) => left.sort - right.sort);
}

export async function getMenuItems(categories: MenuCategory[] = fallbackCategories) {
	const rows = await withFallback(
		() =>
			readItems<JsonRecord>('menu_items', {
				sort: 'sort',
				limit: '200'
			}).then((response) => response.data),
		fallbackItems
	);

	return rows
		.map((row) => mapMenuItem(row, categories))
		.filter((item) => item.available)
		.sort((left, right) => left.sort - right.sort);
}

export async function getPromotions() {
	const rows = await withFallback(
		() =>
			readItems<JsonRecord>('promotions', {
				sort: '-featured,start_date',
				limit: '50'
			}).then((response) => response.data),
		fallbackPromotions
	);

	return rows
		.map(mapPromotion)
		.filter(isPromotionCurrent)
		.sort((left, right) => Number(right.featured) - Number(left.featured));
}

export async function getBusinessHours() {
	const rows = await withFallback(
		() =>
			readItems<JsonRecord>('business_hours', {
				sort: 'sort',
				limit: '14'
			}).then((response) => response.data),
		fallbackHours
	);

	return rows.map(mapBusinessHour).sort((left, right) => left.sort - right.sort);
}

export async function getGalleryItems() {
	const rows = await withFallback(
		() =>
			readItems<JsonRecord>('gallery_items', {
				sort: 'sort',
				limit: '20'
			}).then((response) => response.data),
		fallbackGallery
	);

	return rows.map(mapGalleryItem).sort((left, right) => left.sort - right.sort);
}

export async function getHomePageData() {
	const [sections, categories, promotions, gallery] = await Promise.all([
		getHomepageSections(),
		getMenuCategories(),
		getPromotions(),
		getGalleryItems()
	]);
	const items = await getMenuItems(categories);

	return {
		sections,
		categories: categories.slice(0, 3),
		featuredItems: items.filter((item) => item.featured).slice(0, 4),
		promotions: promotions.slice(0, 3),
		gallery: gallery.slice(0, 4)
	};
}

async function withFallback<T>(loader: () => Promise<T>, fallback: T) {
	try {
		return await loader();
	} catch (error) {
		console.warn('Using fallback content because Directus is unavailable or incomplete.', error);
		return fallback;
	}
}

function mapSiteSettings(record: JsonRecord): SiteSettings {
	return {
		id: readOptionalString(record.id),
		name: readString(record.name, fallbackSite.name),
		tagline: readString(record.tagline, fallbackSite.tagline),
		currencyCode: readString(record.currency_code, fallbackSite.currencyCode),
		phone: readString(record.phone, fallbackSite.phone),
		email: readString(record.email, fallbackSite.email),
		addressLines: readList(record.address_lines, fallbackSite.addressLines),
		locationNote: readString(record.location_note, fallbackSite.locationNote),
		reservationUrl: readString(record.reservation_url, fallbackSite.reservationUrl),
		mapsUrl: readString(record.maps_url, fallbackSite.mapsUrl),
		whatsappUrl: readString(record.whatsapp_url, fallbackSite.whatsappUrl),
		heroBadge: readString(record.hero_badge, fallbackSite.heroBadge),
		heroTitle: readString(record.hero_title, fallbackSite.heroTitle),
		heroBody: readString(record.hero_body, fallbackSite.heroBody),
		heroImage:
			toOptimizedAssetUrl(readOptionalString(record.hero_image)) ||
			toOptimizedAssetUrl(readOptionalString(record.hero_image_url)) ||
			fallbackSite.heroImage,
		heroPrimaryLabel: readString(record.hero_primary_label, fallbackSite.heroPrimaryLabel),
		heroPrimaryUrl: readString(record.hero_primary_url, fallbackSite.heroPrimaryUrl),
		heroSecondaryLabel: readString(record.hero_secondary_label, fallbackSite.heroSecondaryLabel),
		heroSecondaryUrl: readString(record.hero_secondary_url, fallbackSite.heroSecondaryUrl),
		storyHeading: readString(record.story_heading, fallbackSite.storyHeading),
		storyEyebrow: readString(record.story_eyebrow, fallbackSite.storyEyebrow),
		storyBody: readString(record.story_body, fallbackSite.storyBody),
		aboutEyebrow: readString(record.about_eyebrow, fallbackSite.aboutEyebrow),
		aboutTitle: readString(record.about_title, fallbackSite.aboutTitle),
		aboutBody: readString(record.about_body, fallbackSite.aboutBody),
		aboutImage:
			toOptimizedAssetUrl(readAssetToken(record.about_image)) ||
			toOptimizedAssetUrl(readOptionalString(record.about_image_url)) ||
			fallbackSite.aboutImage,
		promosEyebrow: readString(record.promos_eyebrow, fallbackSite.promosEyebrow),
		promosTitle: readString(record.promos_title, fallbackSite.promosTitle),
		promosBody: readString(record.promos_body, fallbackSite.promosBody),
		homeCardsEyebrow: readString(record.home_cards_eyebrow, fallbackSite.homeCardsEyebrow),
		homeCardsTitle: readString(record.home_cards_title, fallbackSite.homeCardsTitle),
		homeCardsBody: readString(record.home_cards_body, fallbackSite.homeCardsBody),
		homeCards: readHomeCards(record.home_cards, fallbackSite.homeCards),
		menuEyebrow: readString(record.menu_eyebrow, fallbackSite.menuEyebrow),
		menuTitle: readString(record.menu_title, fallbackSite.menuTitle),
		menuBody: readString(record.menu_body, fallbackSite.menuBody),
		galleryEyebrow: readString(record.gallery_eyebrow, fallbackSite.galleryEyebrow),
		galleryTitle: readString(record.gallery_title, fallbackSite.galleryTitle),
		galleryBody: readString(record.gallery_body, fallbackSite.galleryBody),
		contactEyebrow: readString(record.contact_eyebrow, fallbackSite.contactEyebrow),
		contactTitle: readString(record.contact_title, fallbackSite.contactTitle),
		contactBody: readString(record.contact_body, fallbackSite.contactBody),
		contactCtaEyebrow: readString(record.contact_cta_eyebrow, fallbackSite.contactCtaEyebrow),
		contactCtaTitle: readString(record.contact_cta_title, fallbackSite.contactCtaTitle),
		contactCtaBody: readString(record.contact_cta_body, fallbackSite.contactCtaBody),
		contactCtaButtonLabel: readString(
			record.contact_cta_button_label,
			fallbackSite.contactCtaButtonLabel
		),
		learnMoreLabel: readString(record.learn_more_label, fallbackSite.learnMoreLabel),
		chefPickLabel: readString(record.chef_pick_label, fallbackSite.chefPickLabel),
		chefPickItemSlug: readString(record.chef_pick_item_slug, fallbackSite.chefPickItemSlug),
		statsCards: readStatsCards(record.stats_cards, fallbackSite.statsCards),
		navLinks: readNavLinks(record.nav_links, fallbackSite.navLinks),
		aboutCards: readAboutCards(record.about_cards, fallbackSite.aboutCards),
		hoursHeading: readString(record.hours_heading, fallbackSite.hoursHeading),
		connectHeading: readString(record.connect_heading, fallbackSite.connectHeading),
		accentColor: readString(record.accent_color, fallbackSite.accentColor),
		darkColor: readString(record.dark_color, fallbackSite.darkColor),
		favicon: toOptimizedAssetUrl(readAssetToken(record.favicon)) || fallbackSite.favicon,
		logo: toOptimizedAssetUrl(readAssetToken(record.logo)) || fallbackSite.logo,
		seoTitle: readString(record.seo_title, fallbackSite.seoTitle),
		seoDescription: readString(record.seo_description, fallbackSite.seoDescription),
		footerNote: readString(record.footer_note, fallbackSite.footerNote),
		callLabel: readString(record.call_label, fallbackSite.callLabel),
		reserveLabel: readString(record.reserve_label, fallbackSite.reserveLabel),
		mapLabel: readString(record.map_label, fallbackSite.mapLabel),
		directionsLabel: readString(record.directions_label, fallbackSite.directionsLabel),
		planVisitLabel: readString(record.plan_visit_label, fallbackSite.planVisitLabel),
		messageLabel: readString(record.message_label, fallbackSite.messageLabel),
		featuredLabel: readString(record.featured_label, fallbackSite.featuredLabel),
		aboutExtra: readOptionalString(record.about_extra),
		socials: readSocials(record.socials, fallbackSite.socials)
	};
}

function mapHomepageSection(row: JsonRecord): HomepageSection {
	return {
		id: readString(row.id, crypto.randomUUID()),
		sectionType: readString(row.section_type, 'story') as HomepageSection['sectionType'],
		eyebrow: readString(row.eyebrow, ''),
		title: readString(row.title, ''),
		body: readString(row.body, ''),
		ctaLabel: readOptionalString(row.cta_label),
		ctaUrl: readOptionalString(row.cta_url),
		secondaryLabel: readOptionalString(row.secondary_label),
		secondaryUrl: readOptionalString(row.secondary_url),
		image:
			toOptimizedAssetUrl(readAssetToken(row.image)) ||
			toOptimizedAssetUrl(readOptionalString(row.image_url)),
		imageUrl:
			toOptimizedAssetUrl(readAssetToken(row.image)) ||
			toOptimizedAssetUrl(readOptionalString(row.image_url)),
		sort: readNumber(row.sort, 0)
	};
}

function mapMenuCategory(row: JsonRecord): MenuCategory {
	return {
		id: readOptionalString(row.id),
		name: readString(row.name, 'Menu Category'),
		slug: readString(row.slug, 'menu-category'),
		description: readString(row.description, ''),
		image:
			toOptimizedAssetUrl(readAssetToken(row.image)) ||
			toOptimizedAssetUrl(readOptionalString(row.image_url)) ||
			fallbackCategories[0].imageUrl,
		imageUrl:
			toOptimizedAssetUrl(readAssetToken(row.image)) ||
			toOptimizedAssetUrl(readOptionalString(row.image_url)) ||
			fallbackCategories[0].imageUrl,
		sort: readNumber(row.sort, 0),
		active: readBoolean(row.active, true)
	};
}

function mapMenuItem(row: JsonRecord, categories: MenuCategory[]): MenuItem {
	const categoryToken = readRelationToken(row.category_slug) ?? readRelationToken(row.category);
	const categorySlug = resolveMenuCategorySlug(categoryToken, categories);

	return {
		id: readOptionalString(row.id),
		name: readString(row.name, 'Menu Item'),
		slug: readString(row.slug, 'menu-item'),
		description: readString(row.description, ''),
		price: readNumber(row.price, 0),
		promoPrice: readNullableNumber(row.promo_price),
		image:
			toOptimizedAssetUrl(readAssetToken(row.image)) ||
			toOptimizedAssetUrl(readOptionalString(row.image_url)) ||
			fallbackItems[0].imageUrl,
		imageUrl:
			toOptimizedAssetUrl(readAssetToken(row.image)) ||
			toOptimizedAssetUrl(readOptionalString(row.image_url)) ||
			fallbackItems[0].imageUrl,
		categorySlug,
		labels: readList(row.labels, []),
		heatLevel: readNumber(row.heat_level, 0),
		featured: readBoolean(row.featured, false),
		available: readBoolean(row.available, true),
		sort: readNumber(row.sort, 0)
	};
}

function resolveMenuCategorySlug(value: string | undefined, categories: MenuCategory[]) {
	if (!value) {
		return fallbackCategories[0]?.slug ?? 'small-plates';
	}

	const bySlug = categories.find((category) => category.slug === value);
	if (bySlug) {
		return bySlug.slug;
	}

	const byId = categories.find((category) => category.id === value);
	if (byId) {
		return byId.slug;
	}

	const normalized = value.toLowerCase();
	const byName = categories.find((category) => category.name.toLowerCase() === normalized);
	if (byName) {
		return byName.slug;
	}

	return fallbackCategories.find((category) => category.slug === value)?.slug ?? value;
}

function readRelationToken(value: unknown) {
	if (typeof value === 'string' && value.trim().length > 0) {
		return value;
	}

	if (typeof value === 'object' && value !== null) {
		const record = value as JsonRecord;
		return (
			readOptionalString(record.id) ??
			readOptionalString(record.slug) ??
			readOptionalString(record.name)
		);
	}

	return undefined;
}

function mapPromotion(row: JsonRecord): Promotion {
	return {
		id: readOptionalString(row.id),
		title: readString(row.title, 'Promotion'),
		slug: readString(row.slug, 'promotion'),
		shortDescription: readString(row.short_description, ''),
		fullDescription: readString(row.full_description, ''),
		image:
			toOptimizedAssetUrl(readAssetToken(row.image)) ||
			toOptimizedAssetUrl(readOptionalString(row.image_url)) ||
			fallbackPromotions[0].imageUrl,
		imageUrl:
			toOptimizedAssetUrl(readAssetToken(row.image)) ||
			toOptimizedAssetUrl(readOptionalString(row.image_url)) ||
			fallbackPromotions[0].imageUrl,
		startDate: readOptionalString(row.start_date),
		endDate: readOptionalString(row.end_date),
		ctaLabel: readOptionalString(row.cta_label),
		ctaUrl: readOptionalString(row.cta_url),
		featured: readBoolean(row.featured, false),
		active: readBoolean(row.active, true)
	};
}

function mapBusinessHour(row: JsonRecord): BusinessHour {
	return {
		id: readOptionalString(row.id),
		day: readString(row.day, 'Monday'),
		open: readString(row.open, '17:00'),
		close: readString(row.close, '22:00'),
		closed: readBoolean(row.closed, false),
		note: readOptionalString(row.note),
		sort: readNumber(row.sort, 0)
	};
}

function mapGalleryItem(row: JsonRecord): GalleryItem {
	return {
		id: readOptionalString(row.id),
		image:
			toOptimizedAssetUrl(readAssetToken(row.image)) ||
			toOptimizedAssetUrl(readOptionalString(row.image_url)) ||
			fallbackGallery[0].imageUrl,
		imageUrl:
			toOptimizedAssetUrl(readAssetToken(row.image)) ||
			toOptimizedAssetUrl(readOptionalString(row.image_url)) ||
			fallbackGallery[0].imageUrl,
		altText: readString(row.alt_text, 'Gallery image'),
		caption: readOptionalString(row.caption),
		sort: readNumber(row.sort, 0)
	};
}

function readString(value: unknown, fallback: string) {
	return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}

function readOptionalString(value: unknown) {
	return typeof value === 'string' && value.trim().length > 0 ? value : undefined;
}

function readAssetToken(value: unknown) {
	if (typeof value === 'string' && value.trim().length > 0) {
		return value;
	}

	if (typeof value === 'object' && value !== null) {
		const record = value as JsonRecord;
		return (
			readOptionalString(record.id) ??
			readOptionalString(record.filename_disk) ??
			readOptionalString(record.filename_download)
		);
	}

	return undefined;
}

function readNumber(value: unknown, fallback: number) {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return value;
	}

	if (typeof value === 'string') {
		const parsed = Number(value);
		if (Number.isFinite(parsed)) {
			return parsed;
		}
	}

	return fallback;
}

function readNullableNumber(value: unknown) {
	if (value === null || value === undefined || value === '') {
		return null;
	}

	return readNumber(value, 0);
}

function readBoolean(value: unknown, fallback: boolean) {
	if (typeof value === 'boolean') {
		return value;
	}

	if (typeof value === 'string') {
		return ['true', '1', 'yes'].includes(value.toLowerCase());
	}

	if (typeof value === 'number') {
		return value > 0;
	}

	return fallback;
}

function readList(value: unknown, fallback: string[]) {
	if (Array.isArray(value)) {
		return value.filter((entry): entry is string => typeof entry === 'string' && entry.length > 0);
	}

	if (typeof value === 'string' && value.trim().length > 0) {
		try {
			const parsed = JSON.parse(value);
			if (Array.isArray(parsed)) {
				return parsed.filter(
					(entry): entry is string => typeof entry === 'string' && entry.length > 0
				);
			}
		} catch {
			return value
				.split(',')
				.map((entry) => entry.trim())
				.filter(Boolean);
		}
	}

	return fallback;
}

function readSocials(value: unknown, fallback: SiteSettings['socials']) {
	if (!Array.isArray(value)) {
		return fallback;
	}

	const entries = value
		.map((entry) => {
			if (typeof entry !== 'object' || entry === null) {
				return null;
			}

			const record = entry as JsonRecord;
			const label = readOptionalString(record.label);
			const url = readOptionalString(record.url);

			if (!label || !url) {
				return null;
			}

			return { label, url };
		})
		.filter((entry): entry is SiteSettings['socials'][number] => entry !== null);

	return entries.length > 0 ? entries : fallback;
}

function readStatsCards(value: unknown, fallback: SiteSettings['statsCards']) {
	if (Array.isArray(value)) {
		const entries = value
			.map((entry) => {
				if (typeof entry !== 'object' || entry === null) return null;
				const record = entry as JsonRecord;
				const label = readOptionalString(record.label);
				const title = readOptionalString(record.title);
				if (!label || !title) return null;
				return { label, title };
			})
			.filter((entry): entry is SiteSettings['statsCards'][number] => entry !== null);
		return entries.length > 0 ? entries : fallback;
	}

	if (typeof value === 'string' && value.trim().length > 0) {
		try {
			const parsed = JSON.parse(value);
			if (Array.isArray(parsed)) {
				return readStatsCards(parsed, fallback);
			}
		} catch {
			return fallback;
		}
	}

	return fallback;
}

function readNavLinks(value: unknown, fallback: SiteSettings['navLinks']) {
	if (Array.isArray(value)) {
		const entries = value
			.map((entry) => {
				if (typeof entry !== 'object' || entry === null) return null;
				const record = entry as JsonRecord;
				const label = readOptionalString(record.label);
				const url = readOptionalString(record.url);
				if (!label || !url) return null;
				return { label, url };
			})
			.filter((entry): entry is SiteSettings['navLinks'][number] => entry !== null);
		return entries.length > 0 ? entries : fallback;
	}

	if (typeof value === 'string' && value.trim().length > 0) {
		try {
			const parsed = JSON.parse(value);
			if (Array.isArray(parsed)) {
				return readNavLinks(parsed, fallback);
			}
		} catch {
			return fallback;
		}
	}

	return fallback;
}

function readHomeCards(value: unknown, fallback: HomeCard[]) {
	if (Array.isArray(value)) {
		const entries = value
			.map((entry) => {
				if (typeof entry !== 'object' || entry === null) return null;
				const record = entry as JsonRecord;
				const title = readOptionalString(record.title);
				const body = readOptionalString(record.body);
				if (!title || !body) return null;
				return {
					eyebrow: readOptionalString(record.eyebrow),
					title,
					body,
					ctaLabel: readOptionalString(record.cta_label),
					ctaUrl: readOptionalString(record.cta_url)
				};
			})
			.filter((entry) => entry !== null) as HomeCard[];
		return entries.length > 0 ? entries : fallback;
	}

	if (typeof value === 'string' && value.trim().length > 0) {
		try {
			const parsed = JSON.parse(value);
			if (Array.isArray(parsed)) {
				return readHomeCards(parsed, fallback);
			}
		} catch {
			return fallback;
		}
	}

	return fallback;
}

function readAboutCards(value: unknown, fallback: SiteSettings['aboutCards']) {
	if (Array.isArray(value)) {
		const entries = value
			.map((entry) => {
				if (typeof entry !== 'object' || entry === null) return null;
				const record = entry as JsonRecord;
				const label = readOptionalString(record.label);
				const body = readOptionalString(record.body) ?? readOptionalString(record.title);
				if (!label || !body) return null;
				return { label, body };
			})
			.filter((entry) => entry !== null) as SiteSettings['aboutCards'];
		return entries.length > 0 ? entries : fallback;
	}

	if (typeof value === 'string' && value.trim().length > 0) {
		try {
			const parsed = JSON.parse(value);
			if (Array.isArray(parsed)) {
				return readAboutCards(parsed, fallback);
			}
		} catch {
			return fallback;
		}
	}

	return fallback;
}
