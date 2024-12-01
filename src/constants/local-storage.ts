export const setTokenToLocal = (token: string) =>
	localStorage.setItem('token', token);
export const getTokenToLocal = () => localStorage.getItem('token');
export const setRefTokenToLocal = (token: string) =>
	localStorage.setItem('ref', token);
export const getRefTokenToLocal = () => localStorage.getItem('ref');
export const removeToken = () => localStorage.removeItem('token');
export const removeRefToken = () => localStorage.removeItem('ref');
