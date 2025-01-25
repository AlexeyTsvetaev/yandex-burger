import {
	it,
	expect,
	jest,
	describe,
	beforeEach,
	afterEach,
} from '@jest/globals';
import { authUser } from '../auth-user';
import { fetchWithRefresh } from '../fetch';
import { AuthResponse } from '../auth-user';

jest.mock('../fetch', () => ({
	fetchWithRefresh: jest.fn(),
}));

describe('check fetch register', () => {
	beforeEach(() => {
		// @ts-ignore — игнорируем TS-ошибки приведения типов
		(fetchWithRefresh as jest.Mock).mockResolvedValue({
			success: true,
			accessToken: 'testAccessToken',
			refreshToken: 'testRefreshToken',
			user: {
				email: 'hellsong7@yandex.ru',
				name: 'Test User',
			},
		} as AuthResponse);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return auth response', async () => {
		const result = await authUser(
			'hellsong7@yandex.ru',
			'testpassword',
			() => {}
		);
		expect(result).toEqual({
			success: true,
			accessToken: 'testAccessToken',
			refreshToken: 'testRefreshToken',
			user: {
				email: 'hellsong7@yandex.ru',
				name: 'Test User',
			},
		});
		expect(fetchWithRefresh).toHaveBeenCalledTimes(1);
	});
});
