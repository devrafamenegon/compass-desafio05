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
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./create");
exports.default = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield create_1.createProductRules.validate(payload, { abortEarly: false });
    const details = error === null || error === void 0 ? void 0 : error.details.map((detail) => {
        return detail.message.replace(/"/g, '').replace(/\//g, '');
    });
    if (details !== undefined) {
        return details;
    }
    return null;
});
