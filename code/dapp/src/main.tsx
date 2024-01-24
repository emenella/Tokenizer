import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Provider from '@/components/Provider.tsx'
import NavBar from '@/components/NavBar.tsx'
import "./global.css"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider>
        <App>
          <NavBar/>
        </App>
      </Provider>
  </React.StrictMode>,
)
