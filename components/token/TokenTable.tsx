"use client";

import React, { useMemo, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import type { Token } from '../../store/tokenSlice';
import Sparkline from './Sparkline';
import { setTokens, setError, updateTokenPrice, setSort } from '../../store/tokenSlice';

// Simple fetch function (can be replaced with a real API)
const fetchTokens = async () => {
	const res = await axios.get('/api/tokens');
	return res.data as Token[];
};

// small mock websocket hook that calls the callback with random price updates
function useWebSocketMock(cb: (u: { id: string; price: number; change24h: number }) => void) {
	useEffect(() => {
		const interval = setInterval(() => {
			// emit a fake update (no-op if nothing is in store)
			cb({ id: 'token-1', price: Number((Math.random() * 10).toFixed(2)), change24h: Number((Math.random() * 10 - 5).toFixed(2)) });
		}, 5000);
		return () => clearInterval(interval);
	}, [cb]);
}

function ColumnHeader({ label, sortKey }: { label: string; sortKey: keyof Token | 'price' | 'change24h' }) {
	const dispatch = useDispatch();
		const sortBy = useSelector((s: any) => s.tokens.sortBy);
	const active = sortBy.key === sortKey;
	return (
		<button
			onClick={() => {
				const dir = !active ? 'asc' : sortBy.dir === 'asc' ? 'desc' : null;
				dispatch(setSort({ key: dir ? sortKey : null, dir }));
			}}
			className="flex items-center gap-2"
		>
			{label}
			<span className="text-xs text-gray-500">{active ? (sortBy.dir === 'asc' ? '↑' : sortBy.dir === 'desc' ? '↓' : '') : ''}</span>
		</button>
	);
}

function TokenRow({ token }: { token: Token }) {
	return (
			<tr className="border-b border-gray-800 hover:bg-[rgba(255,255,255,0.02)] h-20">
				<td className="p-3 w-52 sm:w-72">
				<div className="flex items-center gap-3">
									<div className="relative">
										{token.logo ? (
											<img src={token.logo} alt="logo" className={`w-10 h-10 rounded-lg border ${token.info?.paid ? 'border-yellow-400' : 'border-gray-700'}`} />
										) : (
											<div className={`w-10 h-10 rounded-lg bg-gray-700 border ${token.info?.paid ? 'border-yellow-400' : 'border-gray-700'}`} />
										)}
							{token.info?.paid && <div className="absolute -right-1 -bottom-1 w-3 h-3 rounded-full bg-yellow-500 border-2 border-black" />}
						</div>
					<div className="flex flex-col">
						<div className="font-medium text-sm truncate max-w-[240px]">{token.name}</div>
						<div className="text-xs text-gray-400 flex items-center gap-2">
							<span className="text-[10px] bg-gray-800 px-2 py-[2px] rounded">{token.age ?? '—'}</span>
							<span className="truncate max-w-[200px]">{token.symbol}</span>
						</div>
					</div>
				</div>
					</td>
									<td className="hidden md:table-cell p-3 w-36 align-middle">
										<Sparkline id={token.id} change={token.change24h} />
									</td>
					<td className="p-3 text-right">
						<div className="font-medium text-gray-100">{token.marketCap ? `$${(token.marketCap / 1000).toFixed(2)}K` : '—'}</div>
						<div className={`text-xs ${token.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{token.change24h >= 0 ? `+${token.change24h}%` : `${token.change24h}%`}</div>
					</td>
			<td className="hidden lg:table-cell p-3 text-right font-medium text-gray-100">{token.liquidity ? `$${(token.liquidity / 1000).toFixed(2)}K` : '—'}</td>
			<td className="hidden lg:table-cell p-3 text-right font-medium text-gray-100">{token.volume ? `$${(token.volume / 1000).toFixed(2)}K` : '—'}</td>
			<td className="hidden lg:table-cell p-3 text-right">
				<div className="text-sm">{token.txns?.total ?? 0}</div>
				<div className="text-xs text-gray-500">{token.txns?.buys ?? 0} / {token.txns?.sells ?? 0}</div>
			</td>
					<td className="p-3 align-middle">
						<div className="flex flex-col gap-1.5">
							{/* Row 1 */}
							<div className="flex items-center gap-2">
								<div className={`text-[11px] px-2 py-[2px] rounded font-semibold ${token.info?.pct !== undefined && token.info.pct >= 0 ? 'bg-[#19cf8a] text-black' : 'bg-[#ff4b5b] text-black'}`}>{token.info?.pct ?? '--'}%</div>
								<div className="text-[11px] px-1.5 py-[2px] rounded bg-[#0b1214] text-[#0fd58c]">{token.info?.pct2 ?? 0}%</div>
								<div className="text-[11px] px-1.5 py-[2px] rounded bg-[#0b1214] text-[#9aa5b1]">0%</div>
								<div className="ml-auto flex flex-col gap-1">
									<div className="flex items-center gap-1 text-[10px] px-2 py-[2px] rounded bg-[#0b1214] text-white border border-[#111418]">
										<svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
											<path d="M10 10a4 4 0 100-8 4 4 0 000 8z" />
											<path d="M2 18a8 8 0 0116 0H2z" />
										</svg>
										<span>{token.info?.holders ?? 0}</span>
									</div>
									<div className="flex items-center gap-1 text-[10px] px-2 py-[2px] rounded bg-[#0b1214] text-white border border-[#111418]">
										<svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
											<path d="M3 8a4 4 0 018 0v1h2a1 1 0 011 1v5a1 1 0 01-1 1H6a1 1 0 01-1-1V8z" />
											<path d="M8 10V8a2 2 0 114 0v2" />
										</svg>
										<span>{token.txns?.total ?? 0}</span>
									</div>
								</div>
							</div>
							{/* Row 2 */}
							<div className="flex items-center gap-2">
								<div className="text-[11px] px-1.5 py-[2px] rounded bg-[#0b1214] text-[#0fd58c]">0%</div>
								<div className={`text-[11px] px-2 py-[2px] rounded font-semibold ${token.change24h >= 0 ? 'bg-[#19cf8a] text-black' : 'bg-[#ff4b5b] text-black'}`}>{token.change24h ?? 0}%</div>
								<div className="text-[11px] px-1.5 py-[2px] rounded bg-[#0b1214] text-[#9aa5b1]">0%</div>
								<div className="ml-auto hidden sm:flex flex-col gap-1">
									<div className="text-[10px] px-2 py-[2px] rounded bg-[#0b1214] text-white border border-[#111418]">{token.txns?.buys ?? 0}</div>
									<div className="text-[10px] px-2 py-[2px] rounded bg-[#0b1214] text-white border border-[#111418]">{token.txns?.sells ?? 0}</div>
								</div>
							</div>
							{/* Row 3 */}
							<div className="flex items-center gap-2">
								<div className={`text-[11px] px-2 py-[2px] rounded font-semibold ${token.info?.paid ? 'bg-[#0b6b3e] text-[#19cf8a]' : 'bg-[#3d1520] text-[#ff4b5b]'}`}>{token.info?.paid ? 'Paid' : 'Unpaid'}</div>
								<div className="text-[11px] px-1.5 py-[2px] rounded bg-[#0b1214] text-[#9aa5b1]">0%</div>
								<div className="text-[11px] px-1.5 py-[2px] rounded bg-[#0b1214] text-[#9aa5b1]">—</div>
							</div>
						</div>
					</td>
					<td className="p-3 text-right">
						<button className="bg-[#4b7aff] shadow-md text-white px-3 py-1 sm:px-5 sm:py-2 rounded-full text-sm">Buy</button>
					</td>
		</tr>
	);
}

export default function TokenTable() {
	const dispatch = useDispatch();
	const { items, loading, error, sortBy: currentSort } = useSelector((s: any) => s.tokens);

	const { data, isLoading, isError, error: queryError } = useQuery<Token[], Error>({
		queryKey: ['tokens'],
		queryFn: fetchTokens
	});

	useEffect(() => {
		if (data) dispatch(setTokens(data));
	}, [data, dispatch]);

	useEffect(() => {
		if (queryError) dispatch(setError((queryError as any)?.message ?? 'Failed to fetch'));
	}, [queryError, dispatch]);

	const sorted = useMemo(() => {
		const arr = [...items];
		if (currentSort.key) {
			arr.sort((a: any, b: any) => {
				const aVal = a[currentSort.key as keyof Token];
				const bVal = b[currentSort.key as keyof Token];
				if (typeof aVal === 'string') return currentSort.dir === 'asc' ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
				return currentSort.dir === 'asc' ? (Number(aVal) as number) - (Number(bVal) as number) : (Number(bVal) as number) - (Number(aVal) as number);
			});
		}
		return arr;
	}, [items, currentSort]);

	if (loading || isLoading) {
		return (
			<div className="space-y-2">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="h-14 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-shimmer rounded" />
				))}
			</div>
		);
	}

	if (error || isError) {
		return <div className="p-4 bg-rose-900 rounded">Error loading tokens.</div>;
	}

		return (
		<div className="mx-auto w-full max-w-6xl bg-[linear-gradient(180deg,#071023,#0b1020)] p-4 rounded shadow-md border border-gray-800">
			<div className="flex items-center justify-between mb-3">
				<div className="text-sm text-gray-400">Total: {items.length}</div>
				<div className="flex gap-2">
					<button className="text-xs p-2 border rounded">Refresh</button>
				</div>
			</div>
					<div className="overflow-auto h-[560px]">
				<table className="min-w-full table-fixed border-separate border-spacing-0">
					<thead className="bg-[rgba(255,255,255,0.01)]">
						<tr className="text-left text-xs text-gray-400 border-b border-gray-800">
							<th className="p-2 w-52 sm:w-72">Pair Info</th>
							<th className="hidden md:table-cell p-2 w-36">Chart</th>
							<th className="p-2 w-28 text-right">Market Cap</th>
							<th className="hidden lg:table-cell p-2 w-28 text-right">Liquidity</th>
							<th className="hidden lg:table-cell p-2 w-28 text-right">Volume</th>
							<th className="hidden lg:table-cell p-2 w-28 text-right">TXNS</th>
							<th className="p-2">Token Info</th>
							<th className="p-2 w-24 text-right">Action</th>
						</tr>
					</thead>
								<tbody>
						{sorted.map((t) => (
							<TokenRow key={t.id} token={t} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}