if (!process.env.NODE_ENV) {
    throw Error("NODE_ENV is not defined, received:")
}
import { String, Record, Number, Static } from 'runtypes'
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const Env = Record({
    nodeEnv: String,
    postgres: Record({
        hostname: String,
        port: Number,
        username: String,
        password: String,
        database: String,
    })
})
const getEnv = () => {
    const env = {
        nodeEnv: process.env.NODE_ENV,
        postgres: {
            hostname: process.env.POSTGRES_HOSTNAME,
            port: parseInt(process.env.POSTGRES_PORTNAME || ''),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
        }
    }
    try {
        return Env.check(env)
    } catch (error) {
        throw Error('Invalilid project config')
    }
}

const config = getEnv()

export default config