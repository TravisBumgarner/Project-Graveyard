import React from 'react'
import moment from 'moment'
import Modal from 'react-modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'

import { context } from '.'
import { Worksheet } from '../types'
import { dateToString } from '../utilities'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

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
    const [addWorksheet] = useMutation<{ addWorksheet: Worksheet }>(ADD_WORKSHEET)
    const [title, setTitle] = React.useState(`Worksheet ${Object.keys(state.worksheets).length + 1}`)
    const [description, setDescription] = React.useState<string>('')
    const [knownLanguage, setknownLanguage] = React.useState<string>('')
    const [newLanguage, setnewLanguage] = React.useState<string>('')
    const [date, setDate] = React.useState<moment.Moment>(moment())

    const handleSubmit = async () => {
        if (!title || !description || !knownLanguage || !newLanguage || !date) {
            dispatch({ type: "ADD_MESSAGE", data: { message: "Please fully complete the form." } })
            return
        }

        const response = await addWorksheet({
            variables: {
                date,
                id: uuidv4(),
                description,
                title,
                knownLanguage,
                newLanguage,
                userId: state.currentUser.panda.id
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
        <h1>Worksheets</h1>
        <div>
            <div>
                <label htmlFor="title">Title: </label>
                <input autoComplete='off' name="title" value={title} onChange={event => setTitle(event.target.value)} />
            </div>

            <div>
                <label htmlFor="description">Description: </label>
                <input autoComplete='off' name="description" value={description} onChange={event => setDescription(event.target.value)} />
            </div>

            <div>
                <label htmlFor="knownLanguage">What language are translating from?</label>
                <input name="knownLanguage" value={knownLanguage} onChange={event => setknownLanguage(event.target.value)} />
            </div>

            <div>
                <label htmlFor="newLanguage">What language are you translating to?</label>
                <input name="newLanguage" value={newLanguage} onChange={event => setnewLanguage(event.target.value)} />
            </div>

            <div>
                <label htmlFor="date">Date: </label>
                <input type="date" name="date" value={dateToString(date)} onChange={event => setDate(moment(event.target.value))} />
            </div>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    </div>
}

const Worksheets = () => {
    const { state, dispatch } = React.useContext(context)

    const [showModal, setShowModal] = React.useState<boolean>(false)
    return (
        <div>
            <h1>Worksheets</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Object
                        .values(state.worksheets)
                        .filter(({ userId }) => userId === state.currentUser.panda.id)
                        .map(({ title, description, id, knownLanguage, newLanguage }) => {
                            return (
                                <tr key={id}>
                                    <td>{title}</td>
                                    <td>{knownLanguage}</td>
                                    <td>{newLanguage}</td>
                                    <td>{description}</td>
                                    <td>
                                        <Link to={`/worksheet/${id}`}>View</Link>
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
            <button onClick={() => setShowModal(true)}>Add Worksheet</button>
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

export default Worksheets