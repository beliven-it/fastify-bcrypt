# fastify-bcrypt

A Bcrypt hash generator & checker

https://it.wikipedia.org/wiki/Bcrypt

![Node.js CI](https://github.com/heply/fastify-bcrypt/workflows/Node.js%20CI/badge.svg?branch=master)

## Install

```bash
$ npm i --save fastify-bcrypt
```

## Usage

```js
fastify.register(require('fastify-bcrypt'), {
  saltWorkFactor: 12
})

fastify.bcrypt.hash('password')
  .then(hash => fastify.bcrypt.compare('password', hash))
  .then(match => console.log(match ? 'Matched!' : 'Not matched!'))
  .catch(err => console.error(err.message))

// Matched!
```

## Options

| Name               | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `saltWorkFactor`   | The salt work factor for the `bcrypt` algorithm. The default value is `10`. |

## Methods

| Name                            | Description                                |
|---------------------------------|--------------------------------------------|
| `hash (claim) [async]`          | Generate an hash of given `claim`.         |
| `compare (claim, hash) [async]` | Compare an hashed `claim` with `hash`. **NOTE:** they're not reversible! |

## Request

| Name                                  | Description                          |
|---------------------------------------|--------------------------------------|
| `bcryptHash (claim) [async]`          | See `hash`.                          |
| `bcryptCompare (claim, hash) [async]` | See `compare`.                       |

## Test

```bash
$ npm test
```

## Acknowledgements

This project is kindly sponsored by:

[![Beliven](https://assets.beliven.com/brand/logo_pos_color.svg)](https://www.beliven.com)

## License

Licensed under [MIT](./LICENSE)
