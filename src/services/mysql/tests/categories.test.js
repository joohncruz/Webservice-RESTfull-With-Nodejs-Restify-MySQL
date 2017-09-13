
const test = require('ava')

const { connection, errorHandler } = require('./setup')

const categories = require('../categories')({ connection, errorHandler })

test.beforeEach(t => )

test('Criação de Categoria', async t => {
  const result = await categories.save('category-test')
  t.is(result.category.name, 'category-test')
})
