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
const check_1 = require("express-validator/check");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const user_1 = __importDefault(require("../services/user"));
const apiError_1 = require("../helpers/apiError");
// export const createUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try{
//     const {firstName, lastName, email, password} = req.body
//     const user = new User({
//       firstName,
//       lastName,
//       email,
//       password
//     })
//     await UserService.create(user)
//     res.json(user)
//   } catch(error){
//     next(new InternalServerError('Internal Server Error', error))
//   }
// }
// POST /signup
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const { firstName, lastName, email, password } = req.body;
    try {
        let user = yield User_1.default.findOne({
            email,
        });
        if (user) {
            return res.status(400).json({
                msg: 'User Already Exists',
            });
        }
        user = new User_1.default({
            firstName,
            lastName,
            email,
            password,
        });
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(password, salt);
        yield user_1.default.create(user);
        res.json(user);
        const payload = {
            user: {
                _id: user._id,
            },
        };
        jsonwebtoken_1.default.sign(payload, 'randomString', {
            expiresIn: 10000,
        }, (err, token) => {
            if (err)
                throw err;
            res.status(200).json({
                token,
            });
        });
    }
    catch (error) {
        next(new apiError_1.InternalServerError('Error in Saving', error));
    }
});
// GET /signin
exports.signMeIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({
            email,
        });
        if (!user)
            return res.status(400).json({
                message: 'User Not Exist',
            });
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: 'Incorrect Password !',
            });
        const payload = {
            user: {
                id: user.id,
            },
        };
        jsonwebtoken_1.default.sign(payload, 'randomString', {
            expiresIn: 3600,
        }, (err, token) => {
            if (err)
                throw err;
            res.status(200).json({
                token,
            });
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Server Error',
        });
    }
});
// PUT /users/:userId
exports.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const userId = req.params.userId;
        const updatedUser = yield user_1.default.update(userId, update);
        res.json(updatedUser);
    }
    catch (error) {
        next(new apiError_1.NotFoundError('User not found', error));
    }
});
// DELETE /users/:userId
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield user_1.default.deleteUser(req.params.userId));
        res.status(204).end();
    }
    catch (error) {
        next(new apiError_1.NotFoundError('User not found', error));
    }
});
// GET /users/:userId
exports.findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield user_1.default.findById(req.params.userId));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('User not found', error));
    }
});
// GET /users
exports.findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield user_1.default.findAll());
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Users not found', error));
    }
});
//# sourceMappingURL=user.js.map