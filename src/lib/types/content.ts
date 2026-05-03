export type SocialLink = {
	label: string;
	url: string;
};

export type HomeCard = {
	eyebrow?: string;
	title: string;
	body: string;
	ctaLabel?: string;
	ctaUrl?: string;
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
	aboutEyebrow: string;
	aboutTitle: string;
	aboutBody: string;
	aboutImage?: string;
	promosEyebrow: string;
	promosTitle: string;
	promosBody: string;
	homeCardsEyebrow: string;
	homeCardsTitle: string;
	homeCardsBody: string;
	homeCards: HomeCard[];
	menuEyebrow: string;
	menuTitle: string;
	menuBody: string;
	galleryEyebrow: string;
	galleryTitle: string;
	galleryBody: string;
	contactEyebrow: string;
	contactTitle: string;
	contactBody: string;
	learnMoreLabel: string;
	chefPickLabel: string;
	statsCards: { label: string; title: string }[];
	navLinks: { label: string; url: string }[];
	aboutCards: { label: string; body: string }[];
	hoursHeading: string;
	connectHeading: string;
	accentColor: string;
	darkColor: string;
	favicon?: string;
	logo?: string;
	seoTitle: string;
	seoDescription: string;
	footerNote: string;
	callLabel: string;
	reserveLabel: string;
	mapLabel: string;
	directionsLabel: string;
	planVisitLabel: string;
	messageLabel: string;
	featuredLabel: string;
	aboutExtra?: string;
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
	image?: string;
	imageUrl?: string;
	sort: number;
	// Selectable block children (populated when at least one item is selected in Directus)
	selectedPromotions?: Promotion[];
	selectedMenuItems?: MenuItem[];
	selectedGalleryItems?: GalleryItem[];
};

export type MenuCategory = {
	id?: string;
	name: string;
	slug: string;
	description: string;
	image?: string;
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
	image?: string;
	imageUrl: string;
	categorySlug: string;
	labels: string[];
	heatLevel: number;
	featured: boolean;
	chefPick: boolean;
	available: boolean;
	sort: number;
};

export type Promotion = {
	id?: string;
	title: string;
	slug: string;
	shortDescription: string;
	fullDescription: string;
	image?: string;
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
	image?: string;
	imageUrl: string;
	altText: string;
	caption?: string;
	sort: number;
};
