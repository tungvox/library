"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    ISBN: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    authors: [{
            type: String,
            required: true,
            createdBy: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Author'
            }
        }],
    status: {
        type: String,
        required: true,
    },
    borrowerID: {
        type: Number,
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    borrowDate: {
        type: Date,
    },
    returnDate: {
        type: Date,
    },
});
exports.default = mongoose_1.default.model('Book', bookSchema);
//# sourceMappingURL=Book.js.map