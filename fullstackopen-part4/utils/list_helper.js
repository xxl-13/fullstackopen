const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (max, item) => {
        return max.likes > item.likes
            ? max
            : item
    }
    let favorite = blogs.reduce(reducer, {likes: -1})
    return blogs.length === 0
        ? null
        : {"title": favorite.title, "author": favorite.author, "likes": favorite.likes}
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const most = _.maxBy(Object.entries(_.groupBy(blogs, "author")), ([author, blogList]) => blogList.length);
    return {"author": most[0], "blogs": most[1].length}
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const most = _.maxBy(Object.entries(_.groupBy(blogs, "author")), ([author, blogList]) => totalLikes(blogList));
    return {"author": most[0], "likes": totalLikes(most[1])}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}