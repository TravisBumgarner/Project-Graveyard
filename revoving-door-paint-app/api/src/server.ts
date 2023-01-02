import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

const app = express()
const pixels = [0, 0, 0]

//initialize a simple http server
const server = http.createServer(app)

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server })

interface ExtWebSocket extends WebSocket {
    isAlive: boolean
}

wss.on('connection', (ws: WebSocket) => {
    const extWs = ws as ExtWebSocket
    extWs.isAlive = true
    ws.on('pong', () => { extWs.isAlive = true })

    ws.on('message', (msg: string) => {
        console.log(pixels)
        const action = JSON.parse(msg)
        if (action.type === 'SET_PIXEL') {
            pixels[action.pixel] = action.value
        }

        setTimeout(() => {
            wss.clients
                .forEach(client => {
                    client.send(msg)
                })
        }, 1000)
    })

    ws.send(JSON.stringify({ type: 'SETUP_PIXELS', pixels }))

    ws.on('error', (err) => {
        console.warn(`Client disconnected - reason: ${err}`)
    })
})

setInterval(() => {
    wss.clients.forEach((ws: WebSocket) => {

        const extWs = ws as ExtWebSocket

        if (!extWs.isAlive) return ws.terminate()

        extWs.isAlive = false
        ws.ping(null, undefined)
    })
}, 10000)

//start our server
server.listen(5000, () => {
    console.log(`Server started on port 5000`)
})