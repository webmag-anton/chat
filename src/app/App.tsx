import { Authenticator } from '@/features/authentication'
import { Layout } from '@/widgets/layout'

function App() {
  return <Authenticator
    loggedInComponent={<Layout />}
  />
}

export default App
