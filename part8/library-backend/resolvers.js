const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const isAuth = (context) => {
    const currentUser = context.currentUser

    if (!currentUser) {
      throw new GraphQLError('not authenticated', {
        extensions: {
          code: 'BAD_USER_INPUT',
        }
      })
    }
}

const resolvers = {
    Query: {
      bookCount: async () => await Book.collection.countDocuments(),
      authorCount: async () => await Author.collection.countDocuments(),
      allBooks: async (root, args) =>{
          console.log(args)
          let query = {}
          if (args.author) {
              const author = await Author.findOne({ name: args.author })
              query.author = author._id
          }
          if (args.genre) {
              query.genres = { $in: [args.genre] }
          }
          return await Book.find(query).populate('author')
      },
      allAuthors: async () => await Author.find({}),
      me: (root, args, context) => context.currentUser,
      allGenres: async () => {
          const books = await Book.find({})
          let genres = []
          books.forEach(book => {
              book.genres.forEach(genre => {
                  if (!genres.includes(genre)) {
                      genres.push(genre)
                  }
              })
          })
          return genres
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
          isAuth(context)
  
          let author = await Author.findOne({ name: args.author })
          if (!author) {
              author = new Author({ name: args.author })
              try{
                  await author.save()
              } catch (error) {
                  throw new GraphQLError('Saving author failed', {
                      extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.author,
                        error
                      }
                  })
              }
          }
  
          const book = new Book({ ...args, author: author })
  
          try {
              await book.save()
          }
          catch (error) {
              throw new GraphQLError('Saving book failed', {
                  extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.title,
                    error
                  }
              })
          }
          pubsub.publish('BOOK_ADDED', { bookAdded: book })
          return book
      },
      editAuthor: async (root, args, context) => {
          isAuth(context)
          const author = await Author.findOne({ name: args.name })
          if (!author) {
              return null
          }
          author.born = args.setBornTo
          try{
              await author.save()
          } catch (error) {
              throw new GraphQLError('Saving author failed', {
                  extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.name,
                    error
                  }
              })
          }
          return author
      },
      createUser: async (root, args) => {
          const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
          try {
              await user.save()
          } catch (error) {
              throw new GraphQLError('Saving user failed', {
                  extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.username,
                    error
                  }
              })
          }
          return user
      },
      login: async (root, args) => {
          const user = await User.findOne({ username: args.username })
          if (!user || args.password !== 'password') {
              throw new GraphQLError('Invalid credentials')
          }
  
          const userForToken = {
              username: user.username,
              id: user._id,
          }
  
          return { value: jwt.sign(userForToken, process.env.SECRET) }
      }
  
  },
    Subscription: {
        bookAdded: {
        subscribe: () => pubsub.asyncIterableIterator(['BOOK_ADDED'])
        }
    },
    Author: {
        bookCount: async (root) => {
            const books = await Book.find({ author: {_id : root._id} })
            return books.length
        }
    }
}

module.exports = resolvers