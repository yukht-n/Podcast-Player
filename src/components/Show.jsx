import { Helmet } from '@dr.pogodin/react-helmet';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import { usePlayerStore } from '../playerStore';
import { queryFn, queryKey } from '../showsAPI';

export default function Show({ params: { id } }) {
	// Fetch all shows using Tanstack Query. Data is cached globally.
	const { data: shows = [] } = useQuery({ queryFn, queryKey });

	// Find the specific show based on the URL parameter 'id'.
	const show = shows.find(({ number }) => {
		return number === parseInt(id, 10);
	});

	// Get state setters from the Zustand store for player control.
	const playEpisode = usePlayerStore(({ playEpisode }) => playEpisode);
	const playEpisodeWithTimeStamp = usePlayerStore(
		({ playEpisodeWithTimeStamp }) => playEpisodeWithTimeStamp
	);

	// Ref to attach event listener to the show notes container.
	const showNotes = useRef(null);

	// Logic for handling timestamp clicks within show notes.
	useEffect(() => {
		if (!showNotes.current) return;
		const handleClickShowNotes = (e) => {
			const targetOfClick = e.target.closest('a');
			const href = targetOfClick?.getAttribute('href');

			//If cklick was not on <a> return
			if (!href) return;

			// Check if the link is a custom timestamp link (e.g., #t=01:30). If not -> return
			if (href.startsWith('#t=')) {
				e.preventDefault();

				/* Convert the time format (HH:MM:SS) oder (MM:SS) into total seconds. */
				const time = href
					.slice(3)
					.split(':')
					.toReversed()
					.reduce((sum, value, index) => sum + Number(value) * 60 ** index, 0);

				// 3. Play the episode starting from the calculated timestamp.
				playEpisodeWithTimeStamp(
					{
						url: show.url,
						number: show.number,
						title: show.title,
					},
					time
				);
			} else return;
		};
		showNotes.current.addEventListener('click', handleClickShowNotes);
		return () => {
			showNotes.current?.removeEventListener('click', handleClickShowNotes);
		};
	}, [show]);

	return (
		<div className="show-content">
			<div className="header">
				{/* Button to start playing the entire episode. */}
				<button
					type="button"
					aria-label={`Play episode ${show.title}`}
					onClick={() =>
						playEpisode({
							url: show.url,
							number: show.number,
							title: show.title,
						})
					}
				>
					⏯️
				</button>
				{/* Ende Button */} {/* Set the page title dynamically */}
				<Helmet>
					<title>{show.title}</title>
				</Helmet>
				{/* End*/}
				<h1>{show.title}</h1>
			</div>

			<div ref={showNotes}>
				{/* Renders show_notes (Markdown string) as HTML. */}
				<Markdown>{show.show_notes}</Markdown>
			</div>
		</div>
	);
}
