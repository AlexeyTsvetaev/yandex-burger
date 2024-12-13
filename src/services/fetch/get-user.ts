// Интерфейс для ответа от сервера
import { getTokenToLocal } from '../../constants/local-storage';
import { fetchWithRefresh } from './fetch';
import { url_get_user } from '../../constants/api';

interface UserResponse {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
}

export const getUserData = async (): Promise<UserResponse> => {
	try {
		// Получаем токен из localStorage
		const accessToken = getTokenToLocal();

		// Проверка на наличие токена
		if (!accessToken) {
			throw new Error('Access token not found in localStorage');
		}

		// Выполнение запроса к серверу с токеном авторизации
		const response: UserResponse = await fetchWithRefresh(url_get_user, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${accessToken}`,
			},
		});

		// Возвращаем данные пользователя
		if (response.success) {
			return response;
		} else {
			throw new Error('Failed to fetch user data');
		}
	} catch (error) {
		console.error('Ошибка при получении данных пользователя:', error);
		throw error;
	}
};
