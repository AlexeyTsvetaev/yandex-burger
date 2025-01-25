import ingredientsReducer, {
	setIngredients,
	setViewedIngredient,
	addItemToConstructorWithUuid,
	removeItemFromConstructor,
	moveItemInConstructor,
	clearConstructor,
	addItemToConstructor,
} from './ingredients-slice';

import { IIngredients } from '../../types/ingredients';

describe('ingredientsSlice reducer', () => {
	const initialState = {
		ingredients: [],
		viewedIngredient: null,
		burgerConstructor: [],
	};

	const mockIngredient: IIngredients = {
		_id: '1',
		name: 'Bun',
		type: 'bun',
		proteins: 10,
		fat: 5,
		carbohydrates: 20,
		calories: 100,
		price: 50,
		image: 'image-url',
	};

	it('should return the initial state', () => {
		// @ts-ignore
		expect(ingredientsReducer(undefined, { type: undefined })).toEqual(
			initialState
		);
	});

	it('should handle setIngredients', () => {
		expect(
			ingredientsReducer(initialState, setIngredients([mockIngredient]))
		).toEqual({
			...initialState,
			ingredients: [mockIngredient],
		});
	});

	it('should handle setViewedIngredient', () => {
		expect(
			ingredientsReducer(initialState, setViewedIngredient(mockIngredient))
		).toEqual({
			...initialState,
			viewedIngredient: mockIngredient,
		});
	});

	it('should handle addItemToConstructor', () => {
		const uuid = '123'; // Статичный UUID
		const ingredientWithUuid = { ...mockIngredient, uuid }; // Добавляем его вручную

		const newState = ingredientsReducer(
			initialState,
			addItemToConstructor(ingredientWithUuid) // Используем addItemToConstructor, т.к. он не вызывает uuidv4()
		);

		expect(newState).toEqual({
			...initialState,
			burgerConstructor: [{ ...mockIngredient, uuid }],
		});
	});

	it('should handle removeItemFromConstructor', () => {
		const stateWithIngredient = {
			...initialState,
			burgerConstructor: [{ ...mockIngredient, uuid: '123' }],
		};

		expect(
			ingredientsReducer(stateWithIngredient, removeItemFromConstructor('123'))
		).toEqual({
			...initialState,
			burgerConstructor: [],
		});
	});

	it('should handle moveItemInConstructor', () => {
		const stateWithIngredients = {
			...initialState,
			burgerConstructor: [
				{ ...mockIngredient, uuid: '1' },
				{ ...mockIngredient, uuid: '2' },
			],
		};

		expect(
			ingredientsReducer(
				stateWithIngredients,
				moveItemInConstructor({ fromIndex: 0, toIndex: 1 })
			)
		).toEqual({
			...initialState,
			burgerConstructor: [
				{ ...mockIngredient, uuid: '2' },
				{ ...mockIngredient, uuid: '1' },
			],
		});
	});

	it('should handle clearConstructor', () => {
		const stateWithIngredients = {
			...initialState,
			burgerConstructor: [{ ...mockIngredient, uuid: '1' }],
		};

		expect(
			ingredientsReducer(stateWithIngredients, clearConstructor())
		).toEqual(initialState);
	});
});
