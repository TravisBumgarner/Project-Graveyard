import { gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router'

import { Loading, Heading, Table, StyledNavLink, Button, DropdownMenu } from 'sharedComponents'
import { TPhraseADayUser, TWorksheet, TReviewStatus, TReview } from 'types'
import { logger } from 'utilities'
import { context } from '.'

const UPDATE_REVIEW_STATUS = gql`
mutation UpsertReview (
    $reviewId: String!
    $worksheetId: String
    $status: String!
  ) {
    upsertReview(
        id: $reviewId,
        worksheetId: $worksheetId,
        status: $status,
    ){
      id
    }
}
`

const GET_REVIEWS = gql`
query GetReviews($reviewerId: String) {
  review(reviewerId: $reviewerId) {
    id
    reviewerId,
    worksheetId,
    status,
    worksheet {
        id,
        newLanguage,
        knownLanguage,
        title,
        date,
        user {
            id,
            username
        }
    }
  }
}
`

type ReviewTableProps = {
    reviews: (TReview & { worksheet: (TWorksheet & { user: TPhraseADayUser }) })[],
    tableType: TReviewStatus
}
const ReviewTable = ({ reviews, tableType }: ReviewTableProps) => {
    const navigate = useNavigate()
    const [updateReviewStatus] = useMutation<{ upsertReview: TReview }>(UPDATE_REVIEW_STATUS)

    const titleLookup = {
        [TReviewStatus.REVIEW_REQUESTED]: 'Review Requested',
        [TReviewStatus.REVIEW_IN_PROGRESS]: 'Review in Progress',
        [TReviewStatus.REVIEW_COMPLETED]: 'Review Completed',
    }

    const startReview = ({ worksheetId, reviewId }: { worksheetId: string, reviewId: string }) => {
        updateReviewStatus({
            variables: {
                reviewId,
                status: TReviewStatus.REVIEW_IN_PROGRESS
            },
            onCompleted: () => {
                navigate(`/worksheet/${worksheetId}`)
            }
        })
    }

    const submitReview = ({ reviewId, worksheetId }: { reviewId: string, worksheetId: string }) => {
        updateReviewStatus({
            variables: {
                reviewId,
                worksheetId,
                status: TReviewStatus.REVIEW_COMPLETED
            },
            onCompleted: () => {
                navigate('/reviewer/dashboard')
            }
        })
    }

    const actionsLookup = ({ reviewId, worksheetId }: { reviewId: string, worksheetId: string }): JSX.Element[] => {
        return {
            [TReviewStatus.REVIEW_REQUESTED]: [
                <Button fullWidth key="edit" variation="secondary" onClick={() => startReview({ worksheetId, reviewId })}>Start Review</Button>,
            ],
            [TReviewStatus.REVIEW_IN_PROGRESS]: [
                <Button fullWidth key="edit" variation="secondary" onClick={() => navigate(`/worksheet/${worksheetId}`)}>Continue Review</Button>,
                <Button fullWidth key="edit" variation="secondary" onClick={() => submitReview({ worksheetId, reviewId })}>Submit Review</Button>,
            ],
            [TReviewStatus.REVIEW_COMPLETED]: [],
        }[tableType]
    }

    return (
        <div>
            <Heading.H3>{titleLookup[tableType]}</Heading.H3>
            <Table.Table>
                <Table.TableHeader>
                    <Table.TableRow>
                        <Table.TableHeaderCell width="15%">Title</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="15%">Created</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="15%">User</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="15%">From</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="15%">To</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="25%">Description</Table.TableHeaderCell>
                        <Table.TableHeaderCell style={{ textAlign: 'center' }} width="25%">Actions</Table.TableHeaderCell>
                    </Table.TableRow>
                </Table.TableHeader>
                <Table.TableBody>
                    {reviews
                        .map(({
                            id: reviewId, worksheet: { id: worksheetId,
                                description, title, knownLanguage, newLanguage, date, user: { username, id: userId } }
                        }) => {
                            const actions = actionsLookup({ reviewId, worksheetId })

                            return (
                                <Table.TableRow key={reviewId}>
                                    <Table.TableBodyCell>{title}</Table.TableBodyCell>
                                    <Table.TableBodyCell>{date}</Table.TableBodyCell>
                                    <Table.TableBodyCell><StyledNavLink text={username} to={`/profile/${userId}`} /></Table.TableBodyCell>
                                    <Table.TableBodyCell>{knownLanguage}</Table.TableBodyCell>
                                    <Table.TableBodyCell>{newLanguage}</Table.TableBodyCell>
                                    <Table.TableBodyCell>{description}</Table.TableBodyCell>
                                    <Table.TableBodyCell>
                                        {actions.length > 0
                                            ? (
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <DropdownMenu title="Actions">{actions}</DropdownMenu>
                                                </div>
                                            )
                                            : ''}
                                    </Table.TableBodyCell>
                                </Table.TableRow>
                            )
                        })}
                </Table.TableBody>
            </Table.Table>

        </div>
    )
}

const ReviewerDashboard = () => {
    const [reviews, setReviews] = React.useState<Record<string, (TReview & { worksheet: (TWorksheet & { user: TPhraseADayUser }) })>>({})
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const { dispatch } = React.useContext(context)

    useQuery<{ review: (TReview & { worksheet: (TWorksheet & { user: TPhraseADayUser }) })[] }>(GET_REVIEWS, {
        onError: (error) => {
            logger(JSON.stringify(error))
            dispatch({ type: 'HAS_ERRORED' })
        },
        onCompleted: (data) => {
            const newReviews: Record<string, (TReview & { worksheet: (TWorksheet & { user: TPhraseADayUser }) })> = {}
            data.review.forEach((review) => { newReviews[review.id] = review })
            setReviews(newReviews)
            setIsLoading(false)
        },
    })

    if (isLoading) return <Loading />

    const filterReviews = (status: TReviewStatus) => Object.values(reviews)
        .filter((review) => review.status === status)

    return (
        <div>
            <Heading.H2>Reviewer Dashboard</Heading.H2>
            <ReviewTable
                tableType={TReviewStatus.REVIEW_REQUESTED}
                reviews={filterReviews(TReviewStatus.REVIEW_REQUESTED)}
            />
            <ReviewTable
                tableType={TReviewStatus.REVIEW_IN_PROGRESS}
                reviews={filterReviews(TReviewStatus.REVIEW_IN_PROGRESS)}
            />
            <ReviewTable
                tableType={TReviewStatus.REVIEW_COMPLETED}
                reviews={filterReviews(TReviewStatus.REVIEW_COMPLETED)}
            />
        </div>
    )
}

export default ReviewerDashboard
