import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'Redux/store'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
    <App  />
    <Toaster/>
  </BrowserRouter>
  </Provider>
)

//msrikrishna2000

// nKaI90d841QWoWy1


// wH4yz77NK9DBfEoo
