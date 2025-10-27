const SUPABASE_STORAGE_URL =
  'https://vbjnhbgklxjsppjuksad.supabase.co/storage/v1/object/public';

export function createSupabaseUrl(path: string) {
  if (path.startsWith('http')) {
    return path;
  }

  return `${SUPABASE_STORAGE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}