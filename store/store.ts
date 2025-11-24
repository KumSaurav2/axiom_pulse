import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from '@/store/tokenSlice';


export const store = configureStore({
reducer: {
tokens: tokenSlice
}
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;