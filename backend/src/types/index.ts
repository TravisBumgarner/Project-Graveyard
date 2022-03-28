type TContext = {
    authenticatedUserId: string | null
}

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

type TReview = {
    id: string
    reviewerId: string
    worksheetId: string
    date: string
    status: TReviewStatus
}

export {
    TContext,
    TWorksheetStatus,
    TReviewStatus,
    TReview
}
