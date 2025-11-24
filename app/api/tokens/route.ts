import { NextResponse } from 'next/server';

const tokens = [
  {
    id: '6ix7evenbot',
    symbol: '6ix7e',
    name: '6ix7evenbot',
    price: 0.12,
    change24h: 45.7,
    category: 'new',
  logo: '/logo1.svg',
    age: '2m',
    marketCap: 13400,
    liquidity: 15000,
    volume: 46600,
    txns: { total: 584, buys: 349, sells: 235 },
    info: { pct: 22.87, pct2: 0, paid: false, holders: 129 }
  },
  {
    id: '7evenbot',
    symbol: '7ev',
    name: '7ev',
    price: 0.31,
    change24h: 166,
    category: 'new',
  logo: '/logo2.svg',
    age: '1m',
    marketCap: 15900,
    liquidity: 16400,
    volume: 23600,
    txns: { total: 232, buys: 144, sells: 88 },
    info: { pct: 24.18, pct2: 0, paid: false, holders: 81 }
  },
  {
    id: 'monad',
    symbol: 'MONAD',
    name: 'MONADCHAIN',
    price: 12.34,
    change24h: 29.6,
    category: 'final',
  logo: '/logo3.svg',
    age: '6h',
    marketCap: 315000,
    liquidity: 55900,
    volume: 25500,
    txns: { total: 246, buys: 138, sells: 108 },
    info: { pct: 14.01, pct2: 4.29, paid: true, holders: 1551 }
  },
  {
    id: 'bridge',
    symbol: 'BRDG',
    name: 'BRIDGE',
    price: 3.21,
    change24h: 16.89,
    category: 'final',
  logo: '/logo4.svg',
    age: '41m',
    marketCap: 23800,
    liquidity: 19900,
    volume: 6070,
    txns: { total: 58, buys: 39, sells: 19 },
    info: { pct: 25.11, pct2: 4.62, paid: true, holders: 115 }
  },
  {
    id: 'zobeth',
    symbol: 'ZOB',
    name: 'ZOBETH',
    price: 0.05,
    change24h: 20.05,
    category: 'new',
  logo: '/logo5.svg',
    age: '1m',
    marketCap: 7540,
    liquidity: 11300,
    volume: 9540,
    txns: { total: 133, buys: 84, sells: 49 },
    info: { pct: 20.68, pct2: 0, paid: false, holders: 36 }
  },
  {
    id: 'shitnad',
    symbol: 'SHIT',
    name: 'shitnad',
    price: 0.02,
    change24h: -2.33,
    category: 'migrated',
  logo: '/logo6.svg',
    age: '44m',
    marketCap: 8120,
    liquidity: 11700,
    volume: 8230,
    txns: { total: 78, buys: 44, sells: 34 },
    info: { pct: 18.84, pct2: 0.02, paid: false, holders: 88 }
  },
  {
    id: 'monass',
    symbol: 'MONASS',
    name: 'MONASS',
    price: 0.9,
    change24h: -10,
    category: 'final',
  logo: '/logo7.svg',
    age: '40m',
    marketCap: 38600,
    liquidity: 19000,
    volume: 4530,
    txns: { total: 79, buys: 42, sells: 37 },
    info: { pct: 22.77, pct2: 5.51, paid: false, holders: 361 }
  }
];

export async function GET() {
  return NextResponse.json(tokens);
}
