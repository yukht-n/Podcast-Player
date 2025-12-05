import { Helmet } from '@dr.pogodin/react-helmet';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useMemo } from 'react';
import { ITEMS_PER_PAGE } from '../constants';
import { queryFn, queryKey } from '../showsAPI';
import FilterForm from './FilterForm';
import Pagination from './Pagination/Pagination';
import ShowTeaser from './ShowTeaser';

export default function ShowsPage() {
	// Fetch Data from Tanstack Query Cache
	const { data: shows = [] } = useQuery({ queryKey, queryFn });

	// Generate Type List (Memoized)
	const typeList = useMemo(
		() => ['all', ...new Set(shows.map(({ show_type }) => show_type))],
		[shows]
	);

	// State/URL Synchronization (using nuqs)
	const [type, setType] = useQueryState(
		'type',
		parseAsString.withDefault('all')
	);
	const [sort, setSort] = useQueryState(
		'sort',
		parseAsString.withDefault('desc')
	);
	const [perPage, setPerPage] = useQueryState(
		'perPage',
		parseAsInteger.withDefault(ITEMS_PER_PAGE[0])
	);
	const [currentPage, setCurrentPage] = useQueryState(
		'page',
		parseAsInteger.withDefault(1)
	);

	//Filtering and Sorting
	const filteredShows = useMemo(
		() => toFilteredShows(shows, type, sort),
		[shows, type, sort]
	);

	//Pagination Calculation
	const numbersOfPages = useMemo(
		() => Math.ceil(filteredShows.length / perPage),
		[filteredShows, perPage]
	);

	//Returning only the slice of shows relevant to the current page (Memoized)
	const renderedShow = useMemo(() => {
		const firstRenderedShow = (currentPage - 1) * perPage; //10
		const lastRenderedShow = currentPage * perPage; //20
		return filteredShows.slice(firstRenderedShow, lastRenderedShow);
	}, [filteredShows, currentPage, perPage]);

	return (
		<>
			<div>
				{/* Helmet manages the document title for SEO/UX */}
				<Helmet>
					<title>{`All Episodes - Page ${currentPage}`}</title>
				</Helmet>
				{/* End Helmet */}

				<h1>All Episodes</h1>

				<FilterForm
					{...{
						typeList,
						type,
						setType,
						sort,
						setSort,
						perPage,
						setPerPage,
						setCurrentPage,
					}}
				/>
			</div>

			{/* Render pagination controls */}
			<Pagination {...{ currentPage, setCurrentPage, numbersOfPages }} />

			{/* Render the results for the current page */}
			<div className="result">
				{renderedShow.map((show) => (
					<ShowTeaser key={show.id} {...show} />
				))}
			</div>
		</>
	);
}

function toFilteredShows(shows = [], type, sort) {
	const noSelectedType = type === 'all';
	const noSorting = sort === 'desc';

	return noSorting
		? shows.filter(({ show_type }) => noSelectedType || type === show_type)
		: shows
				.filter(({ show_type }) => noSelectedType || type === show_type)
				.toReversed();
}
