import { expect, vi } from 'vitest'
import { useUpdateLoggedInUserProfile } from './useUpdateLoggedInUserProfile'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

vi.mock('@/features/authentication', () => ({
  useAuthStore: {
    getState: () => ({
      session: { user: { id: '1' } }
    })
  }
}))

vi.mock('@/shared/api', () => ({
  supabase: {
    from: vi.fn(),
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn().mockResolvedValue({ error: null })
      }))
    }
  },
  queryClient: {
    setQueryData: vi.fn()
  }
}))

import { supabase } from '@/shared/api'

function wrapper({ children }: any) {
  const client = new QueryClient({
    defaultOptions: { mutations: { retry: false } }
  })

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}

test('updates profile successfully', async () => {
  const mockUpdate = vi.fn().mockResolvedValue({ error: null })

  // mock chain: from -> update -> eq
  ;(supabase.from as any).mockReturnValue({
    update: () => ({ eq: mockUpdate })
  })

  const { result } = renderHook(
    () => useUpdateLoggedInUserProfile(),
    { wrapper }
  )

  await result.current.mutateAsync({
    username: 'anton'
  })

  expect(mockUpdate).toHaveBeenCalled()
})