import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeRoute from './routes/HomeRoute'
import RegisterRoute from './routes/RegisterRoute'
import LoginRoute from './routes/LoginRoute'
import Cookies from 'js-cookie'
import axios from 'axios'
import backend_ref from './components/BackendRef'
import { useDispatch } from 'react-redux'
import { login } from './Store/slice/userSlice'
function App() {
  let cookie = Cookies.get('instaBookCredentials')
  const dispatch = useDispatch()
  const checkCookie = async (cookieObj) => {
    let check = await axios.post(backend_ref + '/verify', { cookieObj })
    dispatch(login(check.data));
  }


  if (cookie === undefined)
    null
  else {
    checkCookie(JSON.parse(cookie))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeRoute />} />
        <Route path='/register' element={<RegisterRoute />} />
        <Route path='/login' element={<LoginRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
