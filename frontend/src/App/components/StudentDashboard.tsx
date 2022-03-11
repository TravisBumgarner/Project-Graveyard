import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'

import { Loading, Table, Heading, StyledNavLink, Button, Modal } from 'sharedComponents'
import { TWorksheetStatus, TWorksheet } from 'types'
import { context } from 'context'
import { useNavigate } from 'react-router'

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

type NewTableProps = {
    worksheets: TWorksheet[],
    setWorksheets: React.Dispatch<React.SetStateAction<Record<string, TWorksheet>>>
}
const NewTable = ({ worksheets, setWorksheets }: NewTableProps) => {
    const { dispatch } = React.useContext(context)
    const [deleteWorksheet] = useMutation<{ deleteWorksheet: TWorksheet }>(DELETE_WORKSHEET)
    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false)

    const confirmDelete = () => {
        setShowDeleteModal(true)
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
            <Heading.H3>Worksheets in Progress</Heading.H3>
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
                        }) => (
                            <>
                                <Modal
                                    contentLabel="Delete Worksheet"
                                    showModal={showDeleteModal}
                                    closeModal={() => setShowDeleteModal(false)}
                                >
                                    <>
                                        <Button variation="alert" onClick={() => handleDelete(id)}>Delete it</Button>
                                        <Button variation="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                                    </>
                                </Modal>
                                <Table.TableRow key={id}>
                                    <Table.TableBodyCell><StyledNavLink to={`/worksheet/${id}`} text={title} /></Table.TableBodyCell>
                                    <Table.TableBodyCell>{date}</Table.TableBodyCell>
                                    <Table.TableBodyCell>{knownLanguage}</Table.TableBodyCell>
                                    <Table.TableBodyCell>{newLanguage}</Table.TableBodyCell>
                                    <Table.TableBodyCell>{description}</Table.TableBodyCell>
                                    <Table.TableBodyCell>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button key="edit" variation="secondary" onClick={() => navigate(`/worksheet/edit/${id}`)}>Edit</Button>
                                            <Button key="delete" variation="alert" onClick={() => confirmDelete()}>Delete</Button>
                                        </div>
                                    </Table.TableBodyCell>
                                </Table.TableRow>
                            </>
                        ))}
                </Table.TableBody>
            </Table.Table>

        </div>
    )
}

type NeedsReviewTableProps = {
    worksheets: TWorksheet[],
}
const NeedsReviewTable = ({ worksheets }: NeedsReviewTableProps) => (
    <div>
        <Heading.H3>Worksheets Awaiting Review</Heading.H3>
        <Table.Table>
            <Table.TableHeader>
                <Table.TableRow>
                    <Table.TableHeaderCell width="20%">Title</Table.TableHeaderCell>
                    <Table.TableHeaderCell width="10%">Created</Table.TableHeaderCell>
                    <Table.TableHeaderCell width="15%">From</Table.TableHeaderCell>
                    <Table.TableHeaderCell width="15%">To</Table.TableHeaderCell>
                    <Table.TableHeaderCell width="30%">Description</Table.TableHeaderCell>
                    <Table.TableHeaderCell width="10%" />
                </Table.TableRow>
            </Table.TableHeader>
            <Table.TableBody>
                {worksheets
                    .map(({
                        title, description, id, knownLanguage, newLanguage, date
                    }) => (
                        <Table.TableRow key={id}>
                            <Table.TableBodyCell><StyledNavLink to={`/student/worksheet/${id}`} text={title} /></Table.TableBodyCell>
                            <Table.TableBodyCell>{date}</Table.TableBodyCell>
                            <Table.TableBodyCell>{knownLanguage}</Table.TableBodyCell>
                            <Table.TableBodyCell>{newLanguage}</Table.TableBodyCell>
                            <Table.TableBodyCell>{description}</Table.TableBodyCell>
                        </Table.TableRow>
                    ))}
            </Table.TableBody>
        </Table.Table>
    </div>
)

type HasReviewsTableProps = {
    worksheets: TWorksheet[],
}
const HasReviewsTable = ({ worksheets }: HasReviewsTableProps) => (
    <div>
        <Heading.H3>Reviewed Worksheets</Heading.H3>
        <Table.Table>
            <Table.TableHeader>
                <Table.TableRow>
                    <Table.TableHeaderCell width="20%">Title</Table.TableHeaderCell>
                    <Table.TableHeaderCell width="10%">Created</Table.TableHeaderCell>
                    <Table.TableHeaderCell width="15%">From</Table.TableHeaderCell>
                    <Table.TableHeaderCell width="15%">To</Table.TableHeaderCell>
                    <Table.TableHeaderCell width="30%">Description</Table.TableHeaderCell>
                    <Table.TableHeaderCell width="10%" />
                </Table.TableRow>
            </Table.TableHeader>
            <Table.TableBody>
                {worksheets
                    .map(({
                        title, description, id, knownLanguage, newLanguage, date
                    }) => (
                        <Table.TableRow key={id}>
                            <Table.TableBodyCell><StyledNavLink to={`/student/review/${id}`} text={title} /></Table.TableBodyCell>
                            <Table.TableBodyCell>{date}</Table.TableBodyCell>
                            <Table.TableBodyCell>{knownLanguage}</Table.TableBodyCell>
                            <Table.TableBodyCell>{newLanguage}</Table.TableBodyCell>
                            <Table.TableBodyCell>{description}</Table.TableBodyCell>
                        </Table.TableRow>
                    ))}
            </Table.TableBody>
        </Table.Table>
    </div>
)

const Worksheets = () => {
    const { state } = React.useContext(context)
    const navigate = useNavigate()
    const [worksheets, setWorksheets] = React.useState<Record<string, TWorksheet>>({})
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    useQuery<{ worksheet: TWorksheet[] }>(GET_WORKSHEETS, {
        fetchPolicy: 'no-cache',
        onCompleted: (data) => {
            const newWorksheets: Record<string, TWorksheet> = {}
            data.worksheet.forEach((worksheet) => { newWorksheets[worksheet.id] = worksheet })
            setWorksheets(newWorksheets)
            setIsLoading(false)
        },
    })

    if (isLoading) return <Loading />

    const filterWorksheets = (status: TWorksheetStatus) => Object.values(worksheets)
        .filter((worksheet) => worksheet.status === status && worksheet.userId === state.currentUser.phraseADay.id)

    return (
        <div>
            <Heading.H2>Student Dashboard</Heading.H2>
            <Button variation="primary" onClick={() => navigate('/worksheet/new')}>Add Worksheet</Button>
            <NewTable setWorksheets={setWorksheets} worksheets={filterWorksheets(TWorksheetStatus.NEW)} />
            <NeedsReviewTable worksheets={filterWorksheets(TWorksheetStatus.NEEDS_REVIEW)} />
            <HasReviewsTable worksheets={filterWorksheets(TWorksheetStatus.HAS_REVIEWS)} />
        </div>
    )
}

const StudentDashboard = () => (
    <div>
        <Worksheets />
    </div>
)

export default StudentDashboard
