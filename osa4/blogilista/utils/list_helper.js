const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((previous, current) => {
    return (previous += current.likes)
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) return null

  return blogs.reduce(
    (previous, current) => {
      if (current.likes >= previous.likes) {
        return current
      } else {
        return previous
      }
    },
    { likes: 0 },
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length < 1) return null

  const blogsByAuthor = blogs.reduce((previous, current) => {
    if (Object.keys(previous).includes(current.author)) {
      previous[current.author] += 1
    } else {
      previous[current.author] = 1
    }

    return previous
  }, {})

  const authorWithMostBlogs = Object.entries(blogsByAuthor).reduce(
    (previous, current) => {
      return current[1] > previous[1] ? current : previous
    },
    ['a', 0],
  )

  return {
    author: authorWithMostBlogs[0],
    blogs: authorWithMostBlogs[1],
  }
}
const mostLikes = (blogs) => {
  if (blogs.length < 1) return null

  const likesPerAuthor = blogs.reduce((previous, current) => {
    if (Object.keys(previous).includes(current.author)) {
      previous[current.author] += current.likes
    } else {
      previous[current.author] = current.likes
    }

    return previous
  }, {})

  const authorWithMostLikes = Object.entries(likesPerAuthor).reduce(
    (previous, current) => {
      return current[1] > previous[1] ? current : previous
    },
    ['a', 0],
  )

  return {
    author: authorWithMostLikes[0],
    likes: authorWithMostLikes[1],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
