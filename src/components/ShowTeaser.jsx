import { Link } from 'wouter';
import { getClearTextFromShow } from '../helpers';
import { usePlayerStore } from '../playerStore';

export default function ShowTeaser({
	number,
	title,
	displayDate,
	show_notes,
	show_type,
	slug,
	url,
}) {
	const urlAdress = `/show/${number}/${slug}`;

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

/* function cutShowNotes (text){
    return text.slice(0, text.search("###"));

} */
