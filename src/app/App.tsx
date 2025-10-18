import { Authenticator } from '@/features/authentication/ui/Authenticator.tsx'
import { Layout } from '@/widgets/layout/ui/Layout.tsx'

function App() {
  return <Authenticator
    loggedInComponent={<Layout/>}
  />
}

export default App
