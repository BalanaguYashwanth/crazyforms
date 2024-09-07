import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import EditForm from './pages/EditForm/EditForm'
import ViewForm from './pages/ViewForm/ViewForm'
import Home from './pages/Home/Home'
import Forms from './pages/Forms/Forms'
import { REDIRECTION_ROUTES } from './common/constants'

function App() {

  return (
    <GoogleOAuthProvider
      clientId={''}
    >
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`${REDIRECTION_ROUTES.FORMS}`} element={<Forms />} />
          <Route path={`${REDIRECTION_ROUTES.EDIT_FORM}`} element={<EditForm />} />
          <Route path={`${REDIRECTION_ROUTES.VIEW_FORM}`} element={<ViewForm />} />
        </Routes>

      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
