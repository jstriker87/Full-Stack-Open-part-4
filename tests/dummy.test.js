const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  //assert.strictEqual(result, 1)
})

describe('Total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
  {
      _id: 'e40wffwfw34434223232323w2',
      title: 'Test',
      author: 'Testing',
      url: 'http://Ergo.com',
      likes: 3,
      __v: 0
    }
]


  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    //assert.strictEqual(result, 8)
  })
})

describe('Likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: 'e40wffwfw34434223232323w2',
      title: 'Test',
      author: 'Testing',
      url: 'http://Ergo.com',
      likes: 3,
      __v: 0
    }
  ]

  test('Blogs with the most likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
   // assert.deepStrictEqual(result,listWithOneBlog[0])
  })
})

describe('Most blogs', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: 'e40wffwfw34434223232323w2',
      title: 'Test',
      author: 'Testing',
      url: 'http://Ergo.com',
      likes: 3,
      __v: 0
    },
    {
      _id: 'e44webwfc00492091129',
      title: 'Test2',
      author: 'Edsger W. Dijkstra',
      url: 'http://Ergo2.com',
      likes: 2,
      __v: 0
    }

  ]

  test('The author who has the most blogs', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result,listWithOneBlog[0].author)
  })
})

