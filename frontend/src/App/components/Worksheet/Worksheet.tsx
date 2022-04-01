import React from 'react'
import { useParams } from 'react-router'
import { gql, useQuery } from '@apollo/client'

import { Loading } from 'sharedComponents'
import { Exactly, logger } from 'utilities'
import { TPhraseADayUser } from 'types'
import { context } from '..'
import { StudentWorksheet, ReviewWorksheet } from './components'

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
    const { state, dispatch } = React.useContext(context)
    const { worksheetId } = useParams()
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const [worksheetUserId, setWorksheetUserId] = React.useState<string>(null)
    console.log('worksheetid', worksheetId)
    useQuery<{ worksheet: { user: Exactly<TPhraseADayUser, 'id'> }[] }>(GET_WORKSHEETS, {
        variables: {
            worksheetId
        },
        onCompleted: (data) => {
            console.log('worksheet', data)
            setWorksheetUserId(data.worksheet[0].user.id)
            setIsLoading(false)
        },
        onError: (error) => {
            logger(JSON.stringify(error))
            dispatch({ type: 'HAS_ERRORED' })
        },
    })

    if (isLoading) return <Loading />
    return state.currentUser.phraseADay.id === worksheetUserId
        ? <StudentWorksheet />
        : <ReviewWorksheet />
}

export default Worksheet
