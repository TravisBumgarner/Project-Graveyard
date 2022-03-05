type Context = {
    authenticatedUserId: string | null
}

enum WorksheetStatus {
    NEW = 'new',
    NEEDS_REVIEW = 'needs_review',
    HAS_REVIEWS = 'has_reviews'
}

export {
  Context,
  WorksheetStatus,
};
