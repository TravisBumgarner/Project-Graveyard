import React from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { Button, LabelAndInput, StyledNavLink } from 'sharedComponents'
import { context } from '.'
import { auth } from '../../firebase'

const ForgottenPassword = () => {
    const { dispatch } = React.useContext(context)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<string>('')
    const navigate = useNavigate()

    const handleSubmit = async () => {
        setIsLoading(true)

        try {
            await sendPasswordResetEmail(auth, email)
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Check your email for further instructions' } })
            navigate('/')
        } catch (error) {
            dispatch({
                type: 'ADD_MESSAGE',
                data: {
                    message: `Password reset failed with: ${error.message}`,
                },
            })
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div>
            <h1>Password Reset</h1>
            <div>
                <LabelAndInput name="email" label="Email" value={email} handleChange={(data) => setEmail(data)} />
            </div>

            <Button variation="primary" disabled={isLoading} onClick={handleSubmit}>Reset Password</Button>
            <div>
                Need an account?
                <StyledNavLink to="/login" text="Log In!" />
            </div>
        </div>
    )
}

export default ForgottenPassword
