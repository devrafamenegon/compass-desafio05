"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const NotFoundError_1 = __importDefault(require("../errors/NotFoundError"));
const user_1 = require("../utils/error_messages/user");
const BadRequestError_1 = __importDefault(require("../errors/BadRequestError"));
const tokenHandler_1 = require("../utils/tokenHandler");
const InternalServerError_1 = __importDefault(require("../errors/InternalServerError"));
class UserService {
    register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield UserRepository_1.default.findOneByEmail(payload.email);
            if (existingUser != null)
                throw new BadRequestError_1.default(user_1.UserErrorMessages.USER_EMAIL_DUPLICATED, 'User with this email already exists');
            const result = yield UserRepository_1.default.register(payload);
            this.checkIfResultIsNotNull(result, user_1.UserErrorMessages.USER_NOT_CREATED);
            return result;
        });
    }
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.default.findOneByEmail(payload.email);
            if (user == null)
                throw new NotFoundError_1.default(user_1.UserErrorMessages.USER_NOT_FOUND, 'User with this email not found');
            const isPasswordValid = yield bcrypt_1.default.compare(payload.password, user.password);
            if (!isPasswordValid)
                throw new BadRequestError_1.default(user_1.UserErrorMessages.INVALID_PASSWORD, 'Password or email is invalid');
            const tokenPayload = {
                _id: user._id,
                email: user.email
            };
            const token = (0, tokenHandler_1.createToken)(tokenPayload);
            if (token === '')
                throw new InternalServerError_1.default(user_1.UserErrorMessages.TOKEN_NOT_CREATED);
            return { token };
        });
    }
    checkIfResultIsNotNull(result, message) {
        if (result === null)
            throw new InternalServerError_1.default(message);
    }
}
exports.default = new UserService();
