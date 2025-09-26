import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

type MutationFn<TData, TVariables> = (variables: TVariables) => Promise<TData>;

export const useApiMutation = <TData = unknown, TVariables = void>(
  mutationFn: MutationFn<TData, TVariables>,
  options?: UseMutationOptions<TData, Error, TVariables>
): UseMutationResult<TData, Error, TVariables> => {
  return useMutation<TData, Error, TVariables>({
    mutationFn,
    ...options,
  });
};
