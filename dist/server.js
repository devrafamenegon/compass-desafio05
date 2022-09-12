"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./api/utils/logger"));
app_1.default.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000, () => {
    var _a, _b;
    logger_1.default.info(`App starting at http://localhost:${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000}`);
    logger_1.default.info(`Envs: ${(_b = process.env.TARGET) !== null && _b !== void 0 ? _b : 'local'}`);
});
