import React from 'react'
import { gql, useQuery } from '@apollo/client'

import { Heading, Loading, Paragraph } from 'sharedComponents'
import { TPhraseADayUser } from 'types'
import { logger } from 'utilities'
import { context } from '../..'

const GET_USER = gql`
query GetUser($userId: String) {
  user(userId: $userId) {
      username,
      id
  }
}
`

type OtherUserProfileProps = {
    userId: string
}

const OtherUserProfile = ({ userId }: OtherUserProfileProps) => {
    const [user, setUser] = React.useState<TPhraseADayUser>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const { dispatch } = React.useContext(context)

    useQuery<{ user: TPhraseADayUser[] }>(GET_USER, {
        variables: {
            userId
        },
        onCompleted: (data) => {
            setUser(data.user[0])
            setIsLoading(false)
        },
        onError: (error) => {
            logger(JSON.stringify(error))
            dispatch({ type: 'HAS_ERRORED' })
        },
    })

    if (isLoading) return <Loading />

    return (
        <div>
            <Heading.H2>Other User Profile</Heading.H2>
            <Paragraph>
                Username: {user.username}
            </Paragraph>
        </div>
    )
}

export default OtherUserProfile
