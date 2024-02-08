import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import { BrowserRouter, Route ,Routes} from 'react-router-dom'
import Dashboard from './components/Dashboard'


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App