import { React } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Procedure from '../business/Procedure'
import Procedures from '../business/Procedures'
import Professional from '../business/Professional'
import Professionals from '../business/Professionals'


const Content = props => {
    return (
        <>
            <main className='content'>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path="/procedures">
                            <Procedures />
                        </Route>
                        <Route exact path="/procedure">
                            <Procedure />
                        </Route>
                        <Route exact path="/procedure/:id">
                            <Procedure />
                        </Route>
                    <Route exact path="/professionals">
                            <Professionals />
                        </Route>
                        <Route exact path="/professional">
                            <Professional />
                        </Route>
                        <Route exact path="/professional/:id">
                            <Professional />
                        </Route>
                    <Route path='*'>
                        <h1>Página não encontrada</h1>
                    </Route>
                </Switch>
            </main>
        </>
    )
}

export default Content