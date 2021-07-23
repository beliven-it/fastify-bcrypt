'use strict'

const fp = require('fastify-plugin')
const bcrypt = require('bcryptjs')

const fastifyBcrypt = fp(function (fastify, opts, next) {
  const saltWorkFactor = opts.saltWorkFactor || 10

  const hash = async pwd => bcrypt.hash(pwd, saltWorkFactor)

  const compare = async (claim1, claim2) => bcrypt.compare(claim1, claim2)

  fastify
    .decorate('bcrypt', {
      hash,
      compare
    })
    .decorateRequest('bcryptHash', hash)
    .decorateRequest('bcryptCompare', compare)

  next()
})

module.exports = fastifyBcrypt
module.exports.default = fastifyBcrypt
module.exports.fastifyBcrypt = fastifyBcrypt
