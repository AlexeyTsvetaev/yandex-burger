// Интерфейс данных пользователя для регистрации
import { fetchWithRefresh } from './fetch';
import { url_auth, url_reg } from '../../constants/api';
import {
	setRefTokenToLocal,
	setTokenToLocal,
} from '../../constants/local-storage';

interface AuthRequestBody {
	email: string;
	password: string;
}

// Интерфейс ответа от сервера при успешной авторизации
export interface AuthResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: {
		email: string;
		name: string;
	};
}

// Функция авторизации пользователя
export const authUser = async (
	email: string,
	password: string,
	successCallback: () => void
): Promise<AuthResponse> => {
	const url = url_auth;

	const requestBody: AuthRequestBody = {
		email,
		password,
	};

	try {
		const response: AuthResponse = await fetchWithRefresh<AuthResponse>(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(requestBody),
		});

		if (response.success) {
			// Сохраняем токены в localStorage
			setRefTokenToLocal(response.refreshToken);
			setTokenToLocal(response.accessToken);
			successCallback();
			return response; // Возвращаем ответ сервера
		}

		throw new Error('Авторизация не удалась'); // Генерируем ошибку, если success = false
	} catch (error) {
		console.error('Ошибка при авторизации пользователя:', error);
		throw error; // Пробрасываем ошибку дальше
	}
};
