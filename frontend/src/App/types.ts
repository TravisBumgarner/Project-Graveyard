import moment from 'moment'

type Worksheet = {
    id: string
    title: string
    description: string
    date: moment.Moment
    knownLanguage: string
    newLanguage: string
    userId: string
}

type WorksheetEntry = {
    id: string,
    worksheetId: string,
    knownLanguageText: string
    newLanguageText: string
}

type PandaAppUser = {
    id: string
    userName: string
}

export {
    Worksheet,
    WorksheetEntry,
    PandaAppUser
}