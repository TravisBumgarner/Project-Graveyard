import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router'

import { Loading, Heading, Table, StyledNavLink, Button, Modal } from 'sharedComponents'
import { TPhraseADayUser, TWorksheet, TReviewStatus, TReview } from 'types'
import { logger } from 'utilities'
import { context } from '.'
// import { context } from '.'

const GET_REVIEWS = gql`
query GetReviews($reviewerId: String) {
  review(reviewerId: $reviewerId) {
    id
    reviewerId,
    worksheetId,
    status,
    worksheet {
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
    // setWorksheets: React.Dispatch<React.SetStateAction<Record<string, TWorksheet>>>,
    tableType: TReviewStatus
}
const ReviewTable = ({ reviews, tableType }: ReviewTableProps) => {
    // const { dispatch } = React.useContext(context)
    // const [deleteWorksheet] = useMutation<{ deleteWorksheet: TWorksheet }>(DELETE_WORKSHEET)
    // const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false)

    const confirmDelete = () => {
        setShowDeleteModal(true)
    }

    const titleLookup = {
        [TReviewStatus.REVIEW_REQUESTED]: 'Review Requested',
        [TReviewStatus.REVIEW_IN_PROGRESS]: 'Review in Progress',
        [TReviewStatus.REVIEW_COMPLETED]: 'Review Completed',
    }

    const actionsLookup = (): JSX.Element[] => {
        return {
            [TReviewStatus.REVIEW_REQUESTED]: [
                <Button key="add" variation="secondary" onClick={() => console.log('Add review')}>Add</Button>,
            ],
            [TReviewStatus.REVIEW_IN_PROGRESS]: [
                <Button key="delete" variation="alert" onClick={() => confirmDelete()}>Edit</Button>,
                <Button key="delete" variation="alert" onClick={() => confirmDelete()}>Delete</Button>
            ],
            [TReviewStatus.REVIEW_COMPLETED]: [],
        }[tableType]
    }

    const handleDelete = async (id: string) => {
        console.log('deleting', id)
        // const response = await deleteWorksheet({ variables: { id } })
        // if (response.data.deleteWorksheet === null) {
        //     dispatch({ type: 'ADD_MESSAGE', data: { message: 'Failed to delete worksheet', timeToLiveMS: 5000 } })
        // } else {
        //     setWorksheets((prev) => {
        //         const modifiedWorksheets = { ...prev }
        //         delete modifiedWorksheets[id]
        //         return modifiedWorksheets
        //     })
        // }
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
                        {/* <Table.TableHeaderCell width="25%">Description</Table.TableHeaderCell> */}
                        <Table.TableHeaderCell style={{ textAlign: 'center' }} width="25%">Actions</Table.TableHeaderCell>
                    </Table.TableRow>
                </Table.TableHeader>
                <Table.TableBody>
                    {reviews
                        .map(({
                            id, worksheet: { title, knownLanguage, newLanguage, date, user: { username, id: userId } }
                        }) => (
                            <Table.TableRow key={id}>
                                <Table.TableBodyCell><StyledNavLink to={`/worksheet/${id}`} text={title} /></Table.TableBodyCell>
                                <Table.TableBodyCell>{date}</Table.TableBodyCell>
                                <Table.TableBodyCell><StyledNavLink text={username} to={`/profile/${userId}`} /></Table.TableBodyCell>
                                <Table.TableBodyCell>{knownLanguage}</Table.TableBodyCell>
                                <Table.TableBodyCell>{newLanguage}</Table.TableBodyCell>
                                {/* <Table.TableBodyCell>{description}</Table.TableBodyCell> */}
                                <Table.TableBodyCell>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        {actionsLookup()}
                                    </div>
                                </Table.TableBodyCell>
                                <Modal
                                    contentLabel="Delete Worksheet?"
                                    showModal={showDeleteModal}
                                    closeModal={() => setShowDeleteModal(false)}
                                >
                                    <>
                                        <Button variation="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                                        <Button variation="alert" onClick={() => handleDelete(id)}>Delete it</Button>
                                    </>
                                </Modal>
                            </Table.TableRow>
                        ))}
                </Table.TableBody>
            </Table.Table>

        </div>
    )
}

const ReviewerDashboard = () => {
    const [reviews, setReviews] = React.useState<Record<string, (TReview & { worksheet: (TWorksheet & { user: TPhraseADayUser }) })>>({})
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    // const { state } = React.useContext(context)
    const navigate = useNavigate()
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

    console.log('all', reviews)
    console.log(filterReviews(TReviewStatus.REVIEW_REQUESTED))
    return (
        <div>
            <Heading.H2>Reviewer Dashboard</Heading.H2>
            <Button variation="primary" onClick={() => navigate('/worksheet/new')}>Add Worksheet</Button>
            <ReviewTable
                tableType={TReviewStatus.REVIEW_REQUESTED}
                // setWorksheets={setWorksheets}
                reviews={filterReviews(TReviewStatus.REVIEW_REQUESTED)}
            />
            <ReviewTable
                tableType={TReviewStatus.REVIEW_IN_PROGRESS}
                // setWorksheets={setWorksheets}
                reviews={filterReviews(TReviewStatus.REVIEW_IN_PROGRESS)}
            />
            <ReviewTable
                tableType={TReviewStatus.REVIEW_COMPLETED}
                // setWorksheets={setWorksheets}
                reviews={filterReviews(TReviewStatus.REVIEW_COMPLETED)}
            />
        </div>
    )
}

export default ReviewerDashboard
