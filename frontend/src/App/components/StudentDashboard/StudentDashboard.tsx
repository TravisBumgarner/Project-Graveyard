import React from 'react'
import moment from 'moment'
import Modal from 'react-modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'

import { Loading } from 'sharedComponents'
import {
    Table,
    TableHeader,
    TableBody,
    TableBodyCell,
    TableHeaderCell,
    TableRow,
    H2,
    H3,
    StyledNavLink,
    Button,
    LabelAndInput,
} from '../StyleExploration'
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
    addWorksheet(id: $id, title: $title, description: $description, date: $date, knownLanguage: $knownLanguage, newLanguage: $newLanguage){
      id,
      title,
      description,
      date,
      knownLanguage,
      newLanguage,
      userId
    }
}
`

type AddWorksheetProps = {
    closeModal: () => void
    setWorksheets: React.Dispatch<React.SetStateAction<Record<string, TWorksheet>>>
}

const AddWorksheetModal = ({ closeModal, setWorksheets }: AddWorksheetProps) => {
    const { state, dispatch } = React.useContext(context)
    const [addWorksheet] = useMutation<{ addWorksheet: TWorksheet }>(ADD_WORKSHEET)
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState<string>('')
    const [knownLanguage, setknownLanguage] = React.useState<string>('')
    const [newLanguage, setnewLanguage] = React.useState<string>('')
    // const [date, setDate] = React.useState<moment.Moment>(moment())

    const handleSubmit = async () => {
        if (!title || !description || !knownLanguage || !newLanguage) {
            dispatch({ type: 'ADD_MESSAGE', data: { message: 'Please fully complete the form.' } })
            return
        }

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

        await addWorksheet({
            variables: newWorksheet,
        })
        setWorksheets((prev) => ({ ...prev, [newWorksheet.id]: newWorksheet }))
        closeModal()
    }

    const handleCancel = () => {
        closeModal()
    }

    const handleDelete = () => {
        closeModal()
    }

    return (
        <div>
            <H2>Worksheets</H2>
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
                        label="From Language"
                        name="knowLanguage"
                        value={knownLanguage}
                        handleChange={(data) => setknownLanguage(data)}
                    />
                </div>

                <div>
                    <LabelAndInput
                        label="To Language"
                        name="newLanguage"
                        value={newLanguage}
                        handleChange={(data) => setnewLanguage(data)}
                    />
                </div>
                <Button variation="primary" onClick={handleSubmit}>Submit</Button>
                <Button variation="primary" onClick={handleCancel}>Cancel</Button>
                <Button variation="primary" onClick={handleDelete}>Delete</Button>
            </div>
        </div>
    )
}

type NewTableProps = {
    worksheets: TWorksheet[],
}
const NewTable = ({ worksheets }: NewTableProps) => (
    <div>
        <H3>Worksheets in Progress</H3>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Title</TableHeaderCell>
                    <TableHeaderCell>From</TableHeaderCell>
                    <TableHeaderCell>To</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {worksheets
                    .map(({
                        title, description, id, knownLanguage, newLanguage,
                    }) => (
                        <TableRow key={id}>
                            <TableBodyCell><StyledNavLink to={`/student/worksheet/${id}`} text={title} /></TableBodyCell>
                            <TableBodyCell>{knownLanguage}</TableBodyCell>
                            <TableBodyCell>{newLanguage}</TableBodyCell>
                            <TableBodyCell>{description}</TableBodyCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </div>
)

type NeedsReviewTableProps = {
    worksheets: TWorksheet[],
}
const NeedsReviewTable = ({ worksheets }: NeedsReviewTableProps) => (
    <div>
        <H3>Worksheets Awaiting Review</H3>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Title</TableHeaderCell>
                    <TableHeaderCell>From</TableHeaderCell>
                    <TableHeaderCell>To</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {worksheets
                    .map(({
                        title, description, id, knownLanguage, newLanguage,
                    }) => (
                        <TableRow key={id}>
                            <TableBodyCell><StyledNavLink to={`/student/worksheet/${id}`} text={title} /></TableBodyCell>
                            <TableBodyCell>{knownLanguage}</TableBodyCell>
                            <TableBodyCell>{newLanguage}</TableBodyCell>
                            <TableBodyCell>{description}</TableBodyCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </div>
)

type HasReviewsTableProps = {
    worksheets: TWorksheet[],
}
const HasReviewsTable = ({ worksheets }: HasReviewsTableProps) => (
    <div>
        <H3>Reviewed Worksheets</H3>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Title</TableHeaderCell>
                    <TableHeaderCell>From</TableHeaderCell>
                    <TableHeaderCell>To</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {worksheets
                    .map(({
                        title, description, id, knownLanguage, newLanguage,
                    }) => (
                        <TableRow key={id}>
                            <TableBodyCell><StyledNavLink to={`/student/review/${id}`} text={title} /></TableBodyCell>
                            <TableBodyCell>{knownLanguage}</TableBodyCell>
                            <TableBodyCell>{newLanguage}</TableBodyCell>
                            <TableBodyCell>{description}</TableBodyCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </div>
)

const Worksheets = () => {
    const { state } = React.useContext(context)

    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [worksheets, setWorksheets] = React.useState<Record<string, TWorksheet>>({})
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    useQuery<{ worksheet: TWorksheet[] }>(GET_WORKSHEETS, {
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
            <H2>Worksheets</H2>
            <Button variation="primary" onClick={() => setShowModal(true)}>Add Worksheet</Button>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Add Worksheet"
            >
                <AddWorksheetModal setWorksheets={setWorksheets} closeModal={() => setShowModal(false)} />
            </Modal>
            <NewTable worksheets={filterWorksheets(TWorksheetStatus.NEW)} />
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
