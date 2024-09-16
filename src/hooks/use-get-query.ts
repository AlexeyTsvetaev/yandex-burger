import { useQuery } from 'react-query';
import axios from 'axios';
import { AxiosError } from 'axios'; // Правильный импорт AxiosError
import { IErrorResponse } from '../types/i-error-response';

// Функция для выполнения запроса
const fetchData = async <T>(endpoint: string, pathsParams: string) => {
	const response = await axios.get<T>(endpoint + pathsParams);
	return response.data;
};

export function useGetQuery<T>(
	endpoint: string,
	queryKey: string | Array<string>,
	pathsParams: () => string = () => '',
	refetch?: { enabled: boolean },
	refetchInt: number = 2000,
	retry: boolean = true
) {
	const query = useQuery<T, AxiosError<IErrorResponse>>(
		queryKey,
		() => fetchData<T>(endpoint, pathsParams()),
		{
			enabled: refetch?.enabled ?? true,
			onError: (err: AxiosError<IErrorResponse>) => {
				console.log(err.response?.data || err.message);
			},
			refetchInterval: refetch ? refetchInt : undefined,
			retry: retry,
		}
	);
	return query;
}
