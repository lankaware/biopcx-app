import { React, createContext, useState, useEffect, useContext } from 'react'
import { getList } from '../services/apiconnect'
// import { AuthContext } from './AuthContext.jsx'

const PatientContext = createContext()

function ListsProvider({ children }) {

    // const [cityList, cityListSet] = useState([])
    const [covenantList, covenantListSet] = useState([])
    const [covenantplanList, covenantplanListSet] = useState([])
    const [stateList, stateListSet] = useState([])
    const [relativeList, relativeListSet] = useState([])
    const [unitList, unitListSet] = useState([])

    // const { authenticated, username } = useContext(AuthContext);

    useEffect(() => {
        // if (authenticated === true) {
            getList("unit/").then((items) => { unitListSet(items.record) })
            // getList("city/").then((items) => { cityListSet(items.record) })
            getList("covenant/").then((items) => { covenantListSet(items.record) })
            getList("covenantplan/").then((items) => { covenantplanListSet(items.record) })
            getList("state/").then((items) => { stateListSet(items.record) })
            getList("patient/").then((items) => { relativeListSet(items.record) })
        // }
    }, [])

    return (
        <PatientContext.Provider value={{ covenantList, covenantplanList, stateList, relativeList, unitList }}>
            {children}
        </PatientContext.Provider>
    )
}

export { PatientContext, ListsProvider }