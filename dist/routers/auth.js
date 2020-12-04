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
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const validation_1 = require("../validation");
const secrets_1 = require("../util/secrets");
// import { googleLogin } from '../controllers/auth'
const router = express_1.default.Router();
// REGISTER
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Validate data before making user
    const { error } = validation_1.registerValidation(req.body);
    if (error) {
        console.log(validation_1.registerValidation(req.body));
        return res.status(400).send(error);
    }
    //Check if user exist
    const emailExist = yield User_1.default.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).send('Email already exist!');
    // Hash password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
    // Create new user
    const user = new User_1.default({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        isAdmin: req.body.isAdmin
    });
    try {
        const savedUser = yield user.save();
        res.send({ user: savedUser._id });
    }
    catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
}));
// LOGIN
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Validate data when login
    const { error } = validation_1.loginValidation(req.body);
    if (error)
        return res.status(400).send(error === null || error === void 0 ? void 0 : error.details[0].message);
    //Check if email exist
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Email or password is not valid!');
    //Check if password is correct
    const validPass = yield bcryptjs_1.default.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).send('Email or password is not valid!');
    //Create and assign a token
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, secrets_1.JWT_SECRET, { expiresIn: '30m' });
    res.header('auth-token', token).send(token);
}));
// LOG OUT
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Validate data when login
    const { error } = validation_1.loginValidation(req.body);
    if (error)
        return res.status(400).send(error === null || error === void 0 ? void 0 : error.details[0].message);
    //Check if email exist
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Email or password is not valid!');
    //Check if password is correct
    const validPass = yield bcryptjs_1.default.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).send('Email or password is not valid!');
    //Create and assign a token
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, secrets_1.JWT_SECRET, { expiresIn: '30m' });
    res.header('auth-token', token).send(token);
}));
exports.default = router;
//# sourceMappingURL=auth.js.map