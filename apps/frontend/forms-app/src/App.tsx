import { Outlet} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './common/config'

function App() {

  return (
    <GoogleOAuthProvider
      clientId={GOOGLE_CLIENT_ID}
    >
      <Outlet></Outlet>
    </GoogleOAuthProvider>
  )
}

export default App
