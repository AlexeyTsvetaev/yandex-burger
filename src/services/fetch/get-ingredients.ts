// Интерфейс ответа сервера при успешном выходе
import { fetchWithRefresh } from './fetch';
import { url_ingredients } from '../../constants/api';
// Функция выхода из системы
export const getIngredients = async () => {
	try {
		const response = await fetchWithRefresh(url_ingredients, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		});
		if (response.success) {
			return response;
		}
	} catch (error) {
		console.error('Ошибка при выходе из системы:', error);
	}
};
