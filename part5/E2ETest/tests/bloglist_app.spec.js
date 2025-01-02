const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('bloglist app', () => {
    describe('before logging in', () => {

        beforeEach(async ({ page, request }) => {
            await request.post('http://localhost:3001/api/testing/reset')
            await request.post('http://localhost:3001/api/users', {
              data: {
                name: 'admin',
                username: 'admin',
                password: 'admin'
              }
            })

            await page.goto('http://localhost:5173')
        })

        test('login form is shown', async ({ page }) => {
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByTestId('username')).toBeVisible()
            await expect(page.getByTestId('password')).toBeVisible()
            await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
        })

        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'admin', 'admin')
            await expect(page.getByText('admin logged-in')).toBeVisible()
        })
      
        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'admin', 'wrong')
            await expect(page.getByText('invalid username or password')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page, request }) => {
            await request.post('http://localhost:3001/api/testing/reset')
            await request.post('http://localhost:3001/api/users', {
              data: {
                name: 'admin',
                username: 'admin',
                password: 'admin'
              }
            })

            await page.goto('http://localhost:5173')
            await loginWith(page, 'admin', 'admin')
        })
      
        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'title 1', 'author 1', 'url 1')
            await expect(page.getByText('title 1 by author 1 has been added')).toBeVisible()
        })

        test('like a blog', async ({ page }) => {
            await createBlog(page, 'title 1', 'author 1', 'url 1')
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            await page.getByText('Likes:1').waitFor()
        })

        test('delete a blog', async ({ page }) => {
            await page.pause()
            await createBlog(page, 'title 1', 'author 1', 'url 1')
            await page.getByRole('button', { name: 'view' }).click()
            page.once('dialog', dialog => {
                dialog.accept();
              });
            await page.getByRole('button', { name: 'remove' }).click()
            await page.getByText('title 1 by author 1 has been removed').waitFor()
        })

        test('only the user who added the blog sees the remove button', async ({ page, request }) => {
            await createBlog(page, 'title 1', 'author 1', 'url 1')
            await page.getByRole('button', { name: 'logout' }).click()
            await request.post('http://localhost:3001/api/users', {
                data: {
                  name: 'admin2',
                  username: 'admin2',
                  password: 'admin2'
                }
              })
            await loginWith(page, 'admin2', 'admin2')
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })

        test('blogs are ordered by likes', async ({ page }) => {
            await createBlog(page, 'title 1', 'author 1', 'url 1')
            await createBlog(page, 'title 2', 'author 2', 'url 2')
            await page.pause()
            const blogs = await page.locator('.blog')
            const blog1 = blogs.nth(0)
            expect(await blog1.textContent()).toContain('title 1 author 1')
            const blog2 = blogs.nth(1)
            await blog2.getByRole('button', { name: 'view' }).click()
            await blog2.getByRole('button', { name: 'like' }).click()
            await page.getByText('Likes:1').waitFor()
            const firstBlog = await page.locator('.blog').first()
            expect(await firstBlog.textContent()).toContain('title 2 author 2')
        })
    })
})