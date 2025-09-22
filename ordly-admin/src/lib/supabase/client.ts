import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.DATABASE_URL!,
    process.env.SUPABASE_API_KEY!
  )
}