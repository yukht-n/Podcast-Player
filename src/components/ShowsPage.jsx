import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useMemo } from 'react';
import { ITEMS_PER_PAGE } from '../constants';
import { queryFn, queryKey } from '../showsAPI';
import FilterForm from './FilterForm';
import Pagination from './Pagination/Pagination';
import ShowTeaser from './ShowTeaser';
import { Helmet } from '@dr.pogodin/react-helmet';

export default function ShowsPage() {
	const { data: shows = [] } = useQuery({ queryKey, queryFn });
	const typeList = useMemo(
		() => ['all', ...new Set(shows.map(({ show_type }) => show_type))],
		[shows]
	);
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
	const filteredShows = useMemo(
		() => toFilteredShows(shows, type, sort),
		[shows, type, sort]
	);
	const numbersOfPages = useMemo(
		() => Math.ceil(filteredShows.length / perPage),
		[filteredShows, perPage]
	);

	const renderedShow = useMemo(() => {
		const firstRenderedShow = (currentPage - 1) * perPage; //10
		const lastRenderedShow = currentPage * perPage; //20
		return filteredShows.slice(firstRenderedShow, lastRenderedShow);
	}, [filteredShows, currentPage, perPage]);

	return (
		<>
			<div>
				<Helmet>
					<title>{`All Episodes - Page ${currentPage}`}</title>
				</Helmet>
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
			<Pagination {...{ currentPage, setCurrentPage, numbersOfPages }} />

			<div className="result">
				{renderedShow.map((show) => (
					<ShowTeaser key={show.id} {...show} />
				))}
			</div>
			{/* <Pagination {...{ currentPage, setCurrentPage, numbersOfPages }} /> */}
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
