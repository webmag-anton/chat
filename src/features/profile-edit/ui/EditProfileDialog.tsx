import { useState, useEffect, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { useProfileEditDialogStore } from '../model/profileEditDialogStore'
import { useLoggedInUserProfile } from '../model/useLoggedInUserProfile'
import { useUpdateLoggedInUserProfile } from '../model/useUpdateLoggedInUserProfile'
import { useAuthStore } from '@/features/authentication'
import { Avatar } from '@/shared/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/shadcn/dialog'
import { Button } from '@/shared/ui/shadcn/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/shared/ui/shadcn/field'
import { Input } from '@/shared/ui/shadcn/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea
} from '@/shared/ui/shadcn/input-group'

const formSchema = z.object({
  username: z.string().min(2).max(32).optional(),
  bio: z.string().max(100).optional(),
  avatar: z
    .any()
    .refine((files) => files?.length === 1)
    .optional()
})

export function EditProfileDialog() {
  const session = useAuthStore(s => s.session)
  const {
    data: loggedInUserProfileData,
    isLoading,
    error
  } = useLoggedInUserProfile(session?.user?.id ?? '')
  const open = useProfileEditDialogStore(s => s.open)
  const setOpen = useProfileEditDialogStore(s => s.setOpen)

  const [ preview, setPreview ] = useState<string | null>(null)
  const avatarInputRef = useRef<HTMLInputElement | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      bio: '',
      avatar: undefined
    }
  })

  const loggedInUserEmail = loggedInUserProfileData?.email
  const loggedInUserUsername = loggedInUserProfileData?.username
  const loggedInUserBio = loggedInUserProfileData?.bio

  // Update preview when avatar changes
  useEffect(() => {
    const file = form.watch('avatar')?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreview(null)
    }
  }, [form.watch('avatar')])

  useEffect(() => {
    if (loggedInUserProfileData) {
      form.reset({
        username: loggedInUserProfileData.username ?? '',
        bio: loggedInUserProfileData.bio ?? '',
        avatar: undefined
      })
    }
  }, [loggedInUserProfileData])

  const updateProfile = useUpdateLoggedInUserProfile()

  const handleFormReset = () => {
    form.reset({
      username: loggedInUserUsername ?? '',
      bio: loggedInUserBio ?? '',
      avatar: undefined
    })
    setPreview(null)
    if (avatarInputRef.current) {
      avatarInputRef.current.value = ''
    }
  }

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updateProfile.mutateAsync({
        username: data.username,
        bio: data.bio,
        avatarFile: data.avatar?.[0]
      })

      handleFormReset()
      setOpen(false)
      toast.success('Profile updated')
    } catch (error) {
      toast.error('Failed to update profile')
      console.error(error)
    }
  }

  if (!session) return null
  if (isLoading) {
    return (
      <div className='w-fit mx-auto mt-8 p-2 rounded-2xl bg-bg-message'>
        Loading...
      </div>
    )
  }
  if (error) {
    return (
      <div className='w-fit mx-auto mt-8 p-2 rounded-2xl bg-bg-message'>
        Error loading profiles
      </div>
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleFormReset()
        }
        setOpen(isOpen)
      }}
    >
      <DialogContent className='sm:max-w-[520px] max-h-[94vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-center'>
            Edit my profile
          </DialogTitle>
        </DialogHeader>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <div className='rounded-md border bg-gray-200 px-3 py-2 text-sm'>
            {`${loggedInUserEmail || ''}`}
          </div>
        </Field>

        <form
          id='edit-profile-form'
          className='space-y-5'
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <FieldGroup>
            {/* Username */}
            <Controller
              name='username'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='username'>Username</FieldLabel>
                  <Input
                    {...field}
                    id='username'
                    placeholder={`${loggedInUserUsername || ''}`}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* About */}
            <Controller
              name='bio'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='my-bio'>About</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id='my-bio'
                      rows={6}
                      className='resize-none'
                      placeholder={`${loggedInUserBio || ''}`}
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align='block-end'>
                      <InputGroupText className='tabular-nums'>
                        {field?.value?.length}/100
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Avatar */}
            <Controller
              name='avatar'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='avatar'>Avatar</FieldLabel>
                  <input
                    id='avatar'
                    type='file'
                    accept='image/*'
                    ref={avatarInputRef}
                    onChange={(e) => field.onChange(e.target.files)}
                    className='block rounded-md border border-input p-3 text-sm'
                  />
                  {preview && (
                    <Avatar
                      url={preview}
                      title='Rreview avatar'
                    />
                  )}
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              className='cursor-pointer'
              onClick={handleFormReset}
            >
              Reset
            </Button>
            <Button
              type='submit'
              variant='outline'
              className='cursor-pointer'
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}