'use strict'

const { test } = require('tap')
const Fastify = require('fastify')

const pwdHash = '$2y$12$1krMplxpH.cjebgspMW/m.BHKB9YL5ZQyk2SfR1f6zY2Q40WpELNS'

const buildApp = async t => {
  const fastify = Fastify({
    logger: {
      level: 'error'
    }
  })

  t.teardown(() => fastify.close())

  return fastify
}

test('fastify-bcrypt', async t => {
  t.test('without options', async t => {
    t.plan(1)
    const fastify = await buildApp(t)
    try {
      await fastify.register(require('../bcrypt'))
      t.ok('bcrypt' in fastify, 'should not throw any error')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('with "saltWorkFactor" option', async t => {
    t.plan(1)
    const fastify = await buildApp(t)
    try {
      await fastify.register(require('../bcrypt'), {
        saltWorkFactor: 8
      })
      t.ok('bcrypt' in fastify, 'should not throw any error')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('hash', async t => {
    t.plan(2)
    const fastify = await buildApp(t)
    try {
      await fastify.register(require('../bcrypt'))
      const hash = await fastify.bcrypt.hash('password')
      t.equal(typeof hash, 'string', 'should generate a hash')
      t.not(hash, 'password', 'should generate a hash')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('compare two not matching claims', async t => {
    t.plan(1)
    const fastify = await buildApp(t)
    try {
      await fastify.register(require('../bcrypt'))
      const match = await fastify.bcrypt.compare('password123', pwdHash)
      t.equal(match, false, 'should return false')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('compare two matching claims', async t => {
    t.plan(1)
    const fastify = await buildApp(t)
    try {
      await fastify.register(require('../bcrypt'))
      const match = await fastify.bcrypt.compare('password', pwdHash)
      t.equal(match, true, 'should return true')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw any error')
    }
  })
})
