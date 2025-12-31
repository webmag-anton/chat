export const getPublicAvatarUrl = (
  path?: string | null,
  version?: number | null
) => {
  if (!path) return null

  const supabaseProjectUrl = import.meta.env.VITE_SUPABASE_URL

  const baseUrl = `${supabaseProjectUrl}/storage/v1/object/public/avatars/${path}`

  return version ? `${baseUrl}?v=${version}` : baseUrl
}