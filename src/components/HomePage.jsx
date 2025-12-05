import { Helmet } from '@dr.pogodin/react-helmet';
import { useQuery } from '@tanstack/react-query';
import { queryFn, queryKey } from '../showsAPI';
import ShowTeaser from './ShowTeaser';

export default function HomePage() {
	// Fetch data using Tanstack Query.
	// 'data' will be automatically cached, synchronized, and handled for loading/error states
	// (though explicit handling for isLoading/isError is done in the parent component via Suspense/ErrorBoundary).
	const { data: shows = [] } = useQuery({ queryKey, queryFn });
	/* Select the first 9 elements from the array to display the latest shows. */
	const lastShows = shows.slice(0, 9);

	return (
		<>
			<Helmet>
				<title>Latest Episodes</title>
			</Helmet>
			<h2>Latest Episodes</h2>

			{/* Render the list of the latest shows.            */}
			<div className="grid" style={{ '--grid-min-width': '20rem' }}>
				{lastShows.map((show) => (
					<ShowTeaser key={show.id} {...show} />
				))}
			</div>
		</>
	);
}
