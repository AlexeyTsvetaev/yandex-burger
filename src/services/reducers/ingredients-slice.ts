import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredients } from '../../types/ingredients';
import { v4 as uuidv4 } from 'uuid';

interface IngredientsState {
	ingredients: IIngredients[];
	viewedIngredient: IIngredients | null;
	burgerConstructor: Array<IIngredients & { uuid: string }>;
}

const initialState: IngredientsState = {
	ingredients: [],
	viewedIngredient: null,
	burgerConstructor: [],
};

export const addItemToConstructorWithUuid = (ingredient: IIngredients) => {
	return ingredientsSlice.actions.addItemToConstructor({
		...ingredient,
		uuid: uuidv4(),
	});
};

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		setIngredients(state, action: PayloadAction<IIngredients[]>) {
			state.ingredients = action.payload;
		},
		setViewedIngredient(state, action: PayloadAction<IIngredients | null>) {
			state.viewedIngredient = action.payload;
		},
		addItemToConstructor(
			state,
			action: PayloadAction<IIngredients & { uuid: string }>
		) {
			state.burgerConstructor.push(action.payload);
		},
		removeItemFromConstructor(state, action: PayloadAction<string>) {
			state.burgerConstructor = state.burgerConstructor.filter(
				(item) => item.uuid !== action.payload
			);
		},
		moveItemInConstructor(
			state,
			action: PayloadAction<{ fromIndex: number; toIndex: number }>
		) {
			const { fromIndex, toIndex } = action.payload;
			const [movedItem] = state.burgerConstructor.splice(fromIndex, 1);
			state.burgerConstructor.splice(toIndex, 0, movedItem);
		},
		clearConstructor(state) {
			state.burgerConstructor = [];
		},
	},
});
export const {
	setIngredients,
	setViewedIngredient,
	removeItemFromConstructor,
	moveItemInConstructor,
	clearConstructor,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
