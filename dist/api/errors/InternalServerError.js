"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("./CustomError");
class InternalServerError extends CustomError_1.CustomError {
    constructor(message) {
        super(message, 'Some internal error occurred', 'Unexpected internal server error.', 500);
    }
}
exports.default = InternalServerError;
