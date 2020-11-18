import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator/check'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import UserService from '../services/user'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

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
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const { firstName, lastName, email, password } = req.body
  try {
    let user = await User.findOne({
      email,
    })
    if (user) {
      return res.status(400).json({
        msg: 'User Already Exists',
      })
    }

    user = new User({
      firstName,
      lastName,
      email,
      password,
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await UserService.create(user)
    res.json(user)

    const payload = {
      user: {
        _id: user._id,
      },
    }

    jwt.sign(
      payload,
      'randomString',
      {
        expiresIn: 10000,
      },
      (err, token) => {
        if (err) throw err
        res.status(200).json({
          token,
        })
      }
    )
  } catch (error) {
    next(new InternalServerError('Error in Saving', error))
  }
}

// GET /signin
export const signMeIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const { email, password } = req.body
  try {
    const user = await User.findOne({
      email,
    })
    if (!user)
      return res.status(400).json({
        message: 'User Not Exist',
      })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({
        message: 'Incorrect Password !',
      })

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      'randomString',
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err
        res.status(200).json({
          token,
        })
      }
    )
  } catch (e) {
    console.error(e)
    res.status(500).json({
      message: 'Server Error',
    })
  }
}

// PUT /users/:userId
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId
    const updatedUser = await UserService.update(userId, update)
    res.json(updatedUser)
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

// DELETE /users/:userId

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.deleteUser(req.params.userId))
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

// GET /users/:userId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findById(req.params.userId))
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

// GET /users

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findAll())
  } catch (error) {
    next(new NotFoundError('Users not found', error))
  }
}
