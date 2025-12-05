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
			<label htmlFor="type">Type</label>
			<select
				name="type"
				id="type"
				value={type}
				onChange={(e) => handleClick(setType, e.target.value)}
			>
				{typeList?.map((show_type) => (
					<option key={show_type} value={show_type}>
						{toNormalShowType(show_type)}
					</option>
				))}
			</select>

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
		</form>
	);
}

function toNormalShowType(text) {
	if (typeof text !== 'string') return '';
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
