"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const book_1 = require("../controllers/book");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/books prefix
router.get('/', book_1.findAll);
router.get('/:bookId', book_1.findById);
router.put('/:bookId', auth_1.default, book_1.updateBook);
router.delete('/:bookId', auth_1.default, book_1.deleteBook);
router.post('/', auth_1.default, book_1.createBook);
exports.default = router;
//# sourceMappingURL=book.js.map