import { useMutation } from '@tanstack/react-query'
import { queryClient, supabase } from '@/shared/api'
import { useAuthStore } from '@/features/authentication'

type UpdateProfilePayload = {
  username?: string
  bio?: string
  avatarFile?: File
}

type ProfileUpdates = {
  username?: string
  bio?: string
  avatar?: string
  avatar_version?: number
}

type UpdateProfileResult = {
  id: string
  username?: string
  bio?: string
  avatar?: string
  avatar_version?: number
}

const getFileExt = (file: File) =>
  file.name.split('.').pop()?.toLowerCase()

export const useUpdateLoggedInUserProfile = () => {
  return useMutation<UpdateProfileResult, Error, UpdateProfilePayload>({
    mutationFn: async ({ username, bio, avatarFile }) => {
      const { session } = useAuthStore.getState()

      if (!session) throw new Error('Not authenticated')

      const loggedInUserId = session.user.id
      let avatarPath: string | undefined

      // Avatar upload
      if (avatarFile) {
        const ext = getFileExt(avatarFile)
        if (!ext) throw new Error('Invalid avatar file')

        avatarPath = `${loggedInUserId}.${ext}`

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(avatarPath, avatarFile, {
            upsert: true,
            contentType: avatarFile.type
          })

        if (uploadError) throw uploadError
      }

      // Profile update
      const updates: Partial<ProfileUpdates> = {}

      if (username) updates.username = username
      if (bio) updates.bio = bio
      if (avatarPath) {
        updates.avatar = avatarPath
        updates.avatar_version = Date.now()
      }

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', loggedInUserId)

      if (error) throw error

      return { id: loggedInUserId, ...updates }
    },

    onSuccess: (data) => {
      queryClient.setQueryData(
        ['profile', 'logged_in_user'],
        (old: UpdateProfileResult) => ({ ...old, ...data })
      )
    }
  })
}