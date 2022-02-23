import { String, Record, Number } from 'runtypes'

const Env = Record({
    nodeEnv: String,
    postgres: Record({
        host: String,
        port: Number,
        username: String,
        password: String,
        database: String,
    })
})
const getEnv = () => {
    const env = {
        postgres: {
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORTNAME || ''),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
        }
    }
    try {
        return Env.check(env)
    } catch (error) {
        throw Error('Invalil project config' + JSON.stringify(process.env))
    }
}

export default getEnv