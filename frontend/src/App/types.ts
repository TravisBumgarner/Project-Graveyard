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

type StudentReview = {
    writtenFeedback: string
    oralFeedback: string
    audioUrl: string
    knownLanguageText: string
    newLanguageText: string
}


type WorksheetEntry = {
    id: string,
    worksheetId: string,
    knownLanguageText: string
    newLanguageText: string
    audioUrl: string
}

type PhraseADayUser = {
    id: string
    username: string
}

export {
    Worksheet,
    WorksheetEntry,
    PhraseADayUser,
    StudentReview
}