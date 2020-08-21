'use strict'

const fp = require('fastify-plugin')
const createError = require('fastify-error')
const bcrypt = require('bcryptjs')

const MatchFailedError = createError(
  'FST_BCRYPT_MATCH_FAILED',
  'Match failed'
)

module.exports = fp(function (fastify, opts, next) {
  const saltWorkFactor = opts.saltWorkFactor || 10

  const hash = async pwd => new Promise((resolve, reject) => {
    bcrypt.hash(pwd, saltWorkFactor, (err, hash) => {
      return err
        ? reject(err)
        : resolve(hash)
    })
  })

  const compare = async (claim1, claim2) => new Promise((resolve, reject) => {
    bcrypt.compare(claim1, claim2, (err, isMatch) => {
      if (err || !isMatch) {
        reject(err || new MatchFailedError())
      } else {
        resolve()
      }
    })
  })

  fastify
    .decorate('bcrypt', {
      hash,
      compare
    })

  next()
})
