import React from 'react'
import { useParams } from 'react-router'

import { context } from '..'
import { CurrentUserProfile, OtherUserProfile } from './components'

const Profile = () => {
    const { state } = React.useContext(context)
    const { userId } = useParams()

    return state.currentUser.phraseADay.id === userId
        ? <CurrentUserProfile />
        : <OtherUserProfile userId={userId} />
}

export default Profile
