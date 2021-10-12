import jsonwebtoken from 'jsonwebtoken'

const tokenValidate = () => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('validate 1')
        return false
    }
    try {
        console.log('validate 2', token)
        jsonwebtoken.verify(token, process.env.SECRET)
        console.log('validate 3')
        // const userPassw = decode.passw
        return true
    } catch (error) {
        console.log('validate 4')
        return false
    }
}

export default tokenValidate