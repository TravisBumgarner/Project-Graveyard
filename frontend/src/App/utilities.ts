import moment from 'moment'

const dateToString = (key: moment.Moment) => key.toISOString().split('T')[0]

const logger = (message: any) => {
    console.log(JSON.stringify(message)) // eslint-disable-line
}

export default {
    dateToString,
    logger,
}
