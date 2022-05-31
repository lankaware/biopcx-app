import { React, createContext, useState, useEffect } from 'react'
import jsonwebtoken from 'jsonwebtoken'

const AuthContext = createContext()

function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const secret = process.env.REACT_APP_SECRET // '390579e2935ef8b3d8f0' 
                jsonwebtoken.verify(token, secret)
                setAuthenticated(true)
                setUsername(localStorage.getItem('name'))
                setRole(localStorage.getItem('role'))
            } catch {
                setAuthenticated(false)
                setUsername('Anônimo')
            }
        }
    }, [])

    const userSign = (token, userName, role) => {
        if (token) {
            setAuthenticated(true)
            setUsername(userName)
            localStorage.setItem('token', token)
            localStorage.setItem('name', userName)
            localStorage.setItem('role', role)

        } else {
            setAuthenticated(false)
            setUsername('Anônimo')
            localStorage.setItem('token', '')
            localStorage.setItem('name', 'Anônimo')
        }
    }
    return (
        <AuthContext.Provider value={{ authenticated, username, userSign, role}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }