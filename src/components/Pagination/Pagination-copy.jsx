import { Link } from 'wouter'; // Wouter Link component for client-side navigation
import { getClearTextFromShow } from '../helpers';
import { usePlayerStore } from '../playerStore'; // Zustand store for global player state

export default function ShowTeaser({
	number,
	title,
	displayDate,
	show_notes,
	slug,
	url, // URL of the audio file, passed to the player store
}) {
	// Construct the friendly URL for this specific episode.
	const urlAdress = `/show/${number}/${slug}`;

	// Destructure the action needed to start playback from the Zustand store.
	const playEpisode = usePlayerStore(({ playEpisode }) => playEpisode);

	return (
		// Wrap the entire teaser in an <article> for semantic structure.
		<article className="teaser">
			{/* Use Wouter's Link component for fast, client-side navigation to the episode's detail page. */}
			<Link href={urlAdress}>
				<header className="teaser__header">
					<h3 className="teaser__title">{title}</h3>
					<p>
						{/* Play Button: Prevents link navigation and calls the global player action. */}
						<button
							type="button"
							aria-label={`Play episode ${title}`} // Accessibility label for screen readers
							onClick={(e) => {
								e.preventDefault(); // Stop the link component from navigating to the detail page
								playEpisode({ url, number, title }); // Call the global action to start playback
							}}
						>
							⏯️
						</button>
						{/* Display the published date */}- {displayDate}
					</p>
				</header>

				<div
					className="teaser__notes"
					/* onClick={() => setLocation(linkTarget)} - Commented-out alternative navigation */
				>
					{/* Display a clean, summary version of the show notes */}
					{getClearTextFromShow(show_notes)}
				</div>
			</Link>
		</article>
	);
}

/* // Example helper function, currently commented out:
function cutShowNotes (text){
    // Attempts to cut the text before the first '###' header, useful for summaries.
    return text.slice(0, text.search("###")); 
} 
*/
