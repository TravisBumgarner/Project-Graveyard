import React from 'react'
import moment from 'moment'

import { TDateISODate } from 'sharedTypes'
import { formatDateDisplayString, formatDateKeyLookup } from 'utilities'
import { PageHeader, Button, Heading } from 'sharedComponents'

const Today = () => {
    const [selectedDate, setSelectedDate] = React.useState<TDateISODate>(formatDateKeyLookup(moment()))

    const setPreviousDate = () => {
        setSelectedDate(formatDateKeyLookup(moment(selectedDate).subtract(1, 'day')))
    }

    const getNextDate = () => {
        setSelectedDate(formatDateKeyLookup(moment(selectedDate).add(1, 'day')))
    }

    const getToday = () => {
        setSelectedDate(formatDateKeyLookup(moment()))
    }

    return (
        <div>
            <PageHeader>
                <Heading.H2>{formatDateDisplayString(selectedDate)}</Heading.H2>
                <Button key="today" onClick={getToday} variation="INTERACTION">Today</Button>
                <Button key="previous" onClick={setPreviousDate} variation="INTERACTION">&lt;</Button>
                <Button key="next" onClick={getNextDate} variation="INTERACTION">&gt;</Button>
            </PageHeader>
        </div>
    )
}

export default Today
