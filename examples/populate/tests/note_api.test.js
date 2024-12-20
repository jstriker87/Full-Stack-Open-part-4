const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')
const bcrypt = require('bcrypt')
const User = require('../models/user')

let userID = null;

describe('when there is initially some notes saved', () => {
beforeEach(async () => {
    await Note.deleteMany({})

    const noteObjects = helper.initialNotes
    .map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)
})
test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    })
})  
describe('viewing a specific note', () => {

test('there are two notes', async () => {
  const response = await api.get('/api/notes')
  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map(e => e.content)
  assert(contents.includes('HTML is easy'))
})

    test('a specific note can be viewed', async () => {
        const notesAtStart = await helper.notesInDb()

        const noteToView = notesAtStart[0]

        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.deepStrictEqual(resultNote.body, noteToView)
    })
})

describe('addition of a new note', () => {


beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    
    await user.save()
    const usersAtEnd = await helper.usersInDb()

    const rootUser = usersAtEnd.find(u => u.username === 'root')
    userID = rootUser ? rootUser.id : null
})


test('note without content is not added', async () => {
    const newNote = {
        important: true,
        userId: userID
    }
    await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)
    const response = await api.get('/api/notes')
    assert.strictEqual(response.body.length, helper.initialNotes.length)
    })
})

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
    userId: userID
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()

  assert(notesAtEnd.length,helper.initialNotes.length + 1)

  const contents = notesAtEnd.map(n => n.content)

  assert(contents.includes('async/await simplifies making async calls'))
})


describe('deletion of a note', () => {

//test('a note can be deleted', async () => {
//  const notesAtStart = await helper.notesInDb()
//  const noteToDelete = notesAtStart[0]
//
//  await api
//    .delete(`/api/notes/${noteToDelete.id}`)
//    .expect(204)
//
//  const notesAtEnd = await helper.notesInDb()
//
//  const contents = notesAtEnd.map(r => r.content)
//  assert(!contents.includes(noteToDelete.content))
//
//  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
//    })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
   test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
