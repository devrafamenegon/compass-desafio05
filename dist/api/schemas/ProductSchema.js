"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const crypto_1 = require("crypto");
const schema = new mongoose_1.Schema({
    _id: { type: String, default: crypto_1.randomUUID },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.01,
        max: 1000
    },
    qtd_stock: {
        type: Number,
        required: true,
        min: 0,
        max: 100000
    },
    stock_control_enabled: {
        type: Boolean,
        required: true,
        default: true,
        validate: function () {
            return this.qtd_stock > 0;
        }
    },
    bar_codes: {
        type: String,
        required: true,
        unique: true,
        minlength: 13,
        maxlength: 13
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false
});
schema.plugin(mongoose_paginate_v2_1.default);
const Product = (0, mongoose_1.model)('Product', schema);
exports.default = Product;
