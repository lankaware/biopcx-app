import { React, createContext, useState, useEffect } from 'react'
import jsonwebtoken from 'jsonwebtoken'

const AuthContext = createContext()

function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('')
    const [unit, setUnit] = useState('')
    const [professionalid, setprofessionalid] = useState('')
    const [professionalname, setprofessionalname] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const secret = process.env.REACT_APP_SECRET // '390579e2935ef8b3d8f0' 
                jsonwebtoken.verify(token, secret)
                setAuthenticated(true)
                setUsername(localStorage.getItem('name'))
                setRole(localStorage.getItem('role'))
                setUnit(localStorage.getItem('unit'))
                setprofessionalid(localStorage.getItem('professionalid'))
                setprofessionalname(localStorage.getItem('professionalname'))
            } catch {
                setAuthenticated(false)
                setUsername('Anônimo')
                setprofessionalname('Não logado')
            }
        }
    }, [])

    const userSign = (token, userName, role, professionalid, professionalname, unit) => {
        if (token) {
            setAuthenticated(true)
            setUsername(userName)
            setRole(role)
            setUnit(unit)
            setprofessionalid(professionalid)
            setprofessionalname(professionalname)
            localStorage.setItem('token', token)
            localStorage.setItem('name', userName)
            localStorage.setItem('role', role)
            localStorage.setItem('unit', unit)
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
        <AuthContext.Provider value={{ authenticated, username, userSign, role, professionalid, professionalname, unit}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
