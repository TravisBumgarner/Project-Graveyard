const dateToString = (key: moment.Moment) => {
    return key.toISOString().split('T')[0]
}

export {
    dateToString
}