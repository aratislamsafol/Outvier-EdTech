"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = void 0;
const success = (data) => ({
    data,
    error: null,
});
exports.success = success;
const failure = (error) => ({
    data: null,
    error,
});
exports.failure = failure;
//# sourceMappingURL=result.js.map