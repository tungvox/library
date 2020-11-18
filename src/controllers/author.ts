import { Request, Response, NextFunction } from 'express'

import Author from '../models/Author'
import AuthorService from '../services/author'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

// POST /authors
export const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email } = req.body

    const author = new Author({
      firstName,
      lastName,
      email,
    })

    await AuthorService.create(author)
    res.json(author)
  } catch (error) {
    next(new InternalServerError('Internal Server Error', error))
  }
}

// PUT /authors/:authorId
export const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const authorId = req.params.authorId
    const updatedAuthor = await AuthorService.update(authorId, update)
    res.json(updatedAuthor)
  } catch (error) {
    next(new NotFoundError('Author not found', error))
  }
}

// DELETE /authors/:authorId

export const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AuthorService.deleteAuthor(req.params.authorId))
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('Author not found', error))
  }
}

// GET /authors/:authorId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AuthorService.findById(req.params.authorId))
  } catch (error) {
    next(new NotFoundError('Author not found', error))
  }
}

// GET /authors

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AuthorService.findAll())
  } catch (error) {
    next(new NotFoundError('Authors not found', error))
  }
}
