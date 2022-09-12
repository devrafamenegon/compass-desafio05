"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../errors/CustomError");
const logger_1 = __importDefault(require("../utils/logger"));
exports.default = (error, req, res, next) => {
    let customError = error;
    logger_1.default.error(error);
    if (error instanceof CustomError_1.CustomError) {
        customError = error;
    }
    else {
        customError = new CustomError_1.CustomError('Internal Server Error', 'Something went wrong', 'Internal Server Error', 500);
    }
    return res.status(customError.http_code).json({
        message: customError.message,
        description: customError.description,
        http_response: {
            message: customError.http_message,
            code: customError.http_code
        }
    });
};
