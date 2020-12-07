"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const author_1 = require("../controllers/author");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/authors prefix
router.get('/', author_1.findAll);
router.get('/:authorId', author_1.findById);
router.put('/:authorId', auth_1.default, author_1.updateAuthor);
router.delete('/:authorId', auth_1.default, author_1.deleteAuthor);
router.post('/', auth_1.default, author_1.createAuthor);
exports.default = router;
//# sourceMappingURL=author.js.map