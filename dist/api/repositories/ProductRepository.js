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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ProductSchema_1 = __importDefault(require("../schemas/ProductSchema"));
const product_1 = __importDefault(require("../utils/paginate/product"));
const limitDefault = Number((_a = process.env.DEFAULT_LIMIT_PER_PAGE) !== null && _a !== void 0 ? _a : 50);
class ProductRepository {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductSchema_1.default.create(payload);
        });
    }
    findAll(query, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductSchema_1.default.paginate(query, { page, limit: limitDefault, customLabels: product_1.default });
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductSchema_1.default.findById(id);
        });
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    findByBarcode(bar_codes) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductSchema_1.default.findOne({ bar_codes });
        });
    }
    findLowStock(page) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductSchema_1.default.paginate({
                stock_control_enabled: true,
                qtd_stock: { $lt: 100 }
            }, {
                page,
                limit: limitDefault,
                sort: { qtd_stock: 1 },
                customLabels: product_1.default
            });
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductSchema_1.default.findByIdAndUpdate(id, payload, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductSchema_1.default.findByIdAndDelete(id);
        });
    }
}
exports.default = new ProductRepository();
