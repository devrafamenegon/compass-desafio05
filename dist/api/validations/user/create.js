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
exports.createUserRules = void 0;
const formatJoiMessage_1 = __importDefault(require("../../utils/formatJoiMessage"));
const joi_1 = __importDefault(require("joi"));
const BadRequestError_1 = __importDefault(require("../../errors/BadRequestError"));
const error_messages_1 = require("../../utils/error_messages");
exports.createUserRules = joi_1.default.object({
    email: joi_1.default.string().email().required().trim().max(320),
    password: joi_1.default.string().required().min(6).max(20).trim()
});
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield exports.createUserRules.validate(req.body, { abortEarly: false });
        if (error != null)
            throw error;
        return next();
    }
    catch (error) {
        return next(new BadRequestError_1.default(error_messages_1.ErrorMessages.BAD_REQUEST, (0, formatJoiMessage_1.default)(error)));
    }
});
