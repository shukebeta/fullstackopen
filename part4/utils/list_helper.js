const _ = require('lodash')
const reducer = (sum, { likes }) => sum + (likes || 0)
const descSorter = (fieldName) => (i, j) => i[fieldName] > j[fieldName] ? -1 : (i[fieldName] === [fieldName] ? 0 : 1)
const ascSorter = (fieldName) => (i, j) => i[fieldName] > j[fieldName] ? 1 : (i[fieldName] === j[fieldName] ? 0 : -1)

const dummy = _ => 1

const totalLikes = blogs => {
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length)
    return blogs.sort(descSorter('likes'))[0]
  return null
}

const mostBlogs = blogs => {
  if (!blogs.length)
    return null
  const grouped = _.groupBy(blogs, _ => _.author)
  const result = []
  for (const author of Object.keys(grouped)) {
    result.push({
      author,
      blogs: grouped[author].length,
    })
  }
  return result.sort(descSorter('blogs'))[0]
}

const mostLikes = blogs => {
  if (!blogs.length)
    return null
  const grouped = _.groupBy(blogs, _ => _.author)
  const result = []
  for (const author of Object.keys(grouped)) {
    result.push({
      author,
      likes: grouped[author].reduce(reducer, 0),
    })
  }
  return result.sort(descSorter('likes'))[0]
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
