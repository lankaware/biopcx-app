import { React } from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from '../business/Login'
import Home from './Home'
import User from './User'
import TextEditor from './TextEditor'
import Procedure from '../business/Procedure'
import Procedures from '../business/Procedures'
import Professional from '../business/Professional'
import Professionals from '../business/Professionals'
import Patient from '../business/Patient'
import Patients from '../business/Patients'
import Covenant from '../business/Covenant'
import CovenantList from '../business/CovenantList'
import Agenda from '../business/Agenda'
import Agendas from '../business/Agendas'
import Medicine from '../business/Medicine'
import MedicineList from '../business/MedicineList'
import TextTemplate from '../business/TextTemplate'
import TextTemplateList from '../business/TextTemplateList'
import Exam from '../business/Exam'
import ExamList from '../business/ExamList'

const Content = props => {
    return (
        <>
            <main className='content'>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/agendas" component={Agendas} />
                    <Route exact path="/agenda/:id" component={Agenda} />
                    <Route exact path="/covenantList" component={CovenantList} />
                    <Route exact path="/covenant/:id" component={Covenant} />
                    <Route exact path="/patients" component={Patients} />
                    <Route exact path="/patient/:id" component={Patient} />
                    <Route exact path="/procedures" component={Procedures} />
                    <Route exact path="/procedure/:id" component={Procedure} />
                    <Route exact path="/professionals" component={Professionals} />
                    <Route exact path="/professional/:id" component={Professional} />
                    <Route exact path="/medicineList" component={MedicineList} />
                    <Route exact path="/medicine/:id" component={Medicine} />
                    <Route exact path="/examList" component={ExamList} />
                    <Route exact path="/exam/:id" component={Exam} />
                    <Route exact path="/texttemplateList" component={TextTemplateList} />
                    <Route exact path="/texttemplate/:id" component={TextTemplate} />
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