// Интерфейс ответа сервера при успешном выходе
import { fetchWithRefresh } from './fetch';
import { url_ingredients } from '../../constants/api';
import { IIngredientsResponse } from '../../types/ingredients';
// Функция выхода из системы

// Функция получения ингредиентов
export const getIngredients = async (): Promise<
	IIngredientsResponse | undefined
> => {
	try {
		const response = await fetchWithRefresh<IIngredientsResponse>(
			url_ingredients,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
			}
		);

		if (response.success) {
			return response;
		}
	} catch (error) {
		console.error('Ошибка при получении ингредиентов:', error);
	}
};
