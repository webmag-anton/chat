import { describe, it, expect, vi } from 'vitest'
import { getLoggedInUserProfile } from './getLoggedInUserProfile'

// mock the whole supabase module boundary
vi.mock('@/shared/api', () => ({
  supabase: {
    from: vi.fn(),
  }
}))

import { supabase } from '@/shared/api'

describe('getLoggedInUserProfile', () => {
  it('returns user data', async () => {
    const mockSingle = vi.fn().mockResolvedValue({
      data: { id: '1', username: 'anton' },
      error: null
    })

    const mockEq = vi.fn(() => ({ single: mockSingle }))
    const mockSelect = vi.fn(() => ({ eq: mockEq }))

    // mock chain: from -> select -> eq -> single
    ;(supabase.from as any).mockReturnValue({
      select: mockSelect
    })

    const result = await getLoggedInUserProfile('1')

    expect(result).toEqual({
      id: '1',
      username: 'anton'
    })
  })

  it('throws on error', async () => {
    const mockSingle = vi.fn().mockResolvedValue({
      data: null,
      error: new Error('fail')
    })

    const mockEq = vi.fn(() => ({ single: mockSingle }))
    const mockSelect = vi.fn(() => ({ eq: mockEq }))

    ;(supabase.from as any).mockReturnValue({
      select: mockSelect
    })

    await expect(
      getLoggedInUserProfile('1')
    ).rejects.toThrow()
  })
})