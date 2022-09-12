"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_router_1 = __importDefault(require("./product.router"));
const user_router_1 = __importDefault(require("./user.router"));
exports.default = [product_router_1.default, user_router_1.default];
