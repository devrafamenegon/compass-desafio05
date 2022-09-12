"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const { secret, expiresIn } = config_1.default.auth;
function createToken(user) {
    return jsonwebtoken_1.default.sign({ content: user }, secret, { expiresIn });
}
exports.createToken = createToken;
function isValidToken(token) {
    try {
        jsonwebtoken_1.default.verify(token, secret);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isValidToken = isValidToken;
