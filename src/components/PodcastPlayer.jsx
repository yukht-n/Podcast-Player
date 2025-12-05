import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '../playerStore';
import { getNormalTime } from '../helpers';

export default function PodcastPlayer() {
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

	const audioRef = useRef();
	const [isChanging, setIsChanging] = useState(false);
	const [playerTime, setPlayerTime] = useState(0);
	const [isPlayerHidden, setIsPlayerHidden] = useState(false);

	useEffect(() => {
		if (!audioRef.current) return;
		if (isPlaying) audioRef.current.play();
		else audioRef.current.pause();

		if (Math.abs(currentTime - audioRef.current.currentTime) > 0.9)
			audioRef.current.currentTime = currentTime;
	}, [isPlaying, currentTime]);

	useEffect(() => {
		audioRef.current.volume = volume;
	}, [volume]);

	const handleDuration = () => setDuration(audioRef.current.duration);

	const handleCurrentTime = () => {
		if (!isChanging && audioRef.current.currentTime - currentTime > 0.5)
			setCurrentTime(audioRef.current.currentTime);
	};

	/* 	const handleIsChanging = () => setIsChanging((isChanging) => !isChanging); */

	/* 	const seek = (e) => {
		const newTime = parseFloat(e.target.value);
		setPlayerTime(newTime);
		setCurrentTime(newTime);
		audioRef.current.currentTime = newTime;
	}; */

	return (
		<>
			<audio
				ref={audioRef}
				/* controls */
				src={currentEpisode?.url}
				onLoadedMetadata={handleDuration}
				onTimeUpdate={handleCurrentTime}
			/>
			{currentEpisode && (
				<div className="podcast-player">
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
					<p>{`Show #${currentEpisode.number} - ${currentEpisode.title}`}</p>
					<div
						className={
							isPlayerHidden
								? `podcast-player__control hidden`
								: `podcast-player__control`
						}
					>
						<button
							type="button"
							onClick={tooglePlayPause}
							aria-label={isPlaying ? 'Pause' : 'Play'}
						>
							{isPlaying ? '⏸️' : '▶️'}
						</button>

						<div className="podcast-player__time">
							{getNormalTime(isChanging ? playerTime : currentTime)}{' '}
							{/* /{' '}
							{getNormalTime(duration)} */}
						</div>

						<div className="podcast-player__seek-bar">
							<input
								type="range"
								value={isChanging ? playerTime : currentTime}
								min="0"
								max={duration}
								onMouseDown={() => [
									setPlayerTime(currentTime),
									setIsChanging(true),
								]}
								onMouseUp={() => [
									setCurrentTime(playerTime),
									setIsChanging(false),
								]}
								onChange={(e) => setPlayerTime(parseFloat(e.target.value))}
								onTouchStart={() => [
									setPlayerTime(currentTime),
									setIsChanging(true),
								]}
								onTouchMove={(e) => setPlayerTime(parseFloat(e.target.value))}
								onTouchEnd={() => [
									setCurrentTime(playerTime),
									setIsChanging(false),
								]}
							/>
						</div>
						<div className="podcast-player__time">
							{getNormalTime(duration)}
						</div>
						<div className="podcast-player__volume-bar">
							<input
								type="range"
								value={volume}
								min="0"
								step="0.05"
								max="1"
								onChange={(e) => setVolume(parseFloat(e.target.value))}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
