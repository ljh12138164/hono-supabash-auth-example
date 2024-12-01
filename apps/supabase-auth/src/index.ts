import { Context, MiddlewareHandler } from 'hono'
import { env } from 'hono/adapter'
import { verify } from 'hono/jwt'
import { JWTPayload } from 'hono/utils/jwt/types'

declare module 'hono' {
  interface ContextVariableMap {
    supabaseAuth: JWTPayload
  }
}
type SupabaseEnv = {
  SUPABASE_JWT_SECRET: string
}
export const getSupabaseAuth = (c: Context) => {
  return c.get('supabaseAuth') as { auth: JWTPayload; token: string }
}

export const checkToken = (supabase?: string): MiddlewareHandler => {
  return async (c, next) => {
    const secret = supabase ?? env<SupabaseEnv>(c).SUPABASE_JWT_SECRET
    const token = c.req.header('Authorization')

    if (!token) return c.json({ message: 'token is required' }, 401)
    const jwt = token.split(' ').at(-1)
    if (!jwt) return c.json({ message: 'token is invalid' }, 401)

    try {
      const payload = await verify(jwt, secret)
      c.set('supabaseAuth', { auth: payload, token: jwt })
      await next()
    } catch (e) {
      return c.json({ message: 'jwt is invalid' }, 401)
    }
  }
}
