import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import { usePlayerStore } from '../playerStore';
import { queryFn, queryKey } from '../showsAPI';

export default function Show({ params: { id } }) {
	const { data: shows = [] } = useQuery({ queryFn, queryKey });

	const show = shows.find(({ number }) => {
		return number === parseInt(id, 10);
	});
	const playEpisode = usePlayerStore(({ playEpisode }) => playEpisode);
	const playEpisodeWithTimeStamp = usePlayerStore(
		({ playEpisodeWithTimeStamp }) => playEpisodeWithTimeStamp
	);
	const showNotes = useRef(null);
	useEffect(() => {
		if (!showNotes.current) return;
		const handleClickShowNotes = (e) => {
			const targetOfClick = e.target.closest('a');

			const href = targetOfClick?.getAttribute('href');
			if (!href) return;
			if (href.startsWith('#t=')) {
				e.preventDefault();
				const time = href
					.slice(3)
					.split(':')
					.toReversed()
					.reduce((sum, value, index) => sum + Number(value) * 60 ** index, 0);
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
				</button>{' '}
				<h1>{show.title}</h1>
			</div>

			<div ref={showNotes}>
				<Markdown>{show.show_notes}</Markdown>
			</div>
		</div>
	);
}
