export type SocialLink = {
	label: string;
	url: string;
};

export type SiteSettings = {
	id?: string;
	name: string;
	tagline: string;
	currencyCode: string;
	phone: string;
	email: string;
	addressLines: string[];
	locationNote: string;
	reservationUrl: string;
	mapsUrl: string;
	whatsappUrl: string;
	heroBadge: string;
	heroTitle: string;
	heroBody: string;
	heroPrimaryLabel: string;
	heroPrimaryUrl: string;
	heroSecondaryLabel: string;
	heroSecondaryUrl: string;
	storyHeading: string;
	storyBody: string;
	aboutTitle: string;
	aboutBody: string;
	seoTitle: string;
	seoDescription: string;
	footerNote: string;
	socials: SocialLink[];
};

export type HomepageSectionType =
	| 'hero'
	| 'story'
	| 'featured-menu'
	| 'promo-strip'
	| 'gallery-preview'
	| 'contact-cta';

export type HomepageSection = {
	id: string;
	sectionType: HomepageSectionType;
	eyebrow: string;
	title: string;
	body: string;
	ctaLabel?: string;
	ctaUrl?: string;
	secondaryLabel?: string;
	secondaryUrl?: string;
	imageUrl?: string;
	sort: number;
};

export type MenuCategory = {
	id?: string;
	name: string;
	slug: string;
	description: string;
	imageUrl: string;
	sort: number;
	active: boolean;
};

export type MenuItem = {
	id?: string;
	name: string;
	slug: string;
	description: string;
	price: number;
	promoPrice?: number | null;
	imageUrl: string;
	categorySlug: string;
	labels: string[];
	heatLevel: number;
	featured: boolean;
	available: boolean;
	sort: number;
};

export type Promotion = {
	id?: string;
	title: string;
	slug: string;
	shortDescription: string;
	fullDescription: string;
	imageUrl: string;
	startDate?: string;
	endDate?: string;
	ctaLabel?: string;
	ctaUrl?: string;
	featured: boolean;
	active: boolean;
};

export type BusinessHour = {
	id?: string;
	day: string;
	open: string;
	close: string;
	closed: boolean;
	note?: string;
	sort: number;
};

export type GalleryItem = {
	id?: string;
	imageUrl: string;
	altText: string;
	caption?: string;
	sort: number;
};
