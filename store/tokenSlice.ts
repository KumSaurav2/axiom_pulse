import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type Token = {
	id: string;
	symbol: string;
	name: string;
	price: number;
	change24h: number;
	category: 'new' | 'final' | 'migrated';
	logo?: string;
	age?: string; // e.g. '2m', '41m'
	marketCap?: number; // in USD
	liquidity?: number; // in USD
	volume?: number; // in USD
	txns?: { total: number; buys?: number; sells?: number };
	info?: {
		pct?: number; // arbitrary percent shown
		pct2?: number;
		paid?: boolean;
		holders?: number;
	};
};


type TokenState = {
items: Token[];
loading: boolean;
error: string | null;
sortBy: { key: keyof Token | 'price' | null; dir: 'asc' | 'desc' | null };
};


const initialState: TokenState = {
items: [],
loading: false,
error: null,
sortBy: { key: null, dir: null }
};


const tokenSlice = createSlice({
	name: 'tokens',
	initialState,
	reducers: {
		setTokens(state: TokenState, action: PayloadAction<Token[]>) {
			state.items = action.payload;
			state.loading = false;
			state.error = null;
		},
		updateTokenPrice(state: TokenState, action: PayloadAction<{ id: string; price: number; change24h: number }>) {
			const t = state.items.find((x: Token) => x.id === action.payload.id);
			if (t) {
				t.price = action.payload.price;
				t.change24h = action.payload.change24h;
			}
		},
		setLoading(state: TokenState, action: PayloadAction<boolean>) {
			state.loading = action.payload;
		},
		setError(state: TokenState, action: PayloadAction<string | null>) {
			state.error = action.payload;
		},
		setSort(state: TokenState, action: PayloadAction<TokenState['sortBy']>) {
			state.sortBy = action.payload;
		}
	}
});


export const { setTokens, updateTokenPrice, setLoading, setError, setSort } = tokenSlice.actions;
export default tokenSlice.reducer;