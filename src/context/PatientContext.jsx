import { React, createContext, useState, useEffect } from 'react'
import { getList } from '../services/apiconnect'

const Context = createContext()

function ListsProvider({ children }) {

    const [cityList, cityListSet] = useState([])
    const [covenantList, covenantListSet] = useState([])
    const [stateList, stateListSet] = useState([])
    const [relativeList, relativeListSet] = useState([])
    const [unitList, unitListSet] = useState([])

    useEffect(() => {
        getList("unit/").then((items) => { unitListSet(items.record) })
        getList("city/").then((items) => { cityListSet(items.record) })
        getList("covenant/").then((items) => { covenantListSet(items.record) })
        getList("state/").then((items) => { stateListSet(items.record) })
        getList("patient/").then((items) => { relativeListSet(items.record) })
    }, [])

    return (
        <Context.Provider value={{ cityList, covenantList, stateList, relativeList, unitList }}>
            {children}
        </Context.Provider>
    )
}

export { Context, ListsProvider }