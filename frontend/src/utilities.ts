import moment from 'moment'

import { TDateISODate } from 'sharedTypes'

const formatDateDisplayString = (date: TDateISODate | null): string => {
    if (date === null) {
        return ''
    }

    return moment(date).format('dddd MMMM Do YYYY')
}

const formatDateKeyLookup = (date: moment.Moment): TDateISODate => {
    return date.format('YYYY-MM-DD') as TDateISODate
}

const formatDurationDisplayString = (rawMinutes: number) => {
    const hours = Math.floor(rawMinutes / 60)
    const minutes = rawMinutes % 60
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    return `${hours}:${paddedMinutes}`
}


export {
    formatDateDisplayString,
    formatDateKeyLookup,
    formatDurationDisplayString,
}
