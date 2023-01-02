import Sentry from '@sentry/node'

type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>
type Exactly<T, K extends keyof T> = Pick<T, K>

const isUUID = (str: string) => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    return regexExp.test(str)
}

const logger = (message: any) => {
    if (process.env.NODE_ENV !== 'local') {
        Sentry.captureException(JSON.stringify(message))
    }
    console.log(JSON.stringify(message)) // eslint-disable-line
}

export {
    AtLeast,
    Exactly,
    isUUID,
    logger
}
