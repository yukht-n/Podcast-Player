import { useQuery } from '@tanstack/react-query';
import { queryFn, queryKey } from '../showsAPI';
import ShowTeaser from './ShowTeaser';
import { Helmet } from '@dr.pogodin/react-helmet';

export default function HomePage() {
	const { data: shows = [] } = useQuery({ queryKey, queryFn });
	const lastShows = shows.slice(0, 9);
	const helm = 'Latest Episodes';

	return (
		<>
			<Helmet>
				<title>Latest Episodes</title>
			</Helmet>
			<h2>Latest Episodes</h2>
			<div className="grid" style={{ '--grid-min-width': '20rem' }}>
				{lastShows.map((show) => (
					<ShowTeaser key={show.id} {...show} />
				))}
			</div>
		</>
	);
}
