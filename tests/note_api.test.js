const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const helper = require('./blog_helper')
const expect = require('expect');
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
   .map(blog => new Blog(blog))
     const promiseArray = blogObjects.map(blog=> blog.save())
    await Promise.all(promiseArray)
})

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

test('Each blog should have id property', async () => {
 const response = await api.get('/api/blogs')
 const body = response._body
 body.forEach(post => {
    assert.strictEqual(post.hasOwnProperty('id'),true)
 });
})


test('a valid blog can be added ', async () => {
  const newBlog = {
    title:"Number 3",
    author: "Auhor 3",
    url:"www.person3.com",
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  assert(blogsAtEnd.length,helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)

  assert(contents.includes('Number 3'))
})

test('a blog can be added wihtout likes being set and it defaults likes to 0', async () => {
  const newBlog = {
    title:"Number 3",
    author: "Author 3",
    url:"www.person3.com",
  }


    const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
const blogsAtEnd = await helper.blogsInDb()

 blogsAtEnd.forEach(post => {
    if(post.id  == result.body.id){
        assert.strictEqual(result.body.likes,0)
    
    }
 });
})

test('A non valid blog missing title cant be added ', async () => {
  const newBlog = {
    author: "Author 3",
    url:"www.person3.com",
    likes: 2
  }

  let result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert(result.statusCode,400)

})

test('A non valid blog missing url cant be added ', async () => {
  const newBlog = {
    title: "Title 3",
    author: "Author 3",
    likes: 2
  }

  let result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert(result.statusCode,400)

})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  const contents = blogsAtEnd.map(r => r.id)

  assert(!contents.includes(blogToDelete.content))

})

test('a valid blog can be updated', async () => {
  const updatedBlogLikes = {
    likes: 44
  }
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
 
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlogLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()

  blogsAtEnd.forEach(post => {
    if(post.id  == blogToUpdate.id){
        assert.strictEqual(post.likes,updatedBlogLikes.likes)
    
    }
 });

})

describe('when there is initially one user in db', () => {

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
