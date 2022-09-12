"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("./CustomError");
class BadRequestError extends CustomError_1.CustomError {
    constructor(message, description) {
        super(message, description, 'Invalid syntax for this request was provided.', 400);
    }
}
exports.default = BadRequestError;
