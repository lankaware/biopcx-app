import { React } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import UserLogin from './UserLogin'
import TextEditor from './TextEditor'
import Procedure from '../business/Procedure'
import ProcedureList from '../business/ProcedureList'
import Professional from '../business/Professional'
import ProfessionalList from '../business/ProfessionalList'
import Patient from '../business/Patient'
import PatientList from '../business/PatientList'
import Covenant from '../business/Covenant'
import CovenantList from '../business/CovenantList'
import Agenda from '../business/Agenda'
import AgendaList from '../business/AgendaList'
import BillingList from '../business/BillingList'
import Medicine from '../business/Medicine'
import MedicineList from '../business/MedicineList'
import TextTemplate from '../business/TextTemplate'
import TextTemplateList from '../business/TextTemplateList'
import Exam from '../business/Exam'
import ExamList from '../business/ExamList'
import BillingReport from '../business/BillingReport'
import Login from '../business/Login'
import LoginList from '../business/LoginList'

const Content = props => {
    return (
        <>
            <main className='content'>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path="/agendaList" component={AgendaList} />
                    <Route exact path="/billingList" component={BillingList} />
                    <Route exact path="/billingReport" component={BillingReport} />
                    <Route exact path="/agenda/:id" component={Agenda} />
                    <Route exact path="/covenantList" component={CovenantList} />
                    <Route exact path="/covenant/:id" component={Covenant} />
                    <Route exact path="/patientList" component={PatientList} />
                    <Route exact path="/patient/:id" component={Patient} />
                    <Route exact path="/procedureList" component={ProcedureList} />
                    <Route exact path="/professionalList" component={ProfessionalList} />
                    <Route exact path="/professional/:id" component={Professional} />
                    <Route exact path="/medicineList" component={MedicineList} />
                    <Route exact path="/examList" component={ExamList} />
                    <Route exact path="/texttemplateList" component={TextTemplateList} />
                    <Route exact path="/texttemplate/:id" component={TextTemplate} />
                    <Route exact path="/loginlist" component={LoginList} />
                    <Route exact path="/login/:id" component={Login} />

                    <Route exact path="/userLogin" component={UserLogin} />
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