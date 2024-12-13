// Интерфейс данных пользователя для регистрации
import { fetchWithRefresh } from './fetch';
import {
	url_password_reset_step_1,
	url_password_reset_step_2,
} from '../../constants/api';

interface ResetRequestBody {
	email?: string;
	password?: string;
	token?: string;
}

// Интерфейс ответа от сервера при успешной регистрации
interface AuthResponse {
	success: boolean;
	message: string;
}

// Функция регистрации пользователя
export const resetPassword = async (
	email: string,
	successCallback: () => void
): Promise<void> => {
	const url = url_password_reset_step_1;

	const requestBody: ResetRequestBody = {
		email,
	};

	try {
		const response: AuthResponse = await fetchWithRefresh(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(requestBody),
		});

		if (response.success) {
			successCallback();
		}
	} catch (error) {
		console.error('Ошибка при регистрации пользователя:', error);
	}
};

export const newPassword = async (
	password: string,
	token: string,
	successCallback: () => void
): Promise<void> => {
	const url = url_password_reset_step_2;

	const requestBody: ResetRequestBody = {
		password,
		token,
	};

	try {
		const response: AuthResponse = await fetchWithRefresh(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(requestBody),
		});

		if (response.success) {
			successCallback();
		}
	} catch (error) {
		console.error('Ошибка при регистрации пользователя:', error);
	}
};
