/// <reference types="node" />

import { FastifyPluginCallback } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    bcrypt: {
      /**
       * Hashes a string and returns a promise which
       * resolves with the hash result.
       */
      hash: (pwd: string) => Promise<string>

      /**
       * Hashes data and then compares it to a hash,
       * returns a promise that resolve with the
       * result of the comparison.
       */
      compare: (data: string, hash: string) => Promise<boolean>
    }
  }

  interface FastifyRequest {
    /**
     * Hashes a string and returns a promise
     * which resolves with the has result.
     */
    bcryptHash: (pwd: string) => Promise<string>
    
    /**
     * Hashes data and then compares it to a hash,
     * returns a promise that resolves with the 
     * result of the comparison.
     */
    bcryptCompare: (data: string, hash: string) => Promise<boolean>
  }
}

interface bcryptPluginOpts {
  saltWorkFactor: number
}

declare const fastifyBcrypt: FastifyPluginCallback<NonNullable<bcryptPluginOpts>>
export default fastifyBcrypt
export { fastifyBcrypt }
