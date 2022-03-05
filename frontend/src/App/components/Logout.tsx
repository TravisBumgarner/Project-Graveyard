import React from 'react'
import { Navigate } from 'react-router-dom'

import { signOut } from 'firebase/auth'
import { context } from '.'
import { auth } from '../../firebase'

type LogoutProps = {
}

const Logout = ({ }: LogoutProps) => {
    const { dispatch } = React.useContext(context)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        try {
            signOut(auth)
            dispatch({ type: 'USER_SIGNED_OUT', data: { currentUser: null } })
        } catch {
            alert('something went wrong logging out')
        } finally {
            setIsLoading(false)
        }
    }, [])

    if (isLoading) {
        return <p>Logging out...</p>
    }

    return <Navigate to="/" />
}

export default Logout
