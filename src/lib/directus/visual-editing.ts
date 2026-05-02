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
