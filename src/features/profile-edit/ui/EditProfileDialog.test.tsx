import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import EditProfileDialog from './EditProfileDialog'
import type * as RHF from 'react-hook-form'

// bypass async validation and internal state
vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual<typeof RHF>(
    'react-hook-form'
  )

  return {
    ...actual,

    useForm: () => ({
      control: {},
      watch: () => undefined,

      // directly call submit handler with controlled data
      handleSubmit:
        (fn: (data: {
          username: string
          bio: string
          avatar?: File[]
        }) => unknown) =>
          (e: Event) => {
            e.preventDefault()

            return fn({
              username: 'newName',
              bio: 'hello',
              avatar: undefined
            })
          },

      reset: vi.fn()
    }),

    Controller: ({ render }: {
      render: (params: {
        field: {
          value: string
          onChange: (v: unknown) => void
        }
        fieldState: { invalid: boolean }
      }) => React.ReactElement
    }) =>
      render({
        field: {
          value: '',
          onChange: () => {}
        },
        fieldState: { invalid: false }
      })
  }
})

vi.mock('@/features/authentication', () => ({
  useAuthStore: (
    selector: (state: {
      session: { user: { id: string } }
    }) => unknown
  ) =>
    selector({ session: { user: { id: '1' } } })
}))

vi.mock('../model/useLoggedInUserProfile', () => ({
  useLoggedInUserProfile: () => ({
    data: {
      email: 'test@mail.com',
      username: 'anton',
      bio: 'hello'
    },
    isLoading: false,
    error: null
  })
}))

const mutateAsync = vi.fn().mockResolvedValue({})

vi.mock('../model/useUpdateLoggedInUserProfile', () => ({
  useUpdateLoggedInUserProfile: () => ({
    mutateAsync
  })
}))

const setOpen = vi.fn()

vi.mock('../model/profileEditDialogStore', () => ({
  useProfileEditDialogStore: (
    selector: (state: {
      open: boolean
      setOpen: (v: boolean) => void
    }) => unknown
  ) =>
    selector({
      open: true,
      setOpen
    })
}))

test('submits profile and closes dialog', async () => {
  render(<EditProfileDialog />)

  screen.getByRole('button', { name: /submit/i }).click()

  await waitFor(() => {
    expect(mutateAsync).toHaveBeenCalledTimes(1)
  })

  expect(setOpen).toHaveBeenCalledWith(false)
})