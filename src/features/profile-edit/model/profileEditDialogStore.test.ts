import { describe, it, expect } from 'vitest'
import { useProfileEditDialogStore } from './profileEditDialogStore'

describe('profileEditDialogStore', () => {
  it('toggles open state', () => {
    const store = useProfileEditDialogStore

    expect(store.getState().open).toBe(false)

    store.getState().setOpen(true)

    expect(store.getState().open).toBe(true)
  })
})