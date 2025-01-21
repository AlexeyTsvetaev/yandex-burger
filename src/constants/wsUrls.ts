import { getTokenToLocal } from './local-storage';

export const OrdersAll = 'wss://norma.nomoreparties.space/orders/all';
const token = getTokenToLocal()?.replace('Bearer ', '');
export const ClientOrders = `wss://norma.nomoreparties.space/orders?token=${token}`;
