"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, description, httpMessage, httpCode) {
        super();
        this.message = message;
        this.description = description;
        this.http_message = httpMessage;
        this.http_code = httpCode;
    }
}
exports.CustomError = CustomError;
