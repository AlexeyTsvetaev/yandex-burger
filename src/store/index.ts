import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../services/reducers/ingredients-slice';
import { apiSlice } from '../services/rtk-query/api-slice';

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
