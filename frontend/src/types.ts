enum TWorksheetStatus {
    NEW = 'new',
    NEEDS_REVIEW = 'needs_review',
    HAS_REVIEWS = 'has_reviews'
}

enum TReviewStatus {
    REVIEW_REQUESTED = 'review_requested',
    REVIEW_IN_PROGRESS = 'review_in_progress',
    REVIEW_COMPLETED = 'review_completed'
}

type TWorksheet = {
    id: string
    title: string
    description: string
    date: string
    knownLanguage: string
    newLanguage: string
    userId: string
    status: TWorksheetStatus
}

type TStudentReview = {
    reviewEntryId: string
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
    TWorksheetStatus,
    TReviewStatus
}
