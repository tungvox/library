import express from 'express'
import verify from '../middlewares/auth'

import {
  createAuthor,
  findById,
  deleteAuthor,
  findAll,
  updateAuthor,
} from '../controllers/author'

const router = express.Router()

// Every path we define here will get /api/v1/authors prefix
router.get('/', findAll)
router.get('/:authorId', findById)
router.put('/:authorId', verify, updateAuthor)
router.delete('/:authorId',verify, deleteAuthor)
router.post('/', verify, createAuthor)

export default router
