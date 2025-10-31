import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient(
  // {
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 1000 * 60,        // 1 minute
  //       gcTime: 1000 * 60 * 5,       // garbage collect unused data after 5 min
  //       retry: 1,                    // retry failed requests once
  //       refetchOnWindowFocus: false, // don't refetch when tab is focused
  //     }
  //   }
  // }
)
