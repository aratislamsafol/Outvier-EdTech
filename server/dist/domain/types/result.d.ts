export interface Result<T, E = Error> {
    data: T | null;
    error: E | null;
}
export declare const success: <T, E = Error>(data: T) => Result<T, E>;
export declare const failure: <T, E = Error>(error: E) => Result<T, E>;
//# sourceMappingURL=result.d.ts.map