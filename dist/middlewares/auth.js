"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../util/secrets");
// const auth = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header("token");
//   if (!token) return res.status(401).json({ message: "Auth Error" });
//   try {
//     const decoded = jwt.verify(token, "randomString");
//     req.user = decoded.user;
//     next();
//   } catch (error) {
//     next(new InternalServerError('Error in Saving', error))
//   }
// };
const auth = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token)
        return res.status(401).send('Access denied!');
    try {
        const verified = jsonwebtoken_1.default.verify(token, secrets_1.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).send('Invalid Token');
    }
};
exports.default = auth;
//# sourceMappingURL=auth.js.map