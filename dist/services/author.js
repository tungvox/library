"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Author_1 = __importDefault(require("../models/Author"));
function create(author) {
    return author.save();
}
function findById(authorId) {
    return Author_1.default.findById(authorId)
        .exec()
        .then((author) => {
        if (!author) {
            throw new Error(`Author ${authorId} not found`);
        }
        return author;
    });
}
function findAll() {
    return Author_1.default.find().sort({ firstName: 1 }).exec();
}
function update(authorId, update) {
    return Author_1.default.findById(authorId)
        .exec()
        .then((author) => {
        if (!author) {
            throw new Error(`Author ${authorId} not found`);
        }
        if (update.firstName) {
            author.firstName = update.firstName;
        }
        if (update.lastName) {
            author.lastName = update.lastName;
        }
        if (update.email) {
            author.email = update.email;
        }
        return author.save();
    });
}
function deleteAuthor(authorId) {
    return Author_1.default.findByIdAndDelete(authorId).exec();
}
exports.default = {
    create,
    findById,
    findAll,
    update,
    deleteAuthor,
};
//# sourceMappingURL=author.js.map