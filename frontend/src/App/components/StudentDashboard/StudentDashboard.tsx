import React from 'react'
import moment from 'moment'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'

import { Loading, Table, Heading, StyledNavLink, Button, Modal, LabelAndInput, } from 'sharedComponents'
import { context } from '..'
import { TWorksheetStatus, TWorksheet } from '../../types'

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

const ADD_WORKSHEET = gql`
mutation AddWorksheet (
    $title: String!
    $description: String!,
    $id: String!
    $date: String!
    $knownLanguage: String!
    $newLanguage: String!
  ) {
    addWorksheet(
        id: $id,
        title: $title,
        description: $description,
        date: $date,
        knownLanguage: $knownLanguage,
        newLanguage: $newLanguage,
        status: "${TWorksheetStatus.NEW}"){
      id
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

type AddWorksheetProps = {
    closeModal: () => void
    setWorksheets: React.Dispatch<React.SetStateAction<Record<string,
        TWorksheet>>>
}

const AddWorksheetModal = ({ closeModal, setWorksheets }: AddWorksheetProps) => {
    const { state, dispatch } = React.useContext(context)
    const [addWorksheet] = useMutation<{ addWorksheet: TWorksheet }>(ADD_WORKSHEET)
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState<string>('')
    const [knownLanguage, setknownLanguage] = React.useState<string>('')
    const [newLanguage, setnewLanguage] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const handleSubmit = async () => {
        if (!title || !description || !knownLanguage || !newLanguage) {
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Please fully complete the form.' } })
            return
        }
        setIsLoading(true)

        const newWorksheet: TWorksheet = {
            date: moment(),
            id: uuidv4(),
            description,
            title,
            knownLanguage,
            newLanguage,
            status: TWorksheetStatus.NEW,
            userId: state.currentUser.phraseADay.id,
        }
        const response = await addWorksheet({
            variables: newWorksheet,
        })
        if (response.data.addWorksheet === null) {
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Failed to submit worksheet', timeToLiveMS: 5000 } })
        } else {
            setWorksheets((prev) => ({ ...prev, [newWorksheet.id]: newWorksheet }))
            closeModal()
        }
        setIsLoading(false)
    }

    const handleCancel = () => {
        closeModal()
    }

    return (
        <div>
            <Heading.H2>Worksheets</Heading.H2>
            <div>
                <div>
                    <LabelAndInput label="Title" name="title" value={title} handleChange={(data) => setTitle(data)} />
                </div>

                <div>
                    <LabelAndInput
                        label="Description"
                        name="description"
                        value={description}
                        handleChange={(data) => setDescription(data)}
                    />
                </div>

                <div>
                    <LabelAndInput
                        label="Language you're learning:"
                        name="newLanguage"
                        value={newLanguage}
                        handleChange={(data) => setnewLanguage(data)}
                    />
                </div>

                <div>
                    <LabelAndInput
                        label="Language your'e starting from:"
                        name="knowLanguage"
                        value={knownLanguage}
                        handleChange={(data) => setknownLanguage(data)}
                    />
                </div>
                <Button disabled={isLoading} variation="secondary" onClick={handleSubmit}>Submit</Button>
                <Button disabled={isLoading} variation="alert" onClick={handleCancel}>Cancel</Button>
            </div>
        </div>
    )
}

type NewTableProps = {
    worksheets: TWorksheet[],
    setWorksheets: React.Dispatch<React.SetStateAction<Record<string, TWorksheet>>>
}
const NewTable = ({ worksheets, setWorksheets }: NewTableProps) => {
    const { dispatch } = React.useContext(context)
    const [deleteWorksheet] = useMutation<{ deleteWorksheet: TWorksheet }>(DELETE_WORKSHEET)

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
                            <Table.TableRow key={id}>
                                <Table.TableBodyCell><StyledNavLink to={`/student/worksheet/${id}`} text={title} /></Table.TableBodyCell>
                                <Table.TableBodyCell>{date}</Table.TableBodyCell>
                                <Table.TableBodyCell>{knownLanguage}</Table.TableBodyCell>
                                <Table.TableBodyCell>{newLanguage}</Table.TableBodyCell>
                                <Table.TableBodyCell>{description}</Table.TableBodyCell>
                                <Table.TableBodyCell>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button key="delete" variation="secondary" onClick={() => handleDelete(id)}>Delete</Button>
                                    </div>
                                </Table.TableBodyCell>
                            </Table.TableRow>
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

    const [showModal, setShowModal] = React.useState<boolean>(false)
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
            <Button variation="primary" onClick={() => setShowModal(true)}>Add Worksheet</Button>
            <Modal
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                contentLabel="Add Worksheet"
            >
                <AddWorksheetModal setWorksheets={setWorksheets} closeModal={() => setShowModal(false)} />
            </Modal>
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
