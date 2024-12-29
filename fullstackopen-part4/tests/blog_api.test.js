const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }

    await api.post('/api/users').send(helper.initialUser)

    const response = await api
        .post('/api/login')
        .send({ username: 'user1', password: 'password1' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    process.env.TOKEN = `Bearer ${response.body.token}`
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)//regex
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 2)
})

test('the id property is named id', async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].id)
})

test('add a blog', async () => {
    const newBlog = {
        title: 'Third Blog',
        author: 'Author Three',
        url: 'http://example.com/third',
        likes: 1
    }
    const response = await api
        .post('/api/blogs')
        .set('Authorization', process.env.TOKEN)
        .send(newBlog)
        .expect(201)
    const { id, user,  ...blogAdded } = response.body
    assert.deepStrictEqual(blogAdded, newBlog)
})

test('add a blog fails without token return code 401 Unauthorized'), async () => {
    const newBlog = {
        title: 'Third Blog',
        author: 'Author Three',
        url: 'http://example.com/third',
        likes: 1
    }
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
}

test('add a blog have defualt likes', async () => {
    const newBlog = {
        title: 'Third Blog',
        author: 'Author Three',
        url: 'http://example.com/third'
    }

    const response = await api
        .post('/api/blogs')
        .set('Authorization', process.env.TOKEN)
        .send(newBlog)

    assert.strictEqual(response.body.likes, 0)
})

test('add a blog without url causing a error', async () => {
    const newBlog = {
        title: 'Third Blog',
        author: 'Author Three',
        likes: 1
    }
    await api
        .post('/api/blogs')
        .set('Authorization', process.env.TOKEN)
        .send(newBlog)
        .expect(400)
})

test('add a blog without title causing a error', async () => {
    const newBlog = {
        author: 'Author Three',
        url: 'http://example.com/third',
        likes: 1
    }
    await api
        .post('/api/blogs')
        .set('Authorization', process.env.TOKEN)
        .send(newBlog)
        .expect(400)
})

test('delete a blog', async () => {
    const newBlog = {
        title: 'Third Blog',
        author: 'Author Three',
        url: 'http://example.com/third',
        likes: 1
    }
    const response = await api
        .post('/api/blogs')
        .set('Authorization', process.env.TOKEN)
        .send(newBlog)
    const id = response.body.id
    await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', process.env.TOKEN)
        .expect(204)
    assert.strictEqual((await helper.blogsInDb()).length, 2)
})

test('update a blog', async () => {
    const blogs = await helper.blogsInDb()
    const updatedBlog = { ...blogs[0], likes: blogs[0].likes + 1 }
    const response = await api.put(`/api/blogs/${updatedBlog.id}`).send(updatedBlog).expect(200)
    assert.deepStrictEqual(response.body, updatedBlog)
})

after(async () => {
    await mongoose.connection.close()
})