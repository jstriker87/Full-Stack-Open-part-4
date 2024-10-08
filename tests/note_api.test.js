const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const helper = require('./blog_helper')
const expect = require('expect');
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('user should have id property', async () => {
 const response = await api.get('/api/blogs')
 const body = response._body
 
 if (typeof body.id  !== 'undefined') {
    console.log("WEEEEE")
 }else {
        console.log("NOOOOO")
       } 
        
 //expect(response.hasOwnProperty('id'))
})

after(async () => {
  await mongoose.connection.close()
})
