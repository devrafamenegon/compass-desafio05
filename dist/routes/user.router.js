"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../api/controllers/UserController"));
const login_1 = __importDefault(require("../api/validations/user/login"));
const register_1 = __importDefault(require("../api/validations/user/register"));
const prefix = '/user';
const router = (0, express_1.Router)();
router.post(prefix, register_1.default, UserController_1.default.register);
router.post(`${prefix}/login`, login_1.default, UserController_1.default.login);
exports.default = router;
