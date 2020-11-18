import Book from '../../src/models/Book'
import BookService from '../../src/services/book'
import * as dbHelper from '../db-helper'

const nonExistingBookId = '5e57b77b5744fa0b461c7906'

async function createBook() {
  const book = new Book({
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
  })
  return await BookService.create(book)
}

describe('book service', () => {
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
    const book = await createBook()
    expect(book).toHaveProperty('_id')
    expect(book).toHaveProperty('title', 'Hello world')
    expect(book).toHaveProperty('description', 'This is a love story')
  })

  it('should get a book with id', async () => {
    const book = await createBook()
    const found = await BookService.findById(book._id)
    expect(found.title).toEqual(book.title)
    expect(found._id).toEqual(book._id)
  })

  // Check https://jestjs.io/docs/en/asynchronous for more info about
  // how to test async code, especially with error
  it('should not get a non-existing book', async () => {
    expect.assertions(1)
    return BookService.findById(nonExistingBookId).catch(e => {
      expect(e.message).toMatch(`Book ${nonExistingBookId} not found`)
    })
  })

  it('should update an existing book', async () => {
    const book = await createBook()
    const update = {
      title: 'Redux',
      description: 'Controlling your state',
    }
    const updated = await BookService.update(book._id, update)
    expect(updated).toHaveProperty('_id', book._id)
    expect(updated).toHaveProperty('title', 'Redux')
    expect(updated).toHaveProperty('description', 'Controlling your state')
  })

  it('should not update a non-existing book', async () => {
    expect.assertions(1)
    const update = {
    title: 'TypeScript',
    description: 'New technology',
    }
    return BookService.update(nonExistingBookId, update).catch(e => {
      expect(e.message).toMatch(`Book ${nonExistingBookId} not found`)
    })
  })

  it('should delete an existing book', async () => {
    expect.assertions(1)
    const book = await createBook()
    await BookService.deleteBook(book._id)
    return BookService.findById(book._id).catch(e => {
      expect(e.message).toBe(`Book ${book._id} not found`)
    })
  })
})
