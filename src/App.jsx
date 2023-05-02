import React, { useContext } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router } from 'react-router-dom'

import '../src/css/App.css'
import AppMenu from './components/layout/Menu.jsx'
import Content from './components/layout/Content.jsx'
import Authentication from './components/layout/Authentication.jsx'

import { AuthContext } from './context/AuthContext.jsx'
import './services/customtheme'

const App = (props) => {

  const { authenticated, username, professionalname } = useContext(AuthContext);

  if (authenticated === false) {
    return (
      <div className='app-content'>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Router>
            <AppMenu
              userName={professionalname  || username} 
              authenticated={authenticated} />
          <Authentication />
          </Router>
        </ErrorBoundary>
      </div>
    )
  } else {
    return (
      <div className='app-content'>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Router>
            <AppMenu
              userName={professionalname || username} 
              authenticated={authenticated}/>
            <Content />
          </Router>
        </ErrorBoundary>
      </div>
    )
  }
}

function ErrorFallback({ error }) {
  return (
    <div role='alert'>
      <p>Ops, ocorreu um erro na aplicação!</p>
      <p>Por favor, entre em contato com o suporte informando a mensagem abaixo:</p>
      <p />
      <p style={{ color: 'red' }}>{error.message}</p>
    </div>
  )
}

export default App
