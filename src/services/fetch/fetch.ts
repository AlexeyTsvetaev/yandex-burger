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
}

const checkReponse = (res: ResponseData) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = (): Promise<TokenResponse> => {
	return fetch(url_token, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: getRefTokenToLocal(),
		}),
	})
		.then(checkReponse)
		.then((refreshData: TokenResponse) => {
			if (!refreshData.success) {
				removeToken();
				removeRefToken();
				return Promise.reject(refreshData);
			}
			setRefTokenToLocal(refreshData.refreshToken);
			setTokenToLocal(refreshData.accessToken);
			return refreshData;
		});
};

export const fetchWithRefresh = async (
	url: string,
	options: RequestInit
): Promise<any> => {
	try {
		const res = await fetch(url, options);
		return await checkReponse(res);
	} catch (err: any) {
		if (err.message === 'invalid token') {
			const refreshData = await refreshToken(); // обновляем токен
			options.headers = {
				...options.headers,
				authorization: refreshData.accessToken,
			};
			const res = await fetch(url, options); // повторяем запрос
			return await checkReponse(res);
		} else if (err.message === 'jwt expired') {
			const refreshData = await refreshToken(); // обновляем токен
			options.headers = {
				...options.headers,
				authorization: refreshData.accessToken,
			};
			const res = await fetch(url, options); // повторяем запрос
			return await checkReponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};
