'use strict'

const Fastify = require('fastify')
const mercurius = require('mercurius')
const mercuriusValidation = require('..')
const { schema, resolvers } = require('./normal-setup')

const app = Fastify()

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: false,
  jit: 1
})

app.register(mercuriusValidation, {
  schema: {
    Filters: {
      text: { type: 'string', minLength: 1 }
    },
    Query: {
      message: {
        id: { type: 'string', minLength: 1 }
      },
      messages: {
        arrayScalarFilters: {
          type: 'array',
          items: {
            type: 'string',
            minLength: 1
          },
          minItems: 1
        },
        arrayObjectFilters: {
          type: 'array',
          minItems: 1
        }
      }
    }
  }
})

app.listen({ port: 3000 })
