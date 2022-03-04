import { String, Record, Number } from 'runtypes'
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const Env = Record({
    expressPort: Number,
    postgres: Record({
        host: String,
        port: Number,
        username: String,
        password: String,
        database: String,
    }),
    cloudinary: Record({
        cloud_name: String,
        api_key: String,
        api_secret: String,
        directory: String
    })
})

const getEnv = () => {
    const env = {
        expressPort: parseInt(process.env.EXPRESS_PORT || ''),
        postgres: {
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORTNAME || ''),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
        },
        cloudinary: {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            directory: process.env.CLOUDINARY_DIRECTORY
        }
    }
    try {
        return Env.check(env)
    } catch (error) {
        console.log(config, process.env.NODE_ENV)
        throw Error('Invalid project config')
    }
}

const config = getEnv()

export default config