"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("./CustomError");
class UnauthorizedError extends CustomError_1.CustomError {
    constructor(message, description) {
        super(message, description, 'You are unauthorized to access the requested resource. Please log in.', 401);
    }
}
exports.default = UnauthorizedError;
