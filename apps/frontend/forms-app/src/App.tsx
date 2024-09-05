import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { REDIRECTION_ROUTES } from './common/constants'
import EditForm from './pages/EditForm/EditForm'
import ViewForm from './pages/ViewForm/ViewForm'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${REDIRECTION_ROUTES.FORM}/edit`} element={<EditForm />} />
        <Route path={`${REDIRECTION_ROUTES.FORM}/:id`} element={<ViewForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
