import * as React from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

import { context } from '.'
import { auth } from '../../firebase'

type ForgottenPasswordProps = {
}

const ForgottenPassword = ({ }: ForgottenPasswordProps) => {
    const { dispatch } = React.useContext(context)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<string>('')
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setIsLoading(true)

        try {
            await sendPasswordResetEmail(auth, email)
            dispatch({ type: "ADD_MESSAGE", data: { message: "Check your email for further instructions" } })
            navigate('/')
        } catch (error) {
            dispatch({
                type: "ADD_MESSAGE", data: {
                    message: `Password reset failed with: ${error.message}`
                }
            })
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div>
            <h1>Password Reset</h1>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>

            <button disabled={isLoading} onClick={handleSubmit}>Reset Password</button>
            <div>
                Need an account? <Link to="/login">Log In!</Link>
            </div>
        </div>
    )
}

export default ForgottenPassword