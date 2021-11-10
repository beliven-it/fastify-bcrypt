import Fastify from 'fastify'
import bcrypt from '../bcrypt'

const app = Fastify({ logger: false })
app.register(bcrypt, { saltWorkFactor: 10 })

app.get('/', async req => {
  const result = await req.bcryptHash('my-pass')
  return await req.bcryptCompare('my-pass', result)
})
