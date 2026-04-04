import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'
import { useLoggedInUserProfile } from './useLoggedInUserProfile'

vi.mock('../api/getLoggedInUserProfile', () => ({
  getLoggedInUserProfile: vi.fn(),
}))

import { getLoggedInUserProfile } from '../api/getLoggedInUserProfile'

function createWrapper() {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    }
  })

  return ({ children }: any) => (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}

test('fetches user profile', async () => {
  // mock resolved value for queryFn
  ;(getLoggedInUserProfile as any).mockResolvedValue({
    id: '1',
    username: 'anton'
  })

  const { result } = renderHook(
    () => useLoggedInUserProfile('1'),
    { wrapper: createWrapper() }
  )

  await waitFor(() => {
    if (!result.current.data) {
      throw new Error('No data yet')
    }

    expect(result.current.data.username).toBe('anton')
  })
})