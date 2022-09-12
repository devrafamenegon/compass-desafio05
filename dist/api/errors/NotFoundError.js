"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("./CustomError");
class NotFoundError extends CustomError_1.CustomError {
    constructor(message, description) {
        super(message, description, 'We could not find the resource you requested. Please refer to the documentation for the list of resources.', 404);
    }
}
exports.default = NotFoundError;
