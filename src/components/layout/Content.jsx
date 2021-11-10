import { React } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import User from './User'
import TextEditor from './TextEditor'
import Procedure from '../business/Procedure'
import Procedures from '../business/Procedures'
import Professional from '../business/Professional'
import Professionals from '../business/Professionals'
import Patient from '../business/Patient'
import Patients from '../business/Patients'
import Agenda from '../business/Agenda'
import Agendas from '../business/Agendas'

const Content = props => {
    return (
        <>
            <main className='content'>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path="/agendas" component={Agendas} />
                    <Route exact path="/agenda/:id" component={Agenda} />
                    <Route exact path="/patients" component={Patients} />
                    <Route exact path="/patient/:id" component={Patient} />
                    <Route exact path="/procedures" component={Procedures} />
                    <Route exact path="/procedure/:id" component={Procedure} />
                    <Route exact path="/professionals" component={Professionals} />
                    <Route exact path="/professional/:id" component={Professional} />
                    <Route exact path="/user" component={User} />
                    <Route exact path="/editor" component={TextEditor} />
                    <Route path='*'>
                        <h1>Página não encontrada</h1>
                    </Route>
                </Switch>
            </main>
        </>
    )
}

export default Content