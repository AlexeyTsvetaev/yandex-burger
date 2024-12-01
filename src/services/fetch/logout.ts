// Интерфейс ответа сервера при успешном выходе
import { fetchWithRefresh } from './fetch';
import { url_logout } from '../../constants/api';
import {
	getRefTokenToLocal,
	removeRefToken,
	removeToken,
} from '../../constants/local-storage';

interface LogoutResponse {
	success: boolean;
	message: string;
}

// Функция выхода из системы
export const logoutUser = async (
	successCallback: () => void
): Promise<void> => {
	try {
		const refreshToken = getRefTokenToLocal();

		if (refreshToken) {
			const response: LogoutResponse = await fetchWithRefresh(url_logout, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({ token: refreshToken }),
			});

			if (!response.success) {
				throw new Error(response.message || 'Ошибка при выходе из системы');
			}
		}

		// Удаляем токены из localStorage
		removeToken();
		removeRefToken();

		// Перенаправляем пользователя на страницу входа
		successCallback();
	} catch (error) {
		console.error('Ошибка при выходе из системы:', error);
	}
};
