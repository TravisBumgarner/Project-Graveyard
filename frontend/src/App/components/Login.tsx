import React from 'react'
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import { context } from '.'
import { auth } from '../../firebase'
import { TPhraseADayUser } from '../types'
import {
    H2, Button, LabelAndInput, Paragraph,
} from './StyleExploration'

const Login = () => {
    const { dispatch } = React.useContext(context)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<string>('bbb@bbb.com')
    const [password, setPassword] = React.useState<string>('bbbbbb')
    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const { user: firebase } = await signInWithEmailAndPassword(auth, email, password)
            const token = await getIdToken(firebase)
            const { data: phraseADay }: { data: TPhraseADayUser } = await axios.get(`${__API_ENDPOINT__}/whoami`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            })
            dispatch({
                type: 'USER_LOGGED_IN',
                data: {
                    currentUser: {
                        phraseADay,
                        firebase,
                    },
                },
            })
            return navigate('/')
        } catch (error) {
            dispatch({
                type: 'ADD_MESSAGE',
                data: {
                    message: `Failed to login: ${error.message}`,
                },
            })
            setIsLoading(false)
        }
    }

    return (
        <div>
            <H2>Log In</H2>
            <div>
                <LabelAndInput
                    label="Email"
                    name="email"
                    value={email}
                    handleChange={(data) => setEmail(data)}
                />
            </div>

            <div>
                <LabelAndInput
                    type="password"
                    label="Password"
                    name="password"
                    value={password}
                    handleChange={(data) => setPassword(data)}
                />
            </div>

            <Button variation="primary" disabled={isLoading} onClick={handleSubmit}>Log In</Button>
            <div>
                <Paragraph>
                    Forgot your password?
                    <Link to="/forgottenpassword">Reset it!</Link>
                </Paragraph>
            </div>
            <div>
                <Paragraph>
                    Need an account?
                    <Link to="/signup">Sign Up!</Link>
                </Paragraph>
            </div>
        </div>
    )
}

export default Login
