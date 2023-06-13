import { React, createContext, useState, useEffect } from 'react'
import jsonwebtoken from 'jsonwebtoken'

const AuthContext = createContext()

function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState('')
    const [rolecontext, setRolecontext] = useState('')
    const [unitcontext, setUnitcontext] = useState('')
    const [unitname, setUnitname] = useState('')
    const [professionalid, setprofessionalid] = useState('')
    const [professionalname, setprofessionalname] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const secret = process.env.REACT_APP_SECRET  
                jsonwebtoken.verify(token, secret)
                setAuthenticated(true)
                setUsername(localStorage.getItem('name'))
                setRolecontext(localStorage.getItem('role'))
                setUnitcontext(localStorage.getItem('unit'))
                setUnitname(localStorage.getItem('unitname'))
                setprofessionalid(localStorage.getItem('professionalid'))
                setprofessionalname(localStorage.getItem('professionalname'))
            } catch {
                setAuthenticated(false)
                setUsername('Anônimo')
                setprofessionalname('Não logado')
            }
        }
    }, [])

    const userSign = (token, userName, role, professionalid, professionalname, unit, unitname) => {
        if (token) {
            setAuthenticated(true)
            setUsername(userName)
            setRolecontext(role)
            setUnitcontext(unit)
            setUnitname(unitname)
            setprofessionalid(professionalid)
            setprofessionalname(professionalname)
            localStorage.setItem('token', token)
            localStorage.setItem('name', userName)
            localStorage.setItem('role', role)
            localStorage.setItem('unit', unit)
            localStorage.setItem('unitname', unitname)
            localStorage.setItem('professionalid', professionalid)
            localStorage.setItem('professionalname', professionalname)
        } else {
            setAuthenticated(false)
            setUsername('Anônimo')
            localStorage.setItem('token', '')
            localStorage.setItem('name', 'Anônimo')
            localStorage.setItem('professionalname', 'Não logado')
        }
    }
    return (
        <AuthContext.Provider value={{ authenticated, username, userSign, rolecontext, professionalid, professionalname, unitcontext, unitname}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
