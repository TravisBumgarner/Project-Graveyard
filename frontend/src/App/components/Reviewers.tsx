import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'

import { Loading, Table, Heading, StyledNavLink, Button } from 'sharedComponents'
import { TPhraseADayUser } from 'types'
import { context } from 'context'
import { logger } from 'utilities'

const GET_USERS = gql`
query GetUsers {
    user {
        id,
        username
    },
    reviewer {
        id
    }
}
`

const ADD_REVIEWER = gql`
mutation AddReviewer (
    $reviewerId: String!
  ) {
    addReviewer(
        reviewerId: $reviewerId,
    ){
      id
    }
}
`

const REMOVE_REVIEWER = gql`
mutation RemoveReviewer (
    $reviewerId: String!
  ) {
    removeReviewer(
        reviewerId: $reviewerId,
    ){
      id
    }
}
`

const Reviewers = () => {
    const { state } = React.useContext(context)
    const [users, setUsers] = React.useState<(TPhraseADayUser)[]>([])
    const [reviewers, setReviewers] = React.useState<string[]>([])
    const { dispatch } = React.useContext(context)

    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [isLoadingFollowerUpdate, setIsLoadingFollowerUpdate] = React.useState<boolean>(false)
    useQuery<{ user: TPhraseADayUser[], reviewer: TPhraseADayUser[] }>(GET_USERS, {
        variables: {
            userId: state.currentUser.phraseADay.id
        },
        onCompleted: (data) => {
            setUsers(data.user.filter((user) => user.id !== state.currentUser.phraseADay.id))
            setReviewers(data.reviewer.map(({ id }) => id))
            setIsLoading(false)
        },
        onError: (error) => {
            logger(JSON.stringify(error))
            dispatch({ type: 'HAS_ERRORED' })
        },
    })
    const [addReviewer] = useMutation<{ addReviewer: TPhraseADayUser }>(ADD_REVIEWER)
    const [reviewReviewer] = useMutation<{ reviewReviewer: TPhraseADayUser }>(REMOVE_REVIEWER)

    const handleFollow = async (reviewerId: string) => {
        setIsLoadingFollowerUpdate(true)
        await addReviewer({
            variables: { reviewerId }
        })
        setReviewers((prev) => [...prev, reviewerId])
        setIsLoadingFollowerUpdate(false)
    }

    const handleUnfollow = async (reviewerId: string) => {
        setIsLoadingFollowerUpdate(true)
        await reviewReviewer({
            variables: { reviewerId }
        })
        setReviewers((prev) => {
            const modifiedReviewers = prev.filter((value) => value !== reviewerId)
            return modifiedReviewers
        })
        setIsLoadingFollowerUpdate(false)
    }

    if (isLoading) return <Loading />

    return (
        <div>
            <Heading.H2>Reviewers</Heading.H2>
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
                                            onClick={() => (reviewers.includes(id) ? handleUnfollow(id) : handleFollow(id))}
                                            variation="secondary"
                                            disabled={isLoadingFollowerUpdate}
                                        >{reviewers.includes(id) ? 'Unfollow' : 'Follow'}
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

export default Reviewers
