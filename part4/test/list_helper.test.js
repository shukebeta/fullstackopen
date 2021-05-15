const listHelper = require('../utils/list_helper')
const listOfBlog = [
  {
    title: "hello0",
    author: "be ta",
    likes: 3
  },
  {
    title: "hello1",
    author: "be ta",
    likes: 4
  },
  {
    title: "hello2",
    author: "shu ke",
    likes: 1
  },
  {
    title: "hello3",
    author: "shu ke",
    likes: 2
  },
  {
    title: "hello4",
    author: "shu ke",
    likes: 3
  },
]

describe('dummy', () => {
  test('dummy return 1', () => {
    expect(listHelper.dummy(listOfBlog)).toBe(1)
  })
})

describe('total likes', () => {
  test('when list has 1 blog, equals the likes of that', () => {
    expect(listHelper.totalLikes(listOfBlog.slice(0, 1))).toEqual(3)
  })
  test('when list has 5 blog, equals the likes of that', () => {
    expect(listHelper.totalLikes(listOfBlog)).toEqual(13)
  })
})

describe('favorite Blog', () => {
  test('favoriteBlog has 4 likes', () => {
    expect(listHelper.favoriteBlog(listOfBlog).likes).toEqual(4)
  })
})

describe('most blogs', () => {
  test('shu ke has 3 blogs', () => {
    expect(listHelper.mostBlogs(listOfBlog).blogs).toEqual(3)
    expect(listHelper.mostBlogs(listOfBlog).author).toBe('shu ke')
  })
})

describe('most likes', () => {
  test('be ta has 7 likes', () => {
    expect(listHelper.mostLikes(listOfBlog).likes).toEqual(7)
    expect(listHelper.mostLikes(listOfBlog).author).toBe('be ta')
  })
})
