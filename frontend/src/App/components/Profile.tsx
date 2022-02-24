import React from 'react'
import { updateEmail, updatePassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

import { context } from '.'
import { auth } from '../../firebase'
import { LabelAndInput, Button } from '../components/StyleExploration'


type EditProfileProps = {
    closeModal: () => void
}

const EditProfile = ({ closeModal }: EditProfileProps) => {
    const { dispatch, state } = React.useContext(context)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<string>(state.currentUser.firebase.email)
    const [password, setPassword] = React.useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = React.useState<string>('')

    const handleSubmit = async () => {
        setIsLoading(true)

        if (password !== passwordConfirmation) {
            dispatch({ type: "ADD_MESSAGE", data: { message: `Passwords don't match` } })
            setIsLoading(false)
            return
        }

        try {
            if (email !== state.currentUser.firebase.email) {
                await updateEmail(state.currentUser.firebase, email)
            }
            if (password.length > 0) {
                await updatePassword(state.currentUser.firebase, password)
            }
            closeModal()
        } catch (error) {
            dispatch({
                type: "ADD_MESSAGE", data: {
                    message: `Failed to update user: ${error.message}`
                }
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h1>Edit Profile</h1>
            <div>
                <LabelAndInput label="Email" value={email} name="email" handleChange={(email) => setEmail(email)} />
            </div>

            <div>
                <LabelAndInput label="Password" value={password} name="password" handleChange={(password) => setPassword(password)} />
            </div>

            <div>
                <LabelAndInput label="Confirm Password" value={password} name="confirmPassword" handleChange={(passwordConfirmation) => setPasswordConfirmation(passwordConfirmation)} />

            </div>

            <Button variation='primary' disabled={isLoading} onClick={handleSubmit}>Save Changes</Button>
            <Button variation='secondary' disabled={isLoading} onClick={closeModal}>Cancel</Button>
        </div>
    )
}


type ProfileProps = {
}

const Profile = ({ }: ProfileProps) => {
    const { state, dispatch } = React.useContext(context)
    const navigate = useNavigate()

    const [showModal, setShowModal] = React.useState<boolean>(false)

    return (
        <>
            <div>
                <h1>Profile</h1>
                <p>Username: {state.currentUser.panda.userName}</p>
                <p>Email: {state.currentUser.firebase.email}</p>
                <p>Last Login: {state.currentUser.firebase.metadata.lastSignInTime}</p>
            </div>
            <Button variation="primary" onClick={() => setShowModal(true)}>Edit Profile</Button>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Edit Profile"
            >
                <EditProfile closeModal={() => setShowModal(false)} />
            </Modal>
        </>
    )
}

export default Profile