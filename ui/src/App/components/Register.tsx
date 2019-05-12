import * as React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import { Button, Input } from 'SharedComponents'

const Register = ({ isAuthenticated, setIsAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/" />
    }

    const [firstName, setFirstName] = React.useState<string>('')
    const [lastName, setLastName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [username, setUsername] = React.useState<string>('')

    const handleSubmit = () => {
        axios
            .post(`${__API__}/register`, {
                password,
                email,
                first_name: firstName,
                last_name: lastName,
                username: username
            })
            .then(response => {
                if (response.data.success) {
                    sessionStorage.setItem('jwtToken', response.data.token)
                    setIsAuthenticated(true)
                    setEmail('')
                    setPassword('')
                    setFirstName('')
                    setLastName('')
                    setUsername('')
                } else {
                    console.log('Registration failed.')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            First Name:
            <Input type="text" onChange={setFirstName} value={firstName} />
            Last Name:
            <Input type="text" onChange={setLastName} value={lastName} />
            Username:
            <Input type="text" onChange={setUsername} value={username} />
            Email:
            <Input type="email" onChange={setEmail} value={email} />
            Password:
            <Input type="password" onChange={setPassword} value={password} />
            <Button onClick={handleSubmit}>Register</Button>
        </div>
    )
}

export default Register
