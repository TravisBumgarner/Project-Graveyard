import React from 'react'
import moment from 'moment'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router'

import { Loading, Button, Heading, Paragraph, Table, Breadcrumbs } from 'sharedComponents'
import { dateToString } from 'utilities'
import { TWorksheet, TWorksheetEntry, TWorksheetStatus } from 'types'

const GET_WORKSHEET_AND_WORKSHEET_ENTRIES = gql`
query GetWorksheets($worksheetId: String) {
  worksheet(worksheetId: $worksheetId) {
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
  worksheetEntries(worksheetId: $worksheetId) {
   id,
   knownLanguageText,
   newLanguageText,
   audioUrl, 
  }

}
`

const EDIT_WORKSHEET = gql`

mutation editWorksheet (
    $id: String!
    $status: String!
  ) {
    editWorksheet(
        id: $id,
        status: $status,
    ){
      id,
      status
    }
}
`

const DELETE_WORKSHEET_ENTRY = gql`
mutation DeleteWorksheetEntry (
    $id: String!
  ) {
    deleteWorksheetEntry(id: $id){
      id,
    }
}
`

type WorksheetEntryProps = {
    worksheetEntry: TWorksheetEntry
    worksheetStatus: TWorksheetStatus
    worksheetEntries: TWorksheetEntry[]
    setWorksheetEntries: React.Dispatch<React.SetStateAction<TWorksheetEntry[]>>
    worksheet: TWorksheet
}
const WorksheetEntry = ({
    worksheetEntry, worksheetStatus, worksheetEntries, setWorksheetEntries, worksheet
}: WorksheetEntryProps) => {
    const navigate = useNavigate()

    const {
        id, knownLanguageText, newLanguageText, audioUrl,
    } = worksheetEntry

    const [deleteWorksheetEntry] = useMutation<{ addWorksheetEntry: TWorksheetEntry }>(DELETE_WORKSHEET_ENTRY)

    const handleDelete = async () => {
        const modifiedWorksheetEntries = worksheetEntries.filter((worksheet) => worksheet.id !== id)

        await deleteWorksheetEntry({ variables: { id } })
        setWorksheetEntries(modifiedWorksheetEntries)
    }

    const Actions: JSX.Element[] = []

    if (worksheetStatus === TWorksheetStatus.NEW) {
        Actions.push(<Button key="edit" variation="secondary" onClick={() => navigate(`/worksheet/${worksheet.id}/${id}/edit`)}>Edit</Button>)
        Actions.push(<Button key="delete" variation="alert" onClick={handleDelete}>Delete</Button>)
    }

    return (
        <Table.TableRow key={id}>
            <Table.TableBodyCell>{knownLanguageText}</Table.TableBodyCell>
            <Table.TableBodyCell>{newLanguageText}</Table.TableBodyCell>
            <Table.TableBodyCell><audio controls src={audioUrl} /></Table.TableBodyCell>
            {Actions.length ? (
                <Table.TableBodyCell>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {Actions}
                    </div>
                </Table.TableBodyCell>
            ) : null}
        </Table.TableRow>
    )
}

const Worksheet = () => {
    const { worksheetId } = useParams()
    const [worksheet, setWorksheet] = React.useState<TWorksheet>()
    const [worksheetEntries, setWorksheetEntries] = React.useState<TWorksheetEntry[]>()
    const navigate = useNavigate()
    const [editWorksheet] = useMutation<{ editWorksheet: { status: TWorksheetStatus, id: string } }>(EDIT_WORKSHEET)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    useQuery<{ worksheet: TWorksheet[], worksheetEntries: TWorksheetEntry[] }>(GET_WORKSHEET_AND_WORKSHEET_ENTRIES, {
        variables: {
            worksheetId
        },
        onCompleted: (data) => {
            setWorksheet(data.worksheet[0])
            setWorksheetEntries(data.worksheetEntries)
            setIsLoading(false)
        },
    })

    if (isLoading) return <Loading />

    const { title, description, date, id } = worksheet

    const handleSubmit = async () => {
        await editWorksheet({ variables: { status: TWorksheetStatus.NEEDS_REVIEW, id: worksheetId } })
        navigate('/student/dashboard')
    }

    return (
        <div>
            <div>
                <Heading.H2><Breadcrumbs breadcrumbs={[{ to: '/student/dashboard', text: 'Student Dashboard' }]} /> {title} Worksheet</Heading.H2>
                <Paragraph>
                    Description: {description}
                </Paragraph>
                <Paragraph>
                    Date: {dateToString(moment(date))}
                </Paragraph>
                <Button variation="secondary" onClick={() => navigate(`/worksheet/${id}/add`)}>Add Entries</Button>
                <Table.Table>
                    <Table.TableHeader>
                        <Table.TableRow>
                            <Table.TableHeaderCell width="35%" scope="col">{worksheet.knownLanguage}</Table.TableHeaderCell>
                            <Table.TableHeaderCell width="35%" scope="col">{worksheet.newLanguage}</Table.TableHeaderCell>
                            <Table.TableHeaderCell width="20%" scope="col" style={{ textAlign: 'center' }}>Recorded</Table.TableHeaderCell>
                            {worksheet.status === TWorksheetStatus.NEW
                                ? (<Table.TableHeaderCell style={{ textAlign: 'center' }} width="10%" scope="col">Actions</Table.TableHeaderCell>)
                                : null}
                        </Table.TableRow>
                    </Table.TableHeader>
                    <Table.TableBody>
                        {worksheetEntries.map((worksheetEntry) => (
                            <WorksheetEntry
                                worksheetEntries={worksheetEntries}
                                setWorksheetEntries={setWorksheetEntries}
                                key={worksheetEntry.id}
                                worksheetStatus={worksheet.status}
                                worksheetEntry={worksheetEntry}
                                worksheet={worksheet}
                            />
                        ))}
                    </Table.TableBody>
                </Table.Table>
            </div>
            <Button disabled={worksheetEntries.length === 0} variation="secondary" onClick={handleSubmit}>Submit for Feedback</Button>
        </div>
    )
}

export default Worksheet
