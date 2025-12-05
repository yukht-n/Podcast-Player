export function getFormattedPrice(price, currencySymbol = ' €') {
	const formattedPrice =
		(price / 100).toFixed(2).replace('.', ',') + currencySymbol;

	return formattedPrice;
}

/**
 * Returns a CSS visibility value for the Activity component.
 *
 * @param {any} show - When truthy, the Activity component should be visible; when falsy, it should be hidden.
 * @returns {'visible'|'hidden'} A CSS visibility string to apply to the component.
 */
export function isVisible(show) {
	return show ? 'visible' : 'hidden';
}

/**
 * Returns the current URL as a `URL` object.
 *
 * @returns {URL} The current URL.
 */
export function getCurrentUrl() {
	return new URL(window.location.href);
}

/**
 * Extracts the ID from a slug.
 *
 * @param {string} slug - The slug to parse.
 * @returns {string} The ID extracted from the slug.
 */
export function getIdFromSlug(slug) {
	const parts = slug.split('-');

	const id = parts.at(-1);

	// Ist ein String und nicht validiert, hier könnte man noch prüfen, ob es ein Integer ist etc.
	return id;
}

export function getClearTextFromShow(show_notes) {
	return show_notes.slice(0, show_notes.search('##'));
}

export function getNormalTime(time) {
	const hours = Math.floor(time / 3600);

	const minutes = Math.floor(time / 60 - hours * 60)
		.toString()
		.padStart(2, '0');
	const seconds = Math.floor(time % 60)
		.toString()
		.padStart(2, '0');

	return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
}
