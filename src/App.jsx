import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router } from 'react-router-dom'

// import 'fontsource-roboto'
// import './bootstrap.css'

import '../src/css/App.css'

import PageHeader from './components/layout/PageHeader.jsx'
import AppMenu from './components/layout/Menu.jsx'
import Content from './components/layout/Content.jsx'

import './services/customtheme'

const App = (props) => {

  const [collapseMenu, setCollapseMenu] = useState(false)

  const toggleMenu = () => {
    setCollapseMenu(!collapseMenu)
  }

  return (
    <div className='app-content'>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
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

function ErrorFallback({ error }) {
  return (
    <div role='alert'>
      <p>Ops, ocorreu um erro na aplicação!</p>
      <p>Por favor, entre em contato com o suporte informando a mensagem abaixo:</p>
      <p/>
      <p style={{ color: 'red' }}>{error.message}</p>
    </div>
  )
}

export default App
