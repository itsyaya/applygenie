import { useCallback, useState } from 'react';
import { getErrorMessage } from '@/utils';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useAsync = <T,>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await asyncFunction();
      setState({ data: response, loading: false, error: null });
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, [asyncFunction]);

  useState(() => {
    if (immediate) {
      execute();
    }
  });

  return { ...state, execute };
};

export const useMutation = <TData, TError = Error>(
  mutationFn: () => Promise<TData>
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<TError | null>(null);

  const mutate = useCallback(
    async (onSuccess?: (data: TData) => void, onError?: (error: TError) => void) => {
      setLoading(true);
      setError(null);

      try {
        const data = await mutationFn();
        setLoading(false);
        onSuccess?.(data);
        return data;
      } catch (err) {
        const error = err as TError;
        setError(error);
        setLoading(false);
        onError?.(error);
        throw error;
      }
    },
    [mutationFn]
  );

  return { mutate, loading, error };
};
