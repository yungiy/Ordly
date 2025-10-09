import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
  QueryFunction,
} from '@tanstack/react-query';

export const useApiQuery = <
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData
>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<TData, TError> => {
  return useQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn,
    ...options,
  });
};
