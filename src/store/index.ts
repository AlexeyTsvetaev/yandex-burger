import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../services/reducers/ingredients-slice';

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
