import { Link } from 'wouter';
import { getClearTextFromShow } from '../helpers';
import { usePlayerStore } from '../playerStore';

export default function ShowTeaser({
	number,
	title,
	displayDate,
	show_notes,
	slug,
	url,
}) {
	// Construct the friendly URL for this specific episode.
	const urlAdress = `/show/${number}/${slug}`;

	// Destructure the action needed to start playback from the Zustand store.
	const playEpisode = usePlayerStore(({ playEpisode }) => playEpisode);

	return (
		<article className="teaser">
			<Link href={urlAdress}>
				<header className="teaser__header">
					<h3 className="teaser__title">{title}</h3>
					<p>
						<button
							type="button"
							aria-label={`Play episode ${title}`}
							onClick={(e) => {
								e.preventDefault();
								playEpisode({ url, number, title });
							}}
						>
							⏯️
						</button>
						- {displayDate}
					</p>
				</header>

				<div
					className="teaser__notes" /*  onClick={() => setLocation(linkTarget)} */
				>
					{getClearTextFromShow(show_notes)}
				</div>
			</Link>
		</article>
	);
}
