"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../utils/error_messages/user");
const UnauthorizedError_1 = __importDefault(require("../errors/UnauthorizedError"));
exports.default = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (token === undefined)
        return next(new UnauthorizedError_1.default(user_1.UserErrorMessages.TOKEN_NOT_PROVIDED, 'You need to send a token.'));
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err !== null)
            return next(new UnauthorizedError_1.default(user_1.UserErrorMessages.TOKEN_INVALID, 'You need to send a valid token'));
        return next();
    });
};
