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
/* eslint-disable @typescript-eslint/no-invalid-void-type */
const formatJoiMessage_1 = __importDefault(require("../../utils/formatJoiMessage"));
const register_1 = require("./register");
const BadRequestError_1 = __importDefault(require("../../errors/BadRequestError"));
const error_messages_1 = require("../../utils/error_messages");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield register_1.registerUserRules.validate(req.body, { abortEarly: false });
        if (error != null)
            throw error;
        return next();
    }
    catch (error) {
        return next(new BadRequestError_1.default(error_messages_1.ErrorMessages.BAD_REQUEST, (0, formatJoiMessage_1.default)(error)));
    }
});
