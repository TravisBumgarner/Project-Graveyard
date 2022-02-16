import moment from 'moment'

type Worksheet = {
    id: string
    title: string
    description: string
    date: moment.Moment
}

type WorksheetEntry = {
    id: string,
    worksheetId: string,
    text: string
}

export {
    Worksheet,
    WorksheetEntry
}