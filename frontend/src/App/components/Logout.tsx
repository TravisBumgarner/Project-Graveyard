import React from 'react'
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'
import { Link, useNavigate, Navigate } from 'react-router-dom'

import { context } from '.'
import { auth } from '../../firebase'
import { PhraseADayUser } from '../types'
import axios from 'axios'
import { signOut } from 'firebase/auth'



type LogoutProps = {
}

const Logout = ({ }: LogoutProps) => {
    const { dispatch } = React.useContext(context)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        try {
            signOut(auth)
            dispatch({ type: "USER_SIGNED_OUT", data: { currentUser: null } })
        } catch {
            alert("something went wrong logging out")
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