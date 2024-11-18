import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	IIngredientsResponse,
	ICreateOrderResponse,
	ICreateOrderRequest,
} from '../../types/ingredients';
import { url_ingredients, url_order } from '../../constants/api';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
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
