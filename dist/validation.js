"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.registerValidation = (data) => {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string()
            .min(2)
            .required(),
        lastName: joi_1.default.string()
            .min(2)
            .required(),
        email: joi_1.default.string()
            .min(6)
            .required()
            .email(),
        password: joi_1.default.string()
            .min(6)
            .required(),
        isAdmin: joi_1.default.boolean()
            .default(false)
            .required()
    });
    return schema.validate(data);
};
exports.loginValidation = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string()
            .min(6)
            .required()
            .email(),
        password: joi_1.default.string()
            .min(6)
            .required(),
    });
    return schema.validate(data);
};
//# sourceMappingURL=validation.js.map