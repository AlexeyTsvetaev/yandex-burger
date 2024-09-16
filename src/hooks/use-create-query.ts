
import { useMutation, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';
import { IErrorResponse } from '../types/i-error-response';

const fetchData = async <T>(
	endpoint: string,
	pathsParams: string,
	body: any
): Promise<T> => {
	const response = await axios.post<T>(endpoint + pathsParams, body);
	return response.data;
};

export function useCreateQuery<T, K>(
	successCallback: (data: T) => void,
	endpoint: string,
	invalidateKey: string | Array<string>,
	pathsParams: () => string = () => ''
) {
	const queryClient = useQueryClient();

	const mutation = useMutation<T, AxiosError<IErrorResponse>, K>(
		(body: K) => fetchData<T>(endpoint, pathsParams(), body),
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries({
					queryKey: invalidateKey,
				});
				successCallback(data);
			},
			onError: (error) => {
				console.log(error)
			},
		}
	);

	return mutation;
}
