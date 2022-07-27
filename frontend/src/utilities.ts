import moment from 'moment'

import { TDateISODate } from 'sharedTypes'

const formatDateDisplayString = (date: TDateISODate | null): string => {
    if (date === null) {
        return ''
    }

    return moment(date).format('dddd MMMM Do YYYY')
}



const formatDurationDisplayString = (rawMinutes: number) => {
    const hours = Math.floor(rawMinutes / 60)
    const minutes = rawMinutes % 60
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    return `${hours}:${paddedMinutes}`
}

const logger = (message: any) => {
    // if (__LOGGING_LEVEL__ === 'sentry') {
    //     Sentry.captureException(JSON.stringify(message))
    // }
    console.log(JSON.stringify(message)) // eslint-disable-line
}

export {
    formatDateDisplayString,
    formatDateKeyLookup,
    formatDurationDisplayString,
    logger
}
