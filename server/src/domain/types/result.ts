export interface Result<T, E = Error> {
  data: T | null;
  error: E | null;
}

export const success = <T, E = Error>(data: T): Result<T, E> => ({
  data,
  error: null,
});

export const failure = <T, E = Error>(error: E): Result<T, E> => ({
  data: null,
  error,
});