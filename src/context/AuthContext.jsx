import { React, createContext, useState, useEffect } from 'react'
import { postRec } from '../services/apiconnect'

const Context = createContext()

function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            postRec('userchktoken/')
            .then(result => {
                    console.log('Context 2', result.tokenok)
                    if (result.tokenok) {
                        setAuthenticated(true)
                        setUsername(localStorage.getItem('name'))
                    } else {
                        console.log('Context 3')
                        setAuthenticated(false)
                        setUsername('Anônimo')
                    }
                })
        }
    }, [])

    const userSign = (token, userName) => {
        if (token) {
            console.log('Context Effect - Login')
            setAuthenticated(true)
            setUsername(userName)
            localStorage.setItem('token', token)
            localStorage.setItem('name', userName)
        } else {
            setAuthenticated(false)
            setUsername('Anônimo')
            localStorage.setItem('token', '')
            localStorage.setItem('name', 'Anônimo')
        }
    }
    return (
        <Context.Provider value={{ authenticated, username, userSign }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider }