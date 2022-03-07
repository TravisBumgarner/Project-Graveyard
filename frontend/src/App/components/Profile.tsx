import React from 'react'
import { updateEmail, updatePassword } from 'firebase/auth'

import { context } from '.'
import {
    LabelAndInput, Button, H2, Paragraph, Modal
} from '../components/StyleExploration'

type EditProfileProps = {
    closeModal: () => void
}

const EditProfile = ({ closeModal }: EditProfileProps) => {
    const { dispatch, state } = React.useContext(context)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<string>(state.currentUser.firebase.email)
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
            if (email !== state.currentUser.firebase.email) {
                await updateEmail(state.currentUser.firebase, email)
            }
            if (password.length > 0) {
                await updatePassword(state.currentUser.firebase, password)
            }
            closeModal()
        } catch (error) {
            dispatch({
                type: 'ADD_MESSAGE',
                data: {
                    message: `Failed to update user: ${error.message}`,
                },
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h1>Edit Profile</h1>
            <div>
                <LabelAndInput label="Email" value={email} name="email" handleChange={(data) => setEmail(data)} />
            </div>

            <div>
                <LabelAndInput label="Password" value={password} name="password" handleChange={(data) => setPassword(data)} />
            </div>

            <div>
                <LabelAndInput
                    label="Confirm Password"
                    value={password}
                    name="confirmPassword"
                    handleChange={(data) => setPasswordConfirmation(data)}
                />

            </div>

            <Button variation="primary" disabled={isLoading} onClick={handleSubmit}>Save Changes</Button>
            <Button variation="secondary" disabled={isLoading} onClick={closeModal}>Cancel</Button>
        </div>
    )
}

const Profile = () => {
    const { state } = React.useContext(context)
    const [showModal, setShowModal] = React.useState<boolean>(false)

    return (
        <>
            <div>
                <H2>Profile</H2>
                <Paragraph>
                    Username:
                    {state.currentUser.phraseADay.username}
                </Paragraph>
                <Paragraph>
                    Email:
                    {state.currentUser.firebase.email}
                </Paragraph>
                <Paragraph>
                    Last Login:
                    {state.currentUser.firebase.metadata.lastSignInTime}
                </Paragraph>
            </div>
            <Button variation="primary" onClick={() => setShowModal(true)}>Edit Profile</Button>
            <Modal
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                contentLabel="Edit Profile"
            >
                <EditProfile closeModal={() => setShowModal(false)} />
            </Modal>
        </>
    )
}

export default Profile
