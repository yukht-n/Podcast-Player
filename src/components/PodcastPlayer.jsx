import { useEffect, useRef, useState } from 'react';
import { getNormalTime } from '../helpers';
import { usePlayerStore } from '../playerStore';

export default function PodcastPlayer() {
	/* Global state management via Zustand (usePlayerStore) */
	const {
		currentEpisode,
		isPlaying,
		currentTime,
		tooglePlayPause,
		duration,
		setDuration,
		setCurrentTime,
		volume,
		setVolume,
		playEpisode,
	} = usePlayerStore();

	const audioRef = useRef(); // Reference to the actual <audio>
	const [isChanging, setIsChanging] = useState(false); //when user is dragging the seek bar
	const [playerTime, setPlayerTime] = useState(0); //Time displayed while user is seekiing
	const [isPlayerHidden, setIsPlayerHidden] = useState(false);

	/**
	 * Synchronize React state (isPlaying, currentTime) with the native <audio> element.
	 */
	useEffect(() => {
		if (!audioRef.current) return;

		// 1. Play/Pause synchronization
		if (isPlaying) audioRef.current.play();
		else audioRef.current.pause();

		// 2. Time synchronization (Seek position)
		if (Math.abs(currentTime - audioRef.current.currentTime) > 0.9)
			audioRef.current.currentTime = currentTime;
	}, [isPlaying, currentTime]);

	/**
	 * Synchronize global volume state with the native <audio> element.
	 */
	useEffect(() => {
		audioRef.current.volume = volume;
	}, [volume]);

	/* Setting the total duration of the episode. */
	const handleDuration = () => setDuration(audioRef.current.duration);

	/* Setting the CurrentTime of the episode with a small threshold (0.5s) */
	const handleCurrentTime = () => {
		if (!isChanging && audioRef.current.currentTime - currentTime > 0.5)
			setCurrentTime(audioRef.current.currentTime);
	};

	return (
		<>
			{/* The invisible <audio> element responsible for playback */}
			<audio
				ref={audioRef}
				/* controls */
				src={currentEpisode?.url}
				onLoadedMetadata={handleDuration}
				onTimeUpdate={handleCurrentTime}
			/>

			{/* Render player UI only if an episode is selected */}
			{currentEpisode && (
				<div className="podcast-player">
					{/* --- Minimize/Close Controls --- */}
					<div className="podcast-player__box-control">
						<button
							type="button"
							className={isPlayerHidden ? 'rotate' : ''}
							aria-label="Minimize Player"
							onClick={() =>
								setIsPlayerHidden((isPlayerHidden) => !isPlayerHidden)
							}
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M2.22 5.22a.75.75 0 0 0 0 1.06l5.252 5.252a.75.75 0 0 0 1.06 0l5.252-5.252a.75.75 0 1 0-1.06-1.06L8.001 9.94 3.28 5.22a.75.75 0 0 0-1.06 0Z"
									fill="currentColor"
								></path>
							</svg>
						</button>
						<button
							type="button"
							aria-label="Close Player"
							onClick={() => {
								playEpisode(null);
								tooglePlayPause();
							}}
						>
							×
						</button>
					</div>
					{/* --- END Minimize/Close Controls --- */}

					<p>{`Show #${currentEpisode.number} - ${currentEpisode.title}`}</p>

					{/* --- Player Controls (Play, Seek, Volume) --- */}
					<div
						className={
							isPlayerHidden
								? `podcast-player__control hidden`
								: `podcast-player__control`
						}
					>
						{/* Play/Pause Button */}
						<button
							type="button"
							onClick={tooglePlayPause}
							aria-label={isPlaying ? 'Pause' : 'Play'}
						>
							{isPlaying ? '⏸️' : '▶️'}
						</button>
						{/* ENDE Play/Pause Button */}

						{/* Current Time Display. Showing local playerTime if dragging, otherwise shows synchronized currentTime */}
						<div className="podcast-player__time">
							{getNormalTime(isChanging ? playerTime : currentTime)}
						</div>

						{/* Seek Bar */}
						<div className="podcast-player__seek-bar">
							<input
								type="range"
								/* Showing lockalTime while seekenig */
								value={isChanging ? playerTime : currentTime}
								min="0"
								max={duration}
								/* Saving currentTime in PlayerTime and showing only PlayerTime  */
								onMouseDown={() => [
									setPlayerTime(currentTime),
									setIsChanging(true),
								]}
								onTouchStart={() => [
									setPlayerTime(currentTime),
									setIsChanging(true),
								]}
								/* Saving newTime in CurrentTime and showing  CurrentTime  */
								onMouseUp={() => [
									setCurrentTime(playerTime),
									setIsChanging(false),
								]}
								onTouchMove={(e) => setPlayerTime(parseFloat(e.target.value))}
								onTouchEnd={() => [
									setCurrentTime(playerTime),
									setIsChanging(false),
								]}
								onChange={(e) => setPlayerTime(parseFloat(e.target.value))}
							/>
						</div>

						{/* Total Duration Display */}
						<div className="podcast-player__time">
							{getNormalTime(duration)}
						</div>

						{/* Volume Control */}
						<div className="podcast-player__volume-bar">
							<input
								type="range"
								value={volume}
								min="0"
								step="0.05"
								max="1"
								onChange={(e) => setVolume(parseFloat(e.target.value))} // Update global volume state
							/>
						</div>
						{/* END Volume Control */}
					</div>
					{/* --- END Player Controls (Play, Seek, Volume) --- */}
				</div>
			)}
		</>
	);
}
