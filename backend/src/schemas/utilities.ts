const shouldPermit = (context) => {
    if (process.env.NODE_ENV === 'development') return true
    if (!context.currentUser) return null
}

export {
    shouldPermit
}