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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductRepository_1 = __importDefault(require("../repositories/ProductRepository"));
const BadRequestError_1 = __importDefault(require("../errors/BadRequestError"));
const isValidUuid_1 = __importDefault(require("../utils/isValidUuid"));
const createWithCsv_1 = __importDefault(require("../validations/product/createWithCsv"));
const product_1 = require("../utils/error_messages/product");
const NotFoundError_1 = __importDefault(require("../errors/NotFoundError"));
const mapper_json_1 = __importDefault(require("../../mapper/mapper.json"));
const InternalServerError_1 = __importDefault(require("../errors/InternalServerError"));
class ProductService {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIfBarcodesAlreadyExists(payload.bar_codes);
            const result = yield ProductRepository_1.default.create(payload);
            void this.checkIfResultIsNotNull(result, product_1.ProductErrorMessages.PRODUCT_NOT_CREATED);
            return result;
        });
    }
    findAll(query, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryBuilded = {};
            Object.keys(query).forEach(key => {
                queryBuilded[key] = { $regex: query[key] };
            });
            queryBuilded.stock_control_enabled = true;
            const result = yield ProductRepository_1.default.findAll(queryBuilded, page !== null && page !== void 0 ? page : 1);
            if (result.totalCount === 0)
                throw new NotFoundError_1.default(product_1.ProductErrorMessages.PRODUCT_NOT_FOUND, `Products not found with query: ${JSON.stringify(query)}`);
            return result;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIfIsValidUuid(id);
            const result = yield ProductRepository_1.default.findOne(id);
            if (result === null)
                throw new NotFoundError_1.default(product_1.ProductErrorMessages.PRODUCT_NOT_FOUND, `Product not found with this id: ${id}`);
            return result;
        });
    }
    findLowStock(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductRepository_1.default.findLowStock(page !== null && page !== void 0 ? page : 1);
            if (result.totalCount === 0)
                throw new NotFoundError_1.default(product_1.ProductErrorMessages.PRODUCT_NOT_FOUND, 'No products found with low stock');
            return result;
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIfIsValidUuid(id);
            yield this.checkIfProductInDatabase(id);
            payload.qtd_stock === 0 ? payload.stock_control_enabled = false : payload.stock_control_enabled = true;
            yield this.checkIfBarcodesAlreadyExists(payload.bar_codes);
            const result = yield ProductRepository_1.default.update(id, payload);
            void this.checkIfResultIsNotNull(result, product_1.ProductErrorMessages.PRODUCT_NOT_UPDATED);
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIfIsValidUuid(id);
            yield this.checkIfProductInDatabase(id);
            const result = yield ProductRepository_1.default.delete(id);
            return result;
        });
    }
    createWithCsv(file) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (file.mimetype !== 'text/csv')
                throw new BadRequestError_1.default(product_1.ProductErrorMessages.NOT_CSV_FILE, `${file.mimetype} is not a csv file`);
            if (file.size > 1000000)
                throw new BadRequestError_1.default(product_1.ProductErrorMessages.CSV_FILE_TOO_BIGGER, 'File is too big');
            const lines = file.buffer.toString('utf-8').trim().split('\n');
            const headers = lines[0];
            const csvFormat = headers.replace(/\r/g, '').split(',');
            const customResult = {
                success: 0,
                errors: 0,
                errors_details: []
            };
            lines.shift();
            const products = lines.map(line => {
                return line.replace(/\r/g, '').split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            });
            try {
                for (var products_1 = __asyncValues(products), products_1_1; products_1_1 = yield products_1.next(), !products_1_1.done;) {
                    const property = products_1_1.value;
                    const payload = Object.assign({}, csvFormat.reduce((acc, cur, i) => (Object.assign(Object.assign({}, acc), { [cur]: property[i] })), {}));
                    property.forEach((value, index) => {
                        payload[csvFormat[index]] = value.replace(/"/g, '');
                        payload.price = Number(payload.price.toString().replace(',', '.'));
                        payload.qtd_stock = Number(payload.qtd_stock);
                    });
                    const payloadValidate = yield (0, createWithCsv_1.default)(payload);
                    if (payloadValidate !== null) {
                        customResult.errors += 1;
                        customResult.errors_details.push({
                            title: payload.title,
                            bar_codes: payload.bar_codes,
                            error: payloadValidate.length > 1 ? payloadValidate : payloadValidate.toString()
                        });
                    }
                    else {
                        customResult.success += 1;
                        yield this.create(payload);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (products_1_1 && !products_1_1.done && (_a = products_1.return)) yield _a.call(products_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return customResult;
        });
    }
    findOneWithMapper(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductRepository_1.default.findOne(id);
            if (result === null)
                throw new NotFoundError_1.default(product_1.ProductErrorMessages.PRODUCT_NOT_FOUND, `Product not found with this id: ${id}`);
            const { fields } = mapper_json_1.default;
            const marketplaceObject = fields.map(field => {
                const { type, fieldProduct, fieldMarket, optional } = field;
                const productLocation = fieldProduct.replace('product.', '');
                const marketLocation = fieldMarket.split('.');
                const marketObject = {};
                marketLocation.reduce((auxObj, marketIndex) => {
                    const isLastIndex = marketLocation.indexOf(marketIndex) === marketLocation.length - 1;
                    if (isLastIndex) {
                        type === 'text'
                            ? auxObj[marketIndex] = result[productLocation].toString()
                            : type === 'number'
                                ? auxObj[marketIndex] = Number(result[productLocation])
                                : type === 'boolean'
                                    ? auxObj[marketIndex] = Boolean(result[productLocation])
                                    : type === 'array'
                                        ? auxObj[marketIndex] = Array(result[productLocation])
                                        : auxObj[marketIndex] = result[productLocation];
                        if (optional != null) {
                            const option = Object.values(optional);
                            const [title, locale, currency] = option;
                            const stringObj = auxObj[marketIndex].toString();
                            if (title === 'break') {
                                auxObj[marketIndex] = stringObj.match(/.{2}/g);
                                auxObj[marketIndex].push(stringObj.charAt(stringObj.length - 1));
                            }
                            else if (title === 'currency') {
                                auxObj[marketIndex] = Number(auxObj[marketIndex]).toLocaleString(locale, { style: 'currency', currency });
                            }
                            return auxObj[marketIndex];
                        }
                    }
                    auxObj[marketIndex] = {};
                    return auxObj[marketIndex];
                }, marketObject);
                return marketObject;
            });
            let mergedMarketObject = {};
            marketplaceObject.forEach(objLine => {
                mergedMarketObject = this.mergeObjLines(mergedMarketObject, objLine);
            });
            return mergedMarketObject;
        });
    }
    checkIfBarcodesAlreadyExists(barCodes) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield ProductRepository_1.default.findByBarcode(barCodes);
            if (product !== null) {
                throw new BadRequestError_1.default(product_1.ProductErrorMessages.BARCODES_ALREADY_EXIST, 'You can not create a product with barcodes that already exist');
            }
        });
    }
    checkIfIsValidUuid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, isValidUuid_1.default)(id))
                throw new BadRequestError_1.default(product_1.ProductErrorMessages.INVALID_PRODUCT_ID, 'Id is not a valid uuid');
        });
    }
    checkIfProductInDatabase(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield ProductRepository_1.default.findOne(id);
            if (product === null)
                throw new NotFoundError_1.default(product_1.ProductErrorMessages.PRODUCT_NOT_FOUND, `Product not found with this id: ${id}`);
        });
    }
    checkIfResultIsNotNull(result, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (result === null)
                throw new InternalServerError_1.default(message);
        });
    }
    isObject(item) {
        return ((Boolean(item)) && typeof item === 'object' && !Array.isArray(item));
    }
    mergeObjLines(target, ...sources) {
        if (sources.length === 0)
            return target;
        const source = sources.shift();
        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
                if (this.isObject(source[key])) {
                    if (target[key] != null) {
                        Object.assign(target, { [key]: {} });
                    }
                    this.mergeObjLines(target[key], source[key]);
                }
                else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }
        return this.mergeObjLines(target, ...sources);
    }
}
exports.default = new ProductService();
