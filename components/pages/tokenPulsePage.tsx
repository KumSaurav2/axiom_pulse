import React, { Suspense } from 'react';
import TokenTable from '@/components/token/TokenTable';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';


export default function TokenPulsePage() {
	return (
			<main className="p-6 w-full">
				<div className="max-w-6xl mx-auto">
							<div className="flex items-center justify-between mb-4">
								<h1 className="text-2xl font-semibold">Pulse — Token Discovery</h1>
								<div className="flex items-center gap-3 text-sm text-gray-400">
									<div className="hidden sm:flex items-center gap-2">
										<button className="text-gray-400 hover:text-white">1m</button>
										<button className="text-gray-400 hover:text-white font-semibold">5m</button>
										<button className="text-gray-400 hover:text-white">30m</button>
										<button className="text-gray-400 hover:text-white">1h</button>
									</div>
									<button className="flex items-center gap-2 bg-black bg-opacity-30 border border-gray-700 px-3 py-1 rounded">Filter</button>
								</div>
							</div>
					<div className="flex items-center gap-6 mb-3 text-sm">
						<div className="flex items-center gap-4 text-white font-semibold">Trending</div>
						<div className="flex items-center gap-4 text-gray-400">
							<span>Surge</span>
							<span>DEX Screener</span>
							<span>Pump Live</span>
						</div>
					</div>
				<ErrorBoundary>
					<Suspense fallback={<div className="h-64">Loading...</div>}>
						<TokenTable />
					</Suspense>
				</ErrorBoundary>
			</div>
		</main>
	);
}