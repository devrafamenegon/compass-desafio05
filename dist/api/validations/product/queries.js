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
const BadRequestError_1 = __importDefault(require("../../errors/BadRequestError"));
const product_1 = require("../../utils/error_messages/product");
const acceptedKeys = ['department', 'brand', 'page'];
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        for (const key in query) {
            if (!acceptedKeys.includes(key)) {
                throw new BadRequestError_1.default(product_1.ProductErrorMessages.INVALID_QUERY_PARAMS, `Query ${key} is not a valid query parameter`);
            }
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.name,
            details: [
                { message: error.message, acceptedKeys }
            ]
        });
    }
    return next();
});
