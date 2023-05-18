import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import appReducer from "./app/slice";
import pokemonReducer from "./pokemon/slice";

export const store = configureStore({
	reducer: {
		app: appReducer,
		pokemon: pokemonReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
