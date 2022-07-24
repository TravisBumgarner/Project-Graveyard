import app from './src/app'

const startup = async () => {
    await app.listen(5001, '0.0.0.0', () => {
        console.log(`App listening at http://0.0.0.0:5001`) // eslint-disable-line
    })
}

startup()
