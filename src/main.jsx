import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Route } from 'wouter';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Show from './components/Show';
import ShowsPage from './components/ShowsPage';
import { NuqsAdapter } from 'nuqs/adapters/react';
import PodcastPlayer from './components/PodcastPlayer';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 3, // Daten, die einmal im Cache sind, werden nicht nochmal geladen
			gcTime: Infinity,
			// Zeit, nach der unbenutzte Daten aus dem Cache gelöscht werden. Default sind 5 Minuten.
			suspense: true, // für Suspense
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<HelmetProvider>
				<Header />

				<main className="site-content content-padding">
					<Suspense fallback={<strong>Laden… ⌛</strong>}>
						<Route path="/" component={HomePage} />
					</Suspense>
					<NuqsAdapter>
						<Suspense fallback={<strong>Laden… ⌛</strong>}>
							<Route path="/shows" component={ShowsPage} />
						</Suspense>
					</NuqsAdapter>
					<Suspense fallback={<strong>Laden… ⌛</strong>}>
						<Route path="/show/:id/:slug" component={Show} />
					</Suspense>
				</main>
				<Footer />
				<PodcastPlayer />
				<ReactQueryDevtools />
			</HelmetProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
