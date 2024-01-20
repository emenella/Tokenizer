import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Provider from '@/components/Provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <App>
      </App>
    </Provider>
  </React.StrictMode>,
)
