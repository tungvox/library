import passport from 'passport'
import Author from '../../src/models/Author'
import AuthorService from '../../src/services/author'
import * as dbHelper from '../db-helper'

const nonExistingAuthorId = '5e57b77b5744fa0b461c7906'

async function createAuthor() {
  const author = new Author({
    firstName: 'Tony',
    lastName: 'Kray',
    email: 'tony.kray@gmail.com',
  })
  return await AuthorService.create(author)
}

describe('author service', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a author', async () => {
    const author = await createAuthor()
    expect(author).toHaveProperty('_id')
    expect(author).toHaveProperty('firstName', 'Tony')
    expect(author).toHaveProperty('lastName', 'Kray')
  })

  it('should get a author with id', async () => {
    const author = await createAuthor()
    const found = await AuthorService.findById(author._id)
    expect(found.firstName).toEqual(author.firstName)
    expect(found._id).toEqual(author._id)
  })

  // Check https://jestjs.io/docs/en/asynchronous for more info about
  // how to test async code, especially with error
  it('should not get a non-existing author', async () => {
    expect.assertions(1)
    return AuthorService.findById(nonExistingAuthorId).catch(e => {
      expect(e.message).toMatch(`Author ${nonExistingAuthorId} not found`)
    })
  })

  it('should update an existing author', async () => {
    const author = await createAuthor()
    const update = {
      email: 'tonykray@gmail.com',
      lastName: 'Vo',
    }
    const updated = await AuthorService.update(author._id, update)
    expect(updated).toHaveProperty('_id', author._id)
    expect(updated).toHaveProperty('email', 'tonykray@gmail.com')
    expect(updated).toHaveProperty('lastName', 'Vo')
  })

  it('should not update a non-existing author', async () => {
    expect.assertions(1)
    const update = {
    firstName: 'Tung',
    lastName: 'Yo',
    }
    return AuthorService.update(nonExistingAuthorId, update).catch(e => {
      expect(e.message).toMatch(`Author ${nonExistingAuthorId} not found`)
    })
  })

  it('should delete an existing author', async () => {
    expect.assertions(1)
    const author = await createAuthor()
    await AuthorService.deleteAuthor(author._id)
    return AuthorService.findById(author._id).catch(e => {
      expect(e.message).toBe(`Author ${author._id} not found`)
    })
  })
})
