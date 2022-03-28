import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'

import { Loading, Table, Heading, StyledNavLink, Button } from 'sharedComponents'
import { TPhraseADayUser } from 'types'
import { context } from 'context'

const GET_USERS = gql`
query GetUsers {
    user {
        id,
        username
    },
    friend {
        id
    }
}
`

const ADD_FRIEND = gql`
mutation AddFriend (
    $friendId: String!
  ) {
    addFriend(
        friendId: $friendId,
    ){
      id
    }
}
`

const REMOVE_FRIEND = gql`
mutation RemoveFriend (
    $friendId: String!
  ) {
    removeFriend(
        friendId: $friendId,
    ){
      id
    }
}
`

const Users = () => {
    const { state } = React.useContext(context)
    const [users, setUsers] = React.useState<(TPhraseADayUser)[]>([])
    const [friends, setFriends] = React.useState<string[]>([])

    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [isLoadingFollowerUpdate, setIsLoadingFollowerUpdate] = React.useState<boolean>(false)
    useQuery<{ user: TPhraseADayUser[], friend: TPhraseADayUser[] }>(GET_USERS, {
        variables: {
            userId: state.currentUser.phraseADay.id
        },
        onCompleted: (data) => {
            setUsers(data.user.filter((user) => user.id !== state.currentUser.phraseADay.id))
            setFriends(data.friend.map(({ id }) => id))
            setIsLoading(false)
        },
    })
    const [addFriend] = useMutation<{ addFriend: TPhraseADayUser }>(ADD_FRIEND)
    const [removeFriend] = useMutation<{ removeFriend: TPhraseADayUser }>(REMOVE_FRIEND)

    const handleFollow = async (friendId: string) => {
        setIsLoadingFollowerUpdate(true)
        await addFriend({
            variables: { friendId }
        })
        setFriends((prev) => [...prev, friendId])
        setIsLoadingFollowerUpdate(false)
    }

    const handleUnfollow = async (friendId: string) => {
        setIsLoadingFollowerUpdate(true)
        await removeFriend({
            variables: { friendId }
        })
        setFriends((prev) => {
            const modifiedFriends = prev.filter((value) => value !== friendId)
            return modifiedFriends
        })
        setIsLoadingFollowerUpdate(false)
    }

    if (isLoading) return <Loading />

    return (
        <div>
            <Heading.H2>Friends</Heading.H2>
            <Table.Table>
                <Table.TableHeader>
                    <Table.TableRow>
                        <Table.TableHeaderCell width="20%">Username</Table.TableHeaderCell>
                        <Table.TableHeaderCell style={{ textAlign: 'center' }} width="10%">Action</Table.TableHeaderCell>
                    </Table.TableRow>
                </Table.TableHeader>
                <Table.TableBody>
                    {users
                        .map(({
                            id, username
                        }) => (
                            <Table.TableRow key={id}>
                                <Table.TableBodyCell><StyledNavLink to={`/profile/${id}`} text={username} /></Table.TableBodyCell>
                                <Table.TableBodyCell>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button
                                            onClick={() => (friends.includes(id) ? handleUnfollow(id) : handleFollow(id))}
                                            variation="secondary"
                                            disabled={isLoadingFollowerUpdate}
                                        >{friends.includes(id) ? 'Unfollow' : 'Follow'}
                                        </Button>
                                    </div>
                                </Table.TableBodyCell>
                            </Table.TableRow>
                        ))}
                </Table.TableBody>
            </Table.Table>
        </div>
    )
}

export default Users
