import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useNavigate } from 'react-router'

import { Loading, Table, Heading, StyledNavLink, Button, Modal, DropdownMenu } from 'sharedComponents'
import { TWorksheetStatus, TWorksheet } from 'types'
import { context } from 'context'

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

    const confirmDelete = () => {
        setShowDeleteModal(true)
    }

    const titleLookup = {
        [TWorksheetStatus.NEW]: 'Worksheets in Progress',
        [TWorksheetStatus.NEEDS_REVIEW]: 'Worksheets Awaiting Review',
        [TWorksheetStatus.HAS_REVIEWS]: 'Worksheets With Reviews',
    }

    const actionsLookup = ({ id }: {
        id: string
    }) => {
        return {
            [TWorksheetStatus.NEW]: [
                <Button fullWidth key="edit" variation="secondary" onClick={() => navigate(`/worksheet/edit/${id}`)}>Edit</Button>,
                <Button fullWidth key="request-review" variation="secondary" onClick={() => console.log('requesting review')}>Request Review</Button>,
                <Button fullWidth key="delete" variation="alert" onClick={() => confirmDelete()}>Delete</Button>
            ],
            [TWorksheetStatus.NEEDS_REVIEW]: [
                <Button
                    fullWidth
                    key="request-another-review"
                    variation="secondary"
                    onClick={() => console.log('requesting another review')}
                >Request Another Review
                </Button>,
                <Button fullWidth key="delete" variation="alert" onClick={() => confirmDelete()}>Delete</Button>
            ],
            [TWorksheetStatus.HAS_REVIEWS]: [
                <Button fullWidth key="delete" variation="alert" onClick={() => confirmDelete()}>Delete</Button>
            ],
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
                        }) => (
                            <Table.TableRow key={id}>
                                <Table.TableBodyCell><StyledNavLink to={`/worksheet/${id}`} text={title} /></Table.TableBodyCell>
                                <Table.TableBodyCell>{date}</Table.TableBodyCell>
                                <Table.TableBodyCell>{knownLanguage}</Table.TableBodyCell>
                                <Table.TableBodyCell>{newLanguage}</Table.TableBodyCell>
                                <Table.TableBodyCell>{description}</Table.TableBodyCell>
                                <Table.TableBodyCell>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <DropdownMenu title="Actions">{actionsLookup({ id })}</DropdownMenu>
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
