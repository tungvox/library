"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = __importDefault(require("../models/Book"));
function create(book) {
    return book.save();
}
function findById(bookId) {
    return Book_1.default.findById(bookId)
        .exec()
        .then((book) => {
        if (!book) {
            throw new Error(`Book ${bookId} not found`);
        }
        return book;
    });
}
function findAll() {
    return Book_1.default.find().sort({ title: 1, publishedDate: -1 }).exec();
}
function update(bookId, update) {
    return Book_1.default.findById(bookId)
        .exec()
        .then((book) => {
        if (!book) {
            throw new Error(`Book ${bookId} not found`);
        }
        if (update.ISBN) {
            book.ISBN = update.ISBN;
        }
        if (update.title) {
            book.title = update.title;
        }
        if (update.description) {
            book.description = update.description;
        }
        if (update.publisher) {
            book.publisher = update.publisher;
        }
        if (update.authors) {
            book.authors = update.authors;
        }
        if (update.status) {
            book.status = update.status;
        }
        if (update.borrowerID) {
            book.borrowerID = update.borrowerID;
        }
        if (update.publishedDate) {
            book.publishedDate = update.publishedDate;
        }
        if (update.borrowDate) {
            book.borrowDate = update.borrowDate;
        }
        if (update.returnDate) {
            book.returnDate = update.returnDate;
        }
        // Add more fields here if needed
        return book.save();
    });
}
function deleteBook(bookId) {
    return Book_1.default.findByIdAndDelete(bookId).exec();
}
exports.default = {
    create,
    findById,
    findAll,
    update,
    deleteBook,
};
//# sourceMappingURL=book.js.map