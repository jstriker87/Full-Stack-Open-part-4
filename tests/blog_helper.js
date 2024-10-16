const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
  {
    title: 'Test blog 1',
    author: "Test Person 1",
    url:"www.test1.com",
    likes: 1
  },
  {
    title: 'Test blog 2',
    author: "Test Person 2",
    url:"www.test2.com",
    likes: 5
  },

]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}
