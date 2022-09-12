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
const BadRequestError_1 = __importDefault(require("../../errors/BadRequestError"));
const joi_1 = __importDefault(require("joi"));
const formatJoiMessage_1 = __importDefault(require("../../utils/formatJoiMessage"));
const error_messages_1 = require("../../utils/error_messages");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let schema;
        if (req.method === 'PUT') {
            schema = joi_1.default.object({
                title: joi_1.default.string().required().trim(),
                description: joi_1.default.string().required().trim(),
                department: joi_1.default.string().required().trim(),
                brand: joi_1.default.string().required().trim(),
                price: joi_1.default.number().required().min(0.01).max(1000),
                qtd_stock: joi_1.default.number().required().min(0).max(100000),
                bar_codes: joi_1.default.string().required().trim().length(13).pattern(/^[0-9]+$/)
            });
        }
        else if (req.method === 'PATCH') {
            schema = joi_1.default.object({
                title: joi_1.default.string().optional().trim(),
                description: joi_1.default.string().optional().trim(),
                department: joi_1.default.string().optional().trim(),
                brand: joi_1.default.string().optional().trim(),
                price: joi_1.default.number().optional().min(0.01).max(1000),
                qtd_stock: joi_1.default.number().optional().min(0).max(100000),
                bar_codes: joi_1.default.string().optional().trim().length(13).pattern(/^[0-9]+$/)
            });
        }
        else {
            throw new BadRequestError_1.default(error_messages_1.ErrorMessages.INVALID_METHOD, 'Only PUT and PATCH methods are allowed');
        }
        const { error } = yield schema.validate(req.body, { abortEarly: false });
        if (error != null)
            throw error;
        return next();
    }
    catch (error) {
        return next(new BadRequestError_1.default(error_messages_1.ErrorMessages.BAD_REQUEST, (0, formatJoiMessage_1.default)(error)));
    }
});
