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
const Author_1 = __importDefault(require("../models/Author"));
const author_1 = __importDefault(require("../services/author"));
const apiError_1 = require("../helpers/apiError");
// POST /authors
exports.createAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email } = req.body;
        const author = new Author_1.default({
            firstName,
            lastName,
            email,
        });
        yield author_1.default.create(author);
        res.json(author);
    }
    catch (error) {
        next(new apiError_1.InternalServerError('Internal Server Error', error));
    }
});
// PUT /authors/:authorId
exports.updateAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const authorId = req.params.authorId;
        const updatedAuthor = yield author_1.default.update(authorId, update);
        res.json(updatedAuthor);
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Author not found', error));
    }
});
// DELETE /authors/:authorId
exports.deleteAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield author_1.default.deleteAuthor(req.params.authorId));
        res.status(204).end();
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Author not found', error));
    }
});
// GET /authors/:authorId
exports.findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield author_1.default.findById(req.params.authorId));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Author not found', error));
    }
});
// GET /authors
exports.findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield author_1.default.findAll());
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Authors not found', error));
    }
});
//# sourceMappingURL=author.js.map