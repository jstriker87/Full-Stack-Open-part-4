const Blog = require('../models/blog')

const initialBlogs = [
  {
    name: 'Test blog 1',
    author: "Test Person 1",
    likes: 1
  },
  {
    name: 'Test blog 2',
    author: "Test Person 2",
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
  const blogs = await Note.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
