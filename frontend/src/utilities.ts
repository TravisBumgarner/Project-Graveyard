import moment from 'moment'

const dateToString = (key: moment.Moment) => key.toISOString().split('T')[0]

type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>
type Exactly<T, K extends keyof T> = Pick<T, K>

const logger = (message: any) => {
    console.log(JSON.stringify(message)) // eslint-disable-line
}

const objectUrlToBase64 = async (objectUrl: string) => {
    const blob = await fetch(objectUrl).then((r) => r.blob())
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
    })
}

export {
    dateToString,
    logger,
    AtLeast,
    Exactly,
    objectUrlToBase64
}
