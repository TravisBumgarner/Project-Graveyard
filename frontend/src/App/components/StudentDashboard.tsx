import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useNavigate } from 'react-router'

import { Loading, Table, Heading, StyledNavLink, Button, Modal, DropdownMenu, Paragraph } from 'sharedComponents'
import { TWorksheetStatus, TWorksheet, TPhraseADayUser, TReview, TReviewStatus } from 'types'
import { context } from 'context'
import { uuid4 } from '@sentry/utils'
import moment from 'moment'
import { dateToString, logger } from 'utilities'

const GET_WORKSHEETS = gql`
query GetWorksheets {
  worksheet {
    title,
    id,
    description,
    date,
    knownLanguage,
    newLanguage,
    userId,
    status,
    user {
      username
    }
  }
}
`

const GET_POTENTIAL_REVIEWERS = gql`
    query GetReviewDetails (
        $worksheetId: String!
    ) {
        friend {
            username,
            id
        },
        review(worksheetId: $worksheetId) {
            reviewerId
        }
    }
`

const UPSERT_REVIEW = gql`
    mutation UpsertReview (
        $id: String!
        $worksheetId: String!
        $reviewerId: String!
        $status: String!
        $date: String!
    ) {
        upsertReview(id: $id, reviewerId: $reviewerId, worksheetId: $worksheetId, status: $status, date: $date) {
            reviewerId
        }
    }
`

// const DELETE_REVIEW = gql`
//     mutation DeleteReview (
//         $id: String!
//     ) {
//         deleteReview(id: $id) {
//             id
//         }
//     }
// `

const DELETE_WORKSHEET = gql`
mutation DeleteWorksheet (
    $id: String!
  ) {
    deleteWorksheet(
        id: $id,
    ){
      id
    }
    }
`

type ReviewersModalProps = {
    worksheetId: string
}
const ReviewersModal = ({ worksheetId }: ReviewersModalProps) => {
    const [allReviewers, setAllReviewers] = React.useState<Record<string, TPhraseADayUser>>({})
    const [selectedReviewers, setSelectedReviewers] = React.useState<string[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const { dispatch } = React.useContext(context)

    const [upsertReview] = useMutation<{ upsertReview: TReview }>(UPSERT_REVIEW)
    useQuery<{ friend: TPhraseADayUser[], review: TReview[] }>(GET_POTENTIAL_REVIEWERS, {
        variables: {
            worksheetId
        },
        fetchPolicy: 'no-cache',
        onCompleted: (data) => {
            const newSelectedReviewers = data.review.map(({ reviewerId }) => reviewerId)
            setSelectedReviewers(newSelectedReviewers)

            const newAllReviewers: Record<string, TPhraseADayUser> = {}
            data.friend.forEach((friend) => {
                newAllReviewers[friend.id] = friend
            })
            setAllReviewers(newAllReviewers)
            setIsLoading(false)
        },
        onError: (error) => {
            logger(JSON.stringify(error))
            dispatch({ type: 'HAS_ERRORED' })
        },
    })

    const handleAddReview = async (reviewerId: string) => {
        const response = await upsertReview({
            variables: {
                id: uuid4(),
                date: dateToString(moment()),
                reviewerId,
                worksheetId,
                status: TReviewStatus.REVIEW_REQUESTED
            }
        })
        if (response.data.upsertReview === null) {
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Failed to add reviewer', timeToLiveMS: 5000 } })
        } else {
            setSelectedReviewers((prev) => ([...prev, reviewerId]))
        }

        setSelectedReviewers((prev) => {
            const modifiedFriends = prev.filter((value) => value !== reviewerId)
            return modifiedFriends
        })
        // setIsLoadingFollowerUpdate(false)
    }

    if (isLoading) return <Loading />

    return (
        <div>
            <Paragraph>To add a new reviewer, navigate to the <StyledNavLink to="/reviewers" text="Reviewers" /> page.</Paragraph>
            <Table.Table>
                <Table.TableHeader>
                    <Table.TableRow>
                        <Table.TableHeaderCell width="20%">Username</Table.TableHeaderCell>
                        <Table.TableHeaderCell style={{ textAlign: 'center' }} width="10%">Action</Table.TableHeaderCell>
                    </Table.TableRow>
                </Table.TableHeader>
                <Table.TableBody>
                    {Object.values(allReviewers)
                        .map(({
                            id, username
                        }) => (
                            <Table.TableRow key={id}>
                                <Table.TableBodyCell><StyledNavLink to={`/profile/${id}`} text={username} /></Table.TableBodyCell>
                                <Table.TableBodyCell>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        {!selectedReviewers.includes(id)
                                            ? (
                                                <Button
                                                    onClick={() => (handleAddReview(id))}
                                                    variation="secondary"
                                                >Add Reviewer
                                                </Button>
                                            ) : (
                                                <Paragraph>Requested</Paragraph>
                                            )}
                                    </div>
                                </Table.TableBodyCell>
                            </Table.TableRow>
                        ))}
                </Table.TableBody>
            </Table.Table>
        </div>
    )
}

type WorksheetTableProps = {
    worksheets: TWorksheet[],
    setWorksheets: React.Dispatch<React.SetStateAction<Record<string, TWorksheet>>>,
    tableType: TWorksheetStatus
}
const WorksheetTable = ({ worksheets, setWorksheets, tableType }: WorksheetTableProps) => {
    const { dispatch } = React.useContext(context)
    const [deleteWorksheet] = useMutation<{ deleteWorksheet: TWorksheet }>(DELETE_WORKSHEET)
    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false)
    const [reviewRequestModal, setReviewRequestModal] = React.useState<{ id?: string, showModal: boolean }>({ showModal: false })

    const confirmDelete = () => {
        setShowDeleteModal(true)
    }

    const titleLookup = {
        [TWorksheetStatus.NEW]: 'Worksheets in Progress',
        [TWorksheetStatus.NEEDS_REVIEW]: 'Worksheets Awaiting Review',
        [TWorksheetStatus.HAS_REVIEWS]: 'Worksheets With Reviews',
    }

    const actionsLookup = ({ id }: { id: string }): JSX.Element[] => {
        return {
            [TWorksheetStatus.NEW]: [
                <Button fullWidth key="edit" variation="secondary" onClick={() => navigate(`/worksheet/edit/${id}`)}>Edit</Button>,
                <Button
                    fullWidth
                    key="request-review"
                    variation="secondary"
                    onClick={() => setReviewRequestModal({ showModal: true, id })}
                >Request Reviews
                </Button>,
                <Button fullWidth key="delete" variation="alert" onClick={() => confirmDelete()}>Delete</Button>
            ],
            [TWorksheetStatus.NEEDS_REVIEW]: [
                <Button
                    fullWidth
                    key="request-review"
                    variation="secondary"
                    onClick={() => setReviewRequestModal({ showModal: true, id })}
                >Request Reviews
                </Button>,
                <Button fullWidth key="delete" variation="alert" onClick={() => confirmDelete()}>Delete</Button>
            ],
            [TWorksheetStatus.HAS_REVIEWS]: [],
        }[tableType]
    }

    const routeLookup = ({ id }: { id: string }): string => {
        return {
            [TWorksheetStatus.NEW]: `/worksheet/${id}`,
            [TWorksheetStatus.NEEDS_REVIEW]: `/worksheet/${id}`,
            [TWorksheetStatus.HAS_REVIEWS]: `/student/review/${id}`,
        }[tableType]
    }

    const handleDelete = async (id: string) => {
        const response = await deleteWorksheet({ variables: { id } })
        if (response.data.deleteWorksheet === null) {
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Failed to delete worksheet', timeToLiveMS: 5000 } })
        } else {
            setWorksheets((prev) => {
                const modifiedWorksheets = { ...prev }
                delete modifiedWorksheets[id]
                return modifiedWorksheets
            })
        }
    }

    return (
        <div>
            <Heading.H3>{titleLookup[tableType]}</Heading.H3>
            <Table.Table>
                <Table.TableHeader>
                    <Table.TableRow>
                        <Table.TableHeaderCell width="20%">Title</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="10%">Created</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="15%">From</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="15%">To</Table.TableHeaderCell>
                        <Table.TableHeaderCell width="30%">Description</Table.TableHeaderCell>
                        <Table.TableHeaderCell style={{ textAlign: 'center' }} width="10%">Actions</Table.TableHeaderCell>
                    </Table.TableRow>
                </Table.TableHeader>
                <Table.TableBody>
                    {worksheets
                        .map(({
                            title, description, id, knownLanguage, newLanguage, date
                        }) => {
                            const actions = actionsLookup({ id })
                            return (
                                <Table.TableRow key={id}>
                                    <Table.TableBodyCell><StyledNavLink to={routeLookup({ id })} text={title} /></Table.TableBodyCell>
                                    <Table.TableBodyCell>{date}</Table.TableBodyCell>
                                    <Table.TableBodyCell>{knownLanguage}</Table.TableBodyCell>
                                    <Table.TableBodyCell>{newLanguage}</Table.TableBodyCell>
                                    <Table.TableBodyCell>{description}</Table.TableBodyCell>
                                    <Table.TableBodyCell>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            {actions.length > 0
                                                ? (
                                                    <>
                                                        <DropdownMenu title="Actions">{actions}</DropdownMenu>
                                                        <Modal
                                                            contentLabel="Delete Worksheet?"
                                                            showModal={showDeleteModal}
                                                            closeModal={() => setShowDeleteModal(false)}
                                                        >
                                                            <>
                                                                <Button
                                                                    variation="secondary"
                                                                    onClick={() => setShowDeleteModal(false)}
                                                                >Cancel
                                                                </Button>
                                                                <Button variation="alert" onClick={() => handleDelete(id)}>Delete it</Button>
                                                            </>
                                                        </Modal>
                                                        <Modal
                                                            contentLabel="Request Reviewers"
                                                            showModal={reviewRequestModal.showModal}
                                                            closeModal={() => setReviewRequestModal({ showModal: false })}
                                                        >
                                                            <ReviewersModal worksheetId={reviewRequestModal.id} />
                                                        </Modal>
                                                    </>
                                                ) : ''}
                                        </div>
                                    </Table.TableBodyCell>
                                </Table.TableRow>
                            )
                        })}
                </Table.TableBody>
            </Table.Table>

        </div>
    )
}

const Worksheets = () => {
    const { state } = React.useContext(context)
    const navigate = useNavigate()
    const [worksheets, setWorksheets] = React.useState<Record<string, TWorksheet>>({})
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const { dispatch } = React.useContext(context)

    useQuery<{ worksheet: TWorksheet[] }>(GET_WORKSHEETS, {
        fetchPolicy: 'no-cache',
        onCompleted: (data) => {
            const newWorksheets: Record<string, TWorksheet> = {}
            data.worksheet.forEach((worksheet) => { newWorksheets[worksheet.id] = worksheet })
            setWorksheets(newWorksheets)
            setIsLoading(false)
        },
        onError: (error) => {
            logger(JSON.stringify(error))
            dispatch({ type: 'HAS_ERRORED' })
        },
    })

    if (isLoading) return <Loading />

    const filterWorksheets = (status: TWorksheetStatus) => Object.values(worksheets)
        .filter((worksheet) => worksheet.status === status && worksheet.userId === state.currentUser.phraseADay.id)

    return (
        <div>
            <Heading.H2>Student Dashboard</Heading.H2>
            <Button variation="primary" onClick={() => navigate('/worksheet/new')}>Add Worksheet</Button>
            <WorksheetTable
                tableType={TWorksheetStatus.NEW}
                setWorksheets={setWorksheets}
                worksheets={filterWorksheets(TWorksheetStatus.NEW)}
            />
            <WorksheetTable
                tableType={TWorksheetStatus.NEEDS_REVIEW}
                setWorksheets={setWorksheets}
                worksheets={filterWorksheets(TWorksheetStatus.NEEDS_REVIEW)}
            />
            <WorksheetTable
                tableType={TWorksheetStatus.HAS_REVIEWS}
                setWorksheets={setWorksheets}
                worksheets={filterWorksheets(TWorksheetStatus.HAS_REVIEWS)}
            />
        </div>
    )
}

const StudentDashboard = () => (
    <div>
        <Worksheets />
    </div>
)

export default StudentDashboard
