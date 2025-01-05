import { useState } from 'react'

import './App.css'
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from 'Routes/MainRoutes'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <MainRoutes  />
      </div>
     
   
    </>
  )
}

export default App
