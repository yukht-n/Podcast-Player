import { PAGES_IN_PAGINATION } from '../../constants';

import classes from './Pagination.module.css';

export default function Pagination({
	currentPage,
	setCurrentPage,
	numbersOfPages,
}) {
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
			<ul className={classes.pagination} /* className="pagination-list" */>
				{currentPage === 1 ? (
					<>
						<li style={{ '--vt-name': 'first' }}>
							<span>&laquo;&laquo;</span>
						</li>
						<li style={{ '--vt-name': 'prev' }}>
							<span>&laquo;</span>
						</li>
					</>
				) : (
					<>
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

						<li style={{ '--vt-name': 'prev' }}>
							<a
								href={`?page=${Math.max(1, currentPage - 1)}`}
								onClick={(e) => {
									e.preventDefault();
									handlePageClick(Math.max(1, currentPage - 1));
								}}
								aria-label="Previous Page"
							>
								&laquo;
							</a>
						</li>
					</>
				)}

				{PAGES_IN_PAGINATION.map((value) => {
					const newPage = currentPage + value;
					if (newPage < 1 || newPage > numbersOfPages) return null;
					return (
						<li
							style={{ '--vt-name': newPage }}
							key={`pagination-key-${value}`}
						>
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
				{currentPage === numbersOfPages ? (
					<>
						<li style={{ '--vt-name': 'next' }}>
							<span>&raquo;</span>
						</li>
						<li style={{ '--vt-name': 'last' }}>
							<span>&raquo;&raquo;</span>
						</li>
					</>
				) : (
					<>
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
			</ul>
		</nav>
	);
}
