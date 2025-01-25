import { url_token } from '../../constants/api';
import {
	getRefTokenToLocal,
	removeRefToken,
	removeToken,
	setRefTokenToLocal,
	setTokenToLocal,
} from '../../constants/local-storage';

interface TokenResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
}
interface ResponseData {
	ok: boolean;
	json: () => Promise<any>;
	status: number;
}

/**
 * Универсальная проверка ответа сервера
 */
export const checkReponse = <T>(res: ResponseData): Promise<T> =>
	res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

/**
 * Функция обновления токена
 */
export const refreshToken = async (): Promise<TokenResponse> => {
	const res = await fetch(url_token, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: getRefTokenToLocal(),
		}),
	});

	const refreshData = await checkReponse<TokenResponse>(res);
	if (!refreshData.success) {
		removeToken();
		removeRefToken();
		return Promise.reject(refreshData);
	}

	setRefTokenToLocal(refreshData.refreshToken);
	setTokenToLocal(refreshData.accessToken);
	return refreshData;
};

/**
 * Запрос с автообновлением токена при ошибке
 */
export const fetchWithRefresh = async <T>(
	url: string,
	options: RequestInit
): Promise<T> => {
	try {
		const res = await fetch(url, options);
		return await checkReponse<T>(res);
	} catch (err: any) {
		if (err.message === 'jwt expired' || err.message === 'Token is invalid') {
			const refreshData = await refreshToken(); // обновляем токен
			const newOptions: RequestInit = {
				...options,
				headers: {
					...options.headers,
					authorization: refreshData.accessToken,
				},
			};
			const res = await fetch(url, newOptions); // повторяем запрос
			return await checkReponse<T>(res);
		} else {
			return Promise.reject(err);
		}
	}
};
