import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router } from 'react-router-dom'

// import 'fontsource-roboto'
// import './bootstrap.css'

import '../src/css/App.css'

import PageHeader from './components/layout/PageHeader.jsx'
import AppMenu from './components/layout/Menu.jsx'
import Content from './components/layout/Content.jsx'
import Login from './components/layout/Login.jsx'

import './services/customtheme'

const App = (props) => {

  const [collapseMenu, setCollapseMenu] = useState(false)
  const [logged, setLogged] = useState(false)

  const toggleMenu = () => {
    setCollapseMenu(!collapseMenu)
  }

  if (!logged) {
    return (
      <div className='app-content'>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <PageHeader
            userName='Anônimo'
            toggleMenu={toggleMenu}
          />
          <Login
            logged={logged}
            onChange={setLogged}
          />
        </ErrorBoundary>
      </div>
    )

  } else {
    return (
      <div className='app-content'>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Login
            logged={logged}
          />
          <Router>
            <PageHeader
              userName='Anônimo'
              toggleMenu={toggleMenu}
            />
            <AppMenu collapseMenu={collapseMenu} />
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
