import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	IIngredientsResponse,
	ICreateOrderResponse,
	ICreateOrderRequest,
} from '../../types/ingredients';
import { url_ingredients, url_order } from '../../constants/api';
import { getTokenToLocal } from '../../constants/local-storage';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api',
		prepareHeaders: (headers) => {
			const token = getTokenToLocal(); // Достаем токен из localStorage
			if (token) {
				headers.set('Authorization', `${token}`); // Добавляем токен в заголовки
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getIngredients: builder.query<IIngredientsResponse, void>({
			query: () => url_ingredients,
		}),
		createOrder: builder.mutation<ICreateOrderResponse, ICreateOrderRequest>({
			query: (orderData) => ({
				url: url_order,
				method: 'POST',
				body: orderData,
			}),
		}),
	}),
});

export const { useGetIngredientsQuery, useCreateOrderMutation } = apiSlice;
