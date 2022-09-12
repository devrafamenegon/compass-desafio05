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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../services/ProductService"));
class ProductController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const result = yield ProductService_1.default.create(payload);
                return res.status(201).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.query, { page } = _a, body = __rest(_a, ["page"]);
                const result = yield ProductService_1.default.findAll(body, page);
                return res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield ProductService_1.default.findOne(id);
                return res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findLowStock(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page } = req.query;
                const result = yield ProductService_1.default.findLowStock(page);
                return res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const payload = req.body;
                const result = yield ProductService_1.default.update(id, payload);
                return res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield ProductService_1.default.delete(id);
                return res.status(204).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createWithCsv(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                const result = yield ProductService_1.default.createWithCsv(file);
                return res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findOneWithMapper(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield ProductService_1.default.findOneWithMapper(id);
                return res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ProductController();
