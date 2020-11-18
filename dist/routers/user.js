"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const check_1 = require("express-validator/check");
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/users prefix
router.get('/', user_1.findAll);
router.get('/:userId', user_1.findById);
router.put('/:userId', user_1.updateUser);
// router.delete('/:userId', deleteUser)
router.post('/signup', [
    check_1.check('username', 'Please Enter a Valid Username').not().isEmpty(),
    check_1.check('email', 'Please enter a valid email').isEmail(),
    check_1.check('password', 'Please enter a valid password').isLength({
        min: 6,
    }),
], user_1.createUser);
router.post('/signin', [
    check_1.check('email', 'Please enter a valid email').isEmail(),
    check_1.check('password', 'Please enter a valid password').isLength({
        min: 6,
    }),
], user_1.signMeIn);
// router.get(
//   "/me",
//   auth,
//   async (req: Request, res: Response) => {
//   try {
//     // request.user is getting fetched from Middleware after token authentication
//     const user = await User.findById(req.params.userId);
//     res.json(user);
//   } catch (error) {
//     res.send({ message: "Error in Fetching user" });
//   }
// });
exports.default = router;
//# sourceMappingURL=user.js.map