import { ITEMS_PER_PAGE } from '../constants';

export default function FilterForm({
	typeList,
	type,
	setType,
	sort,
	setSort,
	perPage,
	setPerPage,
	setCurrentPage,
}) {
	/* This function manages the core state update logic, potentially wrapped in View Transition API. */
	const handleClick = (fn, value) => {
		if (!document.startViewTransition) {
			fn(value);
			setCurrentPage(1);
			return;
		}
		document.startViewTransition(() => {
			fn(value);
			setCurrentPage(1);
		});
	};
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			{/* --- Type Filter --- */}
			<label htmlFor="type">Type</label>
			<select
				name="type"
				id="type"
				value={type}
				onChange={(e) => handleClick(setType, e.target.value)}
			>
				{/* Dynamically render available show types */}
				{typeList?.map((show_type) => (
					<option key={show_type} value={show_type}>
						{toNormalShowType(show_type)}
					</option>
				))}
			</select>
			{/* --- End Type Filter --- */}

			{/* --- Items Per Page Filter --- */}
			<label htmlFor="perPage">Per Page</label>
			<select
				name="perPage"
				id="perPage"
				value={perPage}
				onChange={(e) => handleClick(setPerPage, e.target.value)}
			>
				{ITEMS_PER_PAGE.map((value) => (
					<option key={`itemsPerPage_${value}`} value={value}>
						{value}
					</option>
				))}
			</select>
			{/* --- Ende Items Per Page Filter --- */}

			{/* --- Sort --- */}
			<label htmlFor="sort">Sort</label>
			<select
				name="sort"
				id="sort"
				value={sort}
				onChange={(e) => handleClick(setSort, e.target.value)}
			>
				<option value="desc">Newest to Oldest</option>
				<option value="asc">Oldest to Newest</option>
			</select>
			{/* --- End Sort --- */}
		</form>
	);
}

/**
 * @function toNormalShowType
 * Converts a string (e.g., 'full-stack') into a Title-Case format (e.g., 'Full-stack').
 * Used for display in the Type filter dropdown.
 *
 * @param {string} text - The raw show type string.
 * @returns {string} The formatted string.
 */
function toNormalShowType(text) {
	if (typeof text !== 'string') return '';
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
