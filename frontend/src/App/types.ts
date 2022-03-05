import moment from 'moment'

enum TWorksheetStatus {
    NEW = "new",
    NEEDS_REVIEW = "needs_review",
    HAS_REVIEWS = "has_reviews"
}


type TWorksheet = {
    id: string
    title: string
    description: string
    date: moment.Moment
    knownLanguage: string
    newLanguage: string
    userId: string
    status: TWorksheetStatus
}

type TStudentReview = {
    writtenFeedback: string
    oralFeedback: string
    audioUrl: string
    knownLanguageText: string
    newLanguageText: string
}


type TWorksheetEntry = {
    id: string,
    worksheetId: string,
    knownLanguageText: string
    newLanguageText: string
    audioUrl: string
}

type TPhraseADayUser = {
    id: string
    username: string
}


export {
    TWorksheet,
    TWorksheetEntry,
    TPhraseADayUser,
    TStudentReview,
    TWorksheetStatus
}