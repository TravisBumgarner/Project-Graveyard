import React from 'react'
import { useParams } from 'react-router'
import { gql, useQuery } from '@apollo/client'

import { Loading } from 'sharedComponents'
import { context } from '..'
import { StudentWorksheet, ReviewWorksheet } from './components'
import { Exactly } from '../../utilities'

import { TPhraseADayUser } from '../../types'

const GET_WORKSHEETS = gql`
query GetWorksheets($worksheetId: String!) {
    worksheet(worksheetId: $worksheetId) {
        user {
            id
        }
    }
}
`

const Worksheet = () => {
    const { state } = React.useContext(context)
    const { worksheetId } = useParams()
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const [worksheetUserId, setWorksheetUserId] = React.useState<string>(null)
    useQuery<{ worksheet: { user: Exactly<TPhraseADayUser, 'id'> }[] }>(GET_WORKSHEETS, {
        variables: {
            worksheetId
        },
        onCompleted: (data) => {
            setWorksheetUserId(data.worksheet[0].user.id)
            setIsLoading(false)
        },
    })

    if (isLoading) return <Loading />
    return state.currentUser.phraseADay.id === worksheetUserId
        ? <StudentWorksheet />
        : <ReviewWorksheet />
}

export default Worksheet
