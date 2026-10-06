import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import fastifyStatic from '@fastify/static'
import Fastify from 'fastify'

const CSP = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "connect-src 'self'",
  "img-src 'self' data:",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
].join('; ')

// No request logging: participants' IP addresses have no business in a training log.
const app = Fastify({ logger: { level: 'warn' } })

// Files only, no route handler: no user input reaches server logic. This hook adds headers.
app.addHook('onSend', async (request, reply, payload) => {
  reply.header('content-security-policy', CSP)
  reply.header('x-robots-tag', 'noindex, nofollow')
  reply.header('referrer-policy', 'no-referrer')
  reply.header('x-content-type-options', 'nosniff')
  // Synthetic session, so the HAR teaches that a capture carries your session.
  const isHtml = String(reply.getHeader('content-type') ?? '').startsWith('text/html')
  if (isHtml && !request.headers.cookie?.includes('miniluv_session=')) {
    reply.header('set-cookie', `miniluv_session=${randomUUID()}; Path=/; HttpOnly; SameSite=Strict`)
  }
  return payload
})

await app.register(fastifyStatic, {
  root: fileURLToPath(new URL('./dist', import.meta.url)),
  dotfiles: 'allow', // serves /.well-known/security.txt
})

await app.listen({ host: '0.0.0.0', port: Number(process.env.PORT ?? 8080) })
