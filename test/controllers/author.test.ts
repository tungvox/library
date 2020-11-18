import request from 'supertest'

import Author, { AuthorDocument } from '../../src/models/Author'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

const nonExistingAuthorId = '5e57b77b5744fa0b461c7906'

async function createAuthor(override?: Partial<AuthorDocument>) {
  let author = {
    firstName: 'Chloe',
    lastName: 'Le',
    email: 'chloe.le@gmail.com',
  }

  if (override) {
    author = { ...author, ...override }
  }

  return await request(app)
    .post('/api/v1/authors')
    .send(author)
}

describe('author controller', () => {
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
    const res = await createAuthor()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.firstName).toBe('Chloe')
  })

  it('should not create a author with wrong data', async () => {
    const res = await request(app)
      .post('/api/v1/authors')
      .send({
        firstName: 'Chloe',
        // lastName: 'Le',
        email: 'chloe.le@gmail.com',
      })
    expect(res.status).toBe(400)
  })

  it('should get back an existing author', async () => {
    let res = await createAuthor()
    expect(res.status).toBe(200)

    const authorId = res.body._id
    res = await request(app)
      .get(`/api/v1/authors/${authorId}`)

    expect(res.body._id).toEqual(authorId)
  })

  it('should not get back a non-existing author', async () => {
    const res = await request(app)
      .get(`/api/v1/authors/${nonExistingAuthorId}`)
    expect(res.status).toBe(404)
  })

  it('should get back all author', async () => {
    const res1 = await createAuthor({
      firstName: 'Chloe',
      lastName: 'Le',
    })
    const res2 = await createAuthor({
      firstName: 'Tony',
      lastName: 'Vo',
    })

    const res3 = await request(app)
      .get(`/api/v1/authors`)

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing author', async () => {
    let res = await createAuthor()
    expect(res.status).toBe(200)

    const authorId = res.body._id
    const update = {
      firstName: 'Tony',
      lastName: 'Kray'
    }

    res = await request(app)
      .put(`/api/v1/authors/${authorId}`)
      .send(update)

    expect(res.status).toEqual(200)
    expect(res.body.firstName).toEqual('Tony')
    expect(res.body.lastName).toEqual('Kray')
  })

  it('should delete an existing author', async () => {
    let res = await createAuthor()
    expect(res.status).toBe(200)
    const authorId = res.body._id

    res = await request(app)
      .delete(`/api/v1/authors/${authorId}`)

    expect(res.status).toEqual(204)

    res = await request(app)
      .get(`/api/v1/authors/${authorId}`)
    expect(res.status).toBe(404)
  })
})
