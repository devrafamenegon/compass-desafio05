"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_router_1 = __importDefault(require("./routes/index.router"));
const index_1 = __importDefault(require("./infra/database/mongo/index"));
const errorHandler_1 = __importDefault(require("./api/middlewares/errorHandler"));
const logger_1 = __importDefault(require("./config/logger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./static/swagger.json"));
void index_1.default.connect();
class App {
    constructor() {
        this.server = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    init() {
        return this.server;
    }
    middlewares() {
        this.server.use(express_1.default.json({}));
        this.server.use(express_1.default.urlencoded({ extended: true }));
        this.server.use(logger_1.default);
    }
    routes() {
        this.server.use('/api/v1', ...index_router_1.default);
        this.server.use('/api/v1/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
        this.server.use(errorHandler_1.default);
    }
}
exports.default = new App().init();
