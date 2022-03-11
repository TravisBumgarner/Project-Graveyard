import React from 'react'
import { gql, useQuery } from '@apollo/client'

import { Loading, Table, Heading, StyledNavLink, Button } from 'sharedComponents'
import { TPhraseADayUser } from 'types'
import { context } from 'context'

const GET_USERS = gql`
query GetUsers($userId: String!) {
    user {
        id,
        username
    },
    friend(userId: $userId) {
        id
    }
}
`

const Users = () => {
    const { state } = React.useContext(context)
    const [users, setUsers] = React.useState<(TPhraseADayUser)[]>([])
    const [friends, setFriends] = React.useState<string[]>([])

    const [isLoading, setIsLoading] = React.useState<boolean>(true)

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

    if (isLoading) return <Loading />

    return (
        <div>
            <Heading.H2>Users</Heading.H2>
            <Table.Table>
                <Table.TableHeader>
                    <Table.TableRow>
                        <Table.TableHeaderCell width="20%">Username</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="10%">Action</Table.TableHeaderCell>
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
                                    <Button variation="secondary">{friends.includes(id) ? 'Unfollow' : 'Follow'}</Button>
                                </Table.TableBodyCell>
                            </Table.TableRow>
                        ))}
                </Table.TableBody>
            </Table.Table>
        </div>
    )
}

export default Users
