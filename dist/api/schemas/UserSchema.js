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
const mongoose_1 = require("mongoose");
const crypto_1 = require("crypto");
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT = Number(process.env.BCRYPT_SALT);
const UserSchema = new mongoose_1.Schema({
    _id: { type: String, default: crypto_1.randomUUID },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            return {
                _id: ret._id,
                email: ret.email,
                created_at: ret.created_at,
                updated_at: ret.updated_at
            };
        }
    },
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false
});
UserSchema.pre('save', function save(next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        try {
            const salt = yield bcrypt_1.default.genSalt(SALT);
            this.password = yield bcrypt_1.default.hash(this.password, salt);
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
});
UserSchema.methods.validatePassword = function validatePassword(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(data, this.password);
    });
};
exports.default = (0, mongoose_1.model)('User', UserSchema);
