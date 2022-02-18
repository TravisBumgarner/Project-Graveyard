import * as React from 'react'
import { updateEmail, updatePassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

import { context } from '.'
import { auth } from '../../firebase'

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
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input placeholder='Leave Blank to Not Update' type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>

            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input placeholder='Leave Blank to Not Update' type="password" name="confirmPassword" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} />
            </div>

            <button disabled={isLoading} onClick={handleSubmit}>Save Changes</button>
            <button disabled={isLoading} onClick={closeModal}>Cancel</button>
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
            <button onClick={() => setShowModal(true)}>Edit Profile</button>
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