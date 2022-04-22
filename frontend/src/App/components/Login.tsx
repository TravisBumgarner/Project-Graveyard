import React from 'react'
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { Loading, Heading, Button, LabelAndInput, Paragraph, StyledNavLink, Divider } from 'sharedComponents'
import { TPhraseADayUser } from 'types'
import { context } from '.'
import { auth } from '../../firebase'

const userFriendlyError = (code: string) => {
    const errorLookups: Record<string, string> = {
        'auth/user-not-found': 'User not found',
        'auth/wrong-password': 'Wrong password',
    }

    return errorLookups[code] || 'Unknown error occurred'
}

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
                    message: `Failed to log in: ${userFriendlyError(error.code)}`
                }
            })
            setIsLoading(false)
        }
    }

    if (isLoading) return <Loading />

    return (
        <div>
            <Heading.H2>Log In</Heading.H2>
            <Divider />
            <form>
                <LabelAndInput
                    label="Email"
                    name="email"
                    value={email}
                    handleChange={(data) => setEmail(data)}
                />
                <LabelAndInput
                    type="password"
                    label="Password"
                    name="password"
                    value={password}
                    handleChange={(data) => setPassword(data)}
                />
                <Button variation="primary" disabled={isLoading} onClick={handleSubmit}>Log In</Button>
            </form>
            <div>
                <Paragraph>
                    Forgot your password? <StyledNavLink to="/forgottenpassword" text="Reset It!!" />
                </Paragraph>
            </div>
            <div>
                <Paragraph>
                    Need an account? <StyledNavLink to="/signup" text="Sign Up!" />
                </Paragraph>
            </div>
        </div>
    )
}

export default Login
