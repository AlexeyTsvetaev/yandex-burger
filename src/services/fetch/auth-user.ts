// Интерфейс данных пользователя для регистрации
import { fetchWithRefresh } from './fetch';
import { url_auth, url_reg } from '../../constants/api';
import {
	setRefTokenToLocal,
	setTokenToLocal,
} from '../../constants/local-storage';
import { useDispatch } from 'react-redux';

interface AuthRequestBody {
	email: string;
	password: string;
}

// Интерфейс ответа от сервера при успешной авторизации
interface AuthResponse {
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
): Promise<void> => {
	const url = url_auth;
	const requestBody: AuthRequestBody = {
		email,
		password,
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
			// Сохраняем токены в localStorage
			setRefTokenToLocal(response.refreshToken);
			setTokenToLocal(response.accessToken);
			successCallback();
		}
	} catch (error) {
		console.error('Ошибка при регистрации пользователя:', error);
	}
};
