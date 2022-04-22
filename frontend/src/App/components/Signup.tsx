import React from 'react'
import { createUserWithEmailAndPassword, getIdToken } from 'firebase/auth'

import axios from 'axios'
import { Loading, Button, Heading, LabelAndInput, Paragraph, StyledNavLink, Divider, } from 'sharedComponents'
import { TPhraseADayUser } from 'types'
import { context } from '.'
import { auth } from '../../firebase'

const userFriendlyError = (code: string) => {
    const errorLookups: Record<string, string> = {
    }

    return errorLookups[code] || 'Unknown error occurred'
}

const Singup = () => {
    const { dispatch } = React.useContext(context)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<string>('')
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = React.useState<string>('')

    const handleSubmit = async () => {
        setIsLoading(true)
        if (password !== passwordConfirmation) {
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Passwords don\'t match' } })
            setIsLoading(false)
            return
        }

        try {
            const { user: firebase } = await createUserWithEmailAndPassword(auth, email, password)
            const token = await getIdToken(firebase)
            const { data: phraseADay }: { data: TPhraseADayUser } = await axios.post(`${__API_ENDPOINT__}/whoami`, {
                username,
            }, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            })

            dispatch({
                type: 'USER_SIGNED_UP',
                data: {
                    currentUser: {
                        phraseADay,
                        firebase,
                    },
                },
            })
        } catch (error) {
            dispatch({
                type: 'ADD_MESSAGE',
                data: {
                    message: `Failed to sign up: ${userFriendlyError(error.code)}`
                },
            })
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) return <Loading />

    return (
        <div>
            <Heading.H2>Sign Up</Heading.H2>
            <Divider />
            <form>
                <LabelAndInput
                    label="Username"
                    name="username"
                    value={username}
                    handleChange={(data) => setUsername(data)}
                />
                <LabelAndInput
                    label="Email"
                    name="email"
                    value={email}
                    handleChange={(data) => setEmail(data)}
                />
                <LabelAndInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    handleChange={(data) => setPassword(data)}
                />
                <LabelAndInput
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    value={passwordConfirmation}
                    handleChange={(data) => setPasswordConfirmation(data)}
                />
                <Button variation="primary" disabled={isLoading} onClick={handleSubmit}>Sign Up</Button>
            </form>
            <Paragraph>
                Already signed up? <StyledNavLink to="/login" text="Log In!" />
            </Paragraph>
        </div>
    )
}

export default Singup
