import React from 'react'
import { gql, useQuery } from '@apollo/client'

import { Loading, Table, Heading, StyledNavLink } from 'sharedComponents'
import { TPhraseADayUser } from 'types'

const GET_USERS = gql`
query GetUsers {
    user {
        id,
        username
    }
}
`

const Users = () => {
    const [users, setUsers] = React.useState<TPhraseADayUser[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    useQuery<{ user: TPhraseADayUser[] }>(GET_USERS, {
        fetchPolicy: 'no-cache',
        onCompleted: (data) => {
            setUsers(data.user)
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
                                <Table.TableBodyCell>actions</Table.TableBodyCell>
                            </Table.TableRow>
                        ))}
                </Table.TableBody>
            </Table.Table>
        </div>
    )
}

export default Users
