import { it, expect } from '@jest/globals';
import { checkReponse } from '../fetch';

describe('check jsonResponse', () => {
	it('success', () => {
		const jsonResponse = {
			ok: true,
			json: function () {
				return { result: 'ok' };
			},
		} as unknown as Response;
		const result = checkReponse(jsonResponse);
		expect(result).toEqual({ result: 'ok' });
	});
	it('fail', () => {
		const jsonResponse = {
			ok: false,
			status: 500,
		} as unknown as Response;
		const result = checkReponse(jsonResponse);
		expect(result).rejects.toBe('Ошибка: 500');
	});
});
