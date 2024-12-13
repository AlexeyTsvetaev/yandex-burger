// Интерфейс данных пользователя для регистрации
import { fetchWithRefresh } from './fetch';
import { url_reg } from '../../constants/api';
import {
	setRefTokenToLocal,
	setTokenToLocal,
} from '../../constants/local-storage';

interface RegisterRequestBody {
	email: string;
	password: string;
	name: string;
}

// Интерфейс ответа от сервера при успешной регистрации
interface RegisterResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: {
		email: string;
		name: string;
	};
}

// Функция регистрации пользователя
export const registerUser = async (
	email: string,
	password: string,
	name: string,
	successCallback: () => void
): Promise<void> => {
	const url = url_reg;

	const requestBody: RegisterRequestBody = {
		email,
		password,
		name,
	};

	try {
		const response: RegisterResponse = await fetchWithRefresh(url, {
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
		}
	} catch (error) {
		console.error('Ошибка при регистрации пользователя:', error);
	}
};
