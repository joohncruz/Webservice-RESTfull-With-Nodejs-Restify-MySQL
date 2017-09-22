
const test = require('ava')
const { connection, errorHandler } = require('./setup')

const categories = require('../categories')({ connection, errorHandler })
const create = () => categories.save('category-test')

test.beforeEach(t => connection.query('TRUNCATE table categories'))
test.after.always(t => connection.query('TRUNCATE table categories'))

test('Criação de Categoria', async t => {
  const result = await create()
  t.is(result.category.name, 'category-test')
})

test('Atualizaçao de Categoria', async t => {
  await create()
  const updated = await categories.update(1, 'category-test-updated')
  t.is(updated.category.name, 'category-test-updated')
  t.is(updated.affectedRows, 1, 1)
})

test('Remoção de Categoria', async t => {
  await create()
  const remove = await categories.del(1)
  t.is(remove.affectedRows, 1, 1)
})
