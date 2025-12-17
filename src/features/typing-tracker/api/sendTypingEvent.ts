import { supabase } from '@/shared/api/supabaseClient'

export type TypingPayload = {
  chatId: string
  userId: string
  isTyping: boolean
}

export const sendTypingEvent = async (payload: TypingPayload) => {
  const channel = supabase.channel('typing:tracker', {
    config: { broadcast: { self: true } }
  })

  await channel.send({
    type: 'broadcast',
    event: 'typing',
    payload
  })

  try {
    await supabase.removeChannel(channel)
  } catch {}
}
