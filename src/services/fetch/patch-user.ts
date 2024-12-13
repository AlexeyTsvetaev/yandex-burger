import { url_patch_user } from '../../constants/api';
import { getTokenToLocal } from '../../constants/local-storage';
import { fetchWithRefresh } from './fetch';

// Интерфейс для данных, которые будут обновляться
interface UpdateUserRequestBody {
	email?: string;
	name?: string;
	password?: string;
}

// Интерфейс для ответа от сервера
interface UpdateUserResponse {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
}

export const updateUserData = async (
	updatedData: UpdateUserRequestBody
): Promise<UpdateUserResponse> => {
	try {
		// Получаем токен из localStorage
		const accessToken = getTokenToLocal();

		// Проверка на наличие токена
		if (!accessToken) {
			throw new Error('Токена нема');
		}

		const response: UpdateUserResponse = await fetchWithRefresh(
			url_patch_user,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `${accessToken}`,
				},
				body: JSON.stringify(updatedData),
			}
		);

		// Проверяем успешность запроса
		if (response.success) {
			return response;
		} else {
			throw new Error('Ошибочка');
		}
	} catch (error) {
		console.error('Ошибка при обновлении данных пользователя:', error);
		throw error;
	}
};
