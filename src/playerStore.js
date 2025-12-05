import { create } from 'zustand';

export const usePlayerStore = create((set, get, store) => ({
	currentEpisode: null,
	isPlaying: false,
	currentTime: 0,
	duration: 0,
	volume: 0.5,

	playEpisode: (newEpisode) =>
		set(({ currentEpisode, isPlaying }) => {
			if (JSON.stringify(currentEpisode) === JSON.stringify(newEpisode))
				return { isPlaying: !isPlaying };
			return { currentEpisode: newEpisode, isPlaying: true, currentTime: 0 };
		}),
	playEpisodeWithTimeStamp: (newEpisode, newTime) =>
		set(({ currentEpisode }) => {
			if (JSON.stringify(currentEpisode) === JSON.stringify(newEpisode))
				return { currentTime: newTime };
			return {
				currentEpisode: newEpisode,
				isPlaying: true,
				currentTime: newTime,
			};
		}),
	tooglePlayPause: () => set(({ isPlaying }) => ({ isPlaying: !isPlaying })),
	setCurrentTime: (newCurrentTime) => set({ currentTime: newCurrentTime }),
	setDuration: (newDuration) => set({ duration: newDuration }),
	setVolume: (newVolume) => set({ volume: newVolume }),
}));
