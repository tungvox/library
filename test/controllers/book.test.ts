import request from 'supertest'

import Book, { BookDocument } from '../../src/models/Book'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

const nonExistingBookId = '5e57b77b5744fa0b461c7906'

async function createBook(override?: Partial<BookDocument>) {
  let book = {
    ISBN: 234,
    title: 'Hello world',
    description: 'This is a love story',
    publisher: 'Tony',
    authors: ['Chloe', 'Uyen Baby'],
    status: 'Available',
    borrowerID: 1,
    publishedDate: new Date('04-20-1995'),
    borrowDate: new Date('04-10-2020'),
    returnDate: new Date('09-10-2020')
  }

  if (override) {
    book = { ...book, ...override }
  }

  return await request(app)
    .post('/api/v1/books')
    .send(book)
}

describe('book controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a book', async () => {
    const res = await createBook()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.title).toBe('Hello world')
  })

  it('should not create a book with wrong data', async () => {
    const res = await request(app)
      .post('/api/v1/books')
      .send({
        ISBN: 234,
        title: 'Hello world',
        // description: 'This is a programming book',
        // publisher: 'Tony',
        // authors: 'Chloe',
        // status: 'Available',
        borrowerID: 1,
        publishedDate: '27-02-1997',
        borrowDate: '08-10-2020',
        returnDate: null
      })
    expect(res.status).toBe(400)
  })

  it('should get back an existing book', async () => {
    let res = await createBook()
    expect(res.status).toBe(200)

    const bookId = res.body._id
    res = await request(app)
      .get(`/api/v1/books/${bookId}`)

    expect(res.body._id).toEqual(bookId)
  })

  it('should not get back a non-existing book', async () => {
    const res = await request(app)
      .get(`/api/v1/books/${nonExistingBookId}`)
    expect(res.status).toBe(404)
  })

  it('should get back all book', async () => {
    const res1 = await createBook({
      title: 'Javascript tutorial',
      description: 'This book contains Javascript lessons',
    })
    const res2 = await createBook({
      title: 'How to clean code',
      description: 'Learn how to make your code clean and organized.',
    })

    const res3 = await request(app)
      .get(`/api/v1/books`)

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing book', async () => {
    let res = await createBook()
    expect(res.status).toBe(200)

    const bookId = res.body._id
    const update = {
      title: 'React for beginners',
      description: 'This book is awesome'
    }

    res = await request(app)
      .put(`/api/v1/books/${bookId}`)
      .send(update)

    expect(res.status).toEqual(200)
    expect(res.body.title).toEqual('React for beginners')
    expect(res.body.description).toEqual('This book is awesome')
  })

  it('should delete an existing book', async () => {
    let res = await createBook()
    expect(res.status).toBe(200)
    const bookId = res.body._id

    res = await request(app)
      .delete(`/api/v1/books/${bookId}`)

    expect(res.status).toEqual(204)

    res = await request(app)
      .get(`/api/v1/books/${bookId}`)
    expect(res.status).toBe(404)
  })
})
