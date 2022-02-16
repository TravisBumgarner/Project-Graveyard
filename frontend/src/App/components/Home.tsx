import * as React from 'react'
import moment from 'moment'
import Modal from 'react-modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'

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
      newLanguage
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
        const response = await addWorksheet({
            variables: {
                date,
                id: uuidv4(),
                description,
                title,
                knownLanguage,
                newLanguage
            }
        })
        console.log('handlesiubmit', response.data.addWorksheet)
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
                <input name="title" value={title} onChange={event => setTitle(event.target.value)} />
            </div>

            <div>
                <label htmlFor="goal">Goal: </label>
                <input name="goal" value={description} onChange={event => setDescription(event.target.value)} />
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
            <ul>
                {Object.values(state.worksheets).map(({ title, description, id, knownLanguage, newLanguage }) => <li key={id}><a href={`/worksheet/${id}`}>{title} - {description} - {knownLanguage} - {newLanguage}</a></li>)}
            </ul>
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