import { PAGES_IN_PAGINATION } from '../../constants';

import classes from './Pagination.module.css';

export default function Pagination({
	currentPage,
	setCurrentPage,
	numbersOfPages,
}) {
	/* This function manages the core state update logic, potentially wrapped in View Transition API. */
	const handlePageClick = (newPage) => {
		if (!document.startViewTransition) {
			setCurrentPage(newPage);
			return;
		}
		document.startViewTransition(() => {
			setCurrentPage(newPage);
		});
	};

	return (
		<nav aria-label="Pagination of Results">
			<ul className={classes.pagination}>
				{/* --- RENDER FIRST/PREV BUTTONS --- */}
				{currentPage === 1 ? (
					<>
						{/* If this is page 1, show disabled <span> elements for first/previous. */}
						<li style={{ '--vt-name': 'first' }}>
							<span>&laquo;&laquo;</span>
						</li>
						<li style={{ '--vt-name': 'prev' }}>
							<span>&laquo;</span>
						</li>
					</>
				) : (
					<>
						{/* First Page Link */}
						<li style={{ '--vt-name': 'first' }}>
							<a
								href={`?page=1`}
								onClick={(e) => {
									e.preventDefault();
									handlePageClick(1);
								}}
								aria-label="First Page"
							>
								&laquo;&laquo;
							</a>
						</li>

						{/* Previous Page Link */}
						<li style={{ '--vt-name': 'prev' }}>
							<a
								href={`?page=${Math.max(1, currentPage - 1)}`}
								onClick={(e) => {
									e.preventDefault();
									/* Ensure page doesn't go below 1 */
									handlePageClick(Math.max(1, currentPage - 1));
								}}
								aria-label="Previous Page"
							>
								&laquo;
							</a>
						</li>
					</>
				)}
				{/* --- END RENDER FIRST/PREV BUTTONS --- */}

				{/* --- RENDER PAGE NUMBERS --- */}
				{PAGES_IN_PAGINATION.map((value) => {
					const newPage = currentPage + value;
					if (newPage < 1 || newPage > numbersOfPages) return null;

					/* 'vt-name' is used by the View Transition API for identifying elements. */
					return (
						<li
							style={{ '--vt-name': newPage }}
							key={`pagination-key-${value}`}
						>
							{/* If value is not 0 (i.e., not the current page) */}
							{value ? (
								<a
									href={`?page=${newPage}`}
									onClick={(e) => {
										e.preventDefault();
										handlePageClick(newPage);
									}}
									aria-label={`Page ${newPage}`}
								>
									{newPage}
								</a>
							) : (
								<span aria-current="page">{currentPage}</span>
							)}
						</li>
					);
				})}
				{/* --- END RENDER PAGE NUMBERS --- */}

				{/* --- RENDER LAST/NEXT BUTTONS --- */}
				{currentPage === numbersOfPages ? (
					<>
						{/* If this is the Last page, show disabled <span> elements. */}
						<li style={{ '--vt-name': 'next' }}>
							<span>&raquo;</span>
						</li>
						<li style={{ '--vt-name': 'last' }}>
							<span>&raquo;&raquo;</span>
						</li>
					</>
				) : (
					<>
						{/* Next Page Link */}
						<li style={{ '--vt-name': 'next' }}>
							<a
								href={`?page=${Math.min(numbersOfPages, currentPage + 1)}`}
								onClick={(e) => {
									e.preventDefault();
									handlePageClick(Math.min(numbersOfPages, currentPage + 1));
								}}
								aria-label="Next Page"
							>
								&raquo;
							</a>
						</li>

						{/* Last Page Link */}
						<li style={{ '--vt-name': 'last' }}>
							<a
								href={`?page=${numbersOfPages}`}
								onClick={(e) => {
									e.preventDefault();
									handlePageClick(numbersOfPages);
								}}
								aria-label="Last Page"
							>
								&raquo;&raquo;
							</a>
						</li>
					</>
				)}
				{/* --- END RENDER LAST/NEXT BUTTONS --- */}
			</ul>
		</nav>
	);
}
