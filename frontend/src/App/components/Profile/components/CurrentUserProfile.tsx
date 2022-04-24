import React from 'react'
import { updateEmail, updatePassword } from 'firebase/auth'

import { LabelAndInput, Button, Heading, Paragraph, Modal, colors, ButtonWrapper } from 'sharedComponents'
import styled from 'styled-components'
import { context } from '../..'

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
            <Heading.H1>Edit Profile</Heading.H1>
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

const MetadataWrapper = styled.div`
    border: 2px solid;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    border-color: ${colors.PRIMARY.base};
    margin: 0.5rem 0;
`

const CurrentUserProfile = () => {
    const { state } = React.useContext(context)
    const [showModal, setShowModal] = React.useState<boolean>(false)

    return (
        <>
            <div>
                <Heading.H2>Profile</Heading.H2>
                <MetadataWrapper>
                    <Paragraph>
                        Username: {state.currentUser.phraseADay.username}
                    </Paragraph>
                    <Paragraph>
                        Email: {state.currentUser.firebase.email}
                    </Paragraph>
                    <Paragraph>
                        Last Login: {state.currentUser.firebase.metadata.lastSignInTime}
                    </Paragraph>
                </MetadataWrapper>
            </div>
            <ButtonWrapper
                right={[<Button variation="secondary" onClick={() => setShowModal(true)}>Edit Profile</Button>]}
            />

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

export default CurrentUserProfile
