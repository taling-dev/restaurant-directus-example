import { setAttr } from '@directus/visual-editing';

type VisualEditingMode = 'drawer' | 'modal' | 'popover';

type VisualEditingAttrOptions = {
	enabled: boolean;
	collection: string;
	item?: string | number | null;
	fields?: string | string[];
	mode?: VisualEditingMode;
};

export function getDirectusAttr({
	enabled,
	collection,
	item,
	fields,
	mode = 'drawer'
}: VisualEditingAttrOptions) {
	if (!enabled || item === null || item === undefined || item === '') {
		return undefined;
	}

	return setAttr({
		collection,
		item,
		fields,
		mode
	});
}

export function withVisualEditingHref(href: string, enabled: boolean) {
	if (!enabled || !href) {
		return href;
	}

	if (
		href.startsWith('#') ||
		href.startsWith('mailto:') ||
		href.startsWith('tel:') ||
		href.startsWith('javascript:') ||
		href.startsWith('http://') ||
		href.startsWith('https://') ||
		href.startsWith('//')
	) {
		return href;
	}

	const url = new URL(href, 'https://visual-editing.local');
	url.searchParams.set('visual-editing', 'true');

	return `${url.pathname}${url.search}${url.hash}`;
}
