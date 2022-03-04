import React from 'react'
import moment from 'moment'
import Modal from 'react-modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { AiOutlineFolder, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import styled from 'styled-components'

import { Table, TableHeader, TableBody, TableBodyCell, TableHeaderCell, TableRow, H2 } from '../StyleExploration'
import { context } from '..'
import { PhraseADayUser, Worksheet } from '../../types'
import { Button, LabelAndInput } from '../StyleExploration'
import { Review } from './components'

const ActionButton = styled.button`
    background-color: transparent;
    border: 0;

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
`;

type AddWorksheetProps = {
    closeModal: () => void
}

const AddWorksheetModal = ({ closeModal }: AddWorksheetProps) => {
    const { state, dispatch } = React.useContext(context)
    const [addWorksheet] = useMutation<{ addWorksheet: Worksheet & { user: PhraseADayUser } }>(ADD_WORKSHEET)
    const [title, setTitle] = React.useState(`Worksheet ${Object.keys(state.worksheets).length + 1}`)
    const [description, setDescription] = React.useState<string>('')
    const [knownLanguage, setknownLanguage] = React.useState<string>('')
    const [newLanguage, setnewLanguage] = React.useState<string>('')
    // const [date, setDate] = React.useState<moment.Moment>(moment())

    const handleSubmit = async () => {
        if (!title || !description || !knownLanguage || !newLanguage) {
            dispatch({ type: "ADD_MESSAGE", data: { message: "Please fully complete the form." } })
            return
        }

        const response = await addWorksheet({
            variables: {
                date: moment(),
                id: uuidv4(),
                description,
                title,
                knownLanguage,
                newLanguage,
                userId: state.currentUser.phraseADay.id
            }
        })

        dispatch({ type: "ADD_WORKSHEET", data: { worksheet: response.data.addWorksheet } })
        closeModal()
    }

    const handleCancel = () => {
        closeModal()
    }

    const handleDelete = () => {
        closeModal()
    }

    return <div>
        <H2>Worksheets</H2>
        <div>
            <div>
                <LabelAndInput label="Title" name="title" value={title} handleChange={title => setTitle(title)} />
            </div>

            <div>
                <LabelAndInput label="Description" name="description" value={description} handleChange={description => setDescription(description)} />
            </div>

            <div>
                <LabelAndInput label="From Language" name="knowLanguage" value={knownLanguage} handleChange={knownLanguage => setknownLanguage(knownLanguage)} />
            </div>

            <div>
                <LabelAndInput label="To Language" name="newLanguage" value={newLanguage} handleChange={newLanguage => setnewLanguage(newLanguage)} />
            </div>
            <Button variation="primary" onClick={handleSubmit}>Submit</Button>
            <Button variation="primary" onClick={handleCancel}>Cancel</Button>
            <Button variation="primary" onClick={handleDelete}>Delete</Button>
        </div>
    </div>
}

const Worksheets = () => {
    const { state, dispatch } = React.useContext(context)

    const [showModal, setShowModal] = React.useState<boolean>(false)
    return (
        <div>
            <H2>Worksheets</H2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Title</TableHeaderCell>
                        <TableHeaderCell>From</TableHeaderCell>
                        <TableHeaderCell>To</TableHeaderCell>
                        <TableHeaderCell>Description</TableHeaderCell>
                        <TableHeaderCell>Actions</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object
                        .values(state.worksheets)
                        .filter(({ userId }) => userId === state.currentUser.phraseADay.id)
                        .map(({ title, description, id, knownLanguage, newLanguage }) => {
                            return (
                                <TableRow key={id}>
                                    <TableBodyCell>{title}</TableBodyCell>
                                    <TableBodyCell>{knownLanguage}</TableBodyCell>
                                    <TableBodyCell>{newLanguage}</TableBodyCell>
                                    <TableBodyCell>{description}</TableBodyCell>
                                    <TableBodyCell>
                                        <ActionButton><Link to={`/worksheet/${id}`}>View</Link></ActionButton>
                                    </TableBodyCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>

            </Table>
            <Button variation="primary" onClick={() => setShowModal(true)}>Add Worksheet</Button>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Add Worksheet"
            >
                <AddWorksheetModal closeModal={() => setShowModal(false)} />
            </Modal>

        </div>
    )
}

const UserDashboard = () => {
    return (
        <div>
            <Worksheets />
            <Review worksheetId={'e2856a2a-14a0-4998-b58b-dd733f42e76e'} />
        </div>
    )
}

export default UserDashboard