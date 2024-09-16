import {Routes,Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import "./index.css"
import { useState } from 'react'
import RefreshHandler from './pages/PrivateRouteComponent.jsx/RefreshHandler'

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const PrivateRoute = ({element}) =>{
    return isAuthenticated ? element : <Navigate to={"/login"} />
  }
  return (
    <div>
      <RefreshHandler setisAuthenticated={setisAuthenticated} />
    <Routes>
      <Route path='/' element={<Navigate to={"/login"} />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<PrivateRoute element={<Home />} />} />


      {/* if the user enter the wrong route, he should get redirect to the login page  */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
    </div>
  )
}

export default App
