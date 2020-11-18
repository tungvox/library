import express, { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator/check'

import User from '../models/User'

import {
  createUser,
  findById,
  deleteUser,
  findAll,
  updateUser,
  signMeIn,
} from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.get('/', findAll)
router.get('/:userId', findById)
router.put('/:userId', updateUser)
// router.delete('/:userId', deleteUser)
router.post(
  '/signup',
  [
    check('username', 'Please Enter a Valid Username').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({
      min: 6,
    }),
  ],
  createUser
)

router.post(
  '/signin',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({
      min: 6,
    }),
  ],
  signMeIn
)

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

export default router
