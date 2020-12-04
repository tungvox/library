"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const lusca_1 = __importDefault(require("lusca"));
const mongoose_1 = __importDefault(require("mongoose"));
const bluebird_1 = __importDefault(require("bluebird"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const secrets_1 = require("./util/secrets");
const user_1 = __importDefault(require("./routers/user"));
const book_1 = __importDefault(require("./routers/book"));
const author_1 = __importDefault(require("./routers/author"));
const auth_1 = __importDefault(require("./routers/auth"));
const apiErrorHandler_1 = __importDefault(require("./middlewares/apiErrorHandler"));
const app = express_1.default();
const mongoUrl = secrets_1.MONGODB_URI;
mongoose_1.default.Promise = bluebird_1.default;
mongoose_1.default
    .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
    .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log('connected');
})
    .catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    process.exit(1);
});
// Express configuration
app.set('port', process.env.PORT || 3000);
// Use common 3rd-party middlewares
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(lusca_1.default.xframe('SAMEORIGIN'));
app.use(lusca_1.default.xssProtection(true));
app.use(cors_1.default());
app.use(cookie_parser_1.default());
// Use movie router
// app.use('/api/v1/movies', movieRouter)
// User book router
app.use('/api/v1/books', book_1.default);
app.use('/api/v1/users', user_1.default);
app.use('/api/v1/authors', author_1.default);
app.use('/api/v1/auth', auth_1.default);
// Custom API error handler
app.use(apiErrorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map