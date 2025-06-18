import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Rifa from './pages/Rifa'
import RaspaYGana from './pages/RaspaYGana'

const App = () => {
  return (
    <div className='font-pirataone'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rifa' element={<Rifa />} />
        <Route path='/raspaygana' element={<RaspaYGana />} />
      </Routes>
    </div>
  )
}

export default App