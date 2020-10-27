import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

const app = express()

//initialize a simple http server
const server = http.createServer(app)

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server })

interface ExtWebSocket extends WebSocket {
    isAlive: boolean
}

function createMessage(content: string, sender: string): string {
    return JSON.stringify(new Message(content, sender))
}

export class Message {
    constructor(
        public content: string,
        public sender: string
    ) { }
}

wss.on('connection', (ws: WebSocket) => {

    const extWs = ws as ExtWebSocket

    extWs.isAlive = true

    ws.on('pong', () => {
        extWs.isAlive = true
    })

    //connection is up, let's add a simple simple event
    ws.on('message', (msg: string) => {

        const message = JSON.parse(msg) as Message
        console.log(message)
        setTimeout(() => {
            wss.clients
                .forEach(client => {
                    client.send(createMessage(message.content, message.sender))
                })
        }, 1000)

    })

    //send immediatly a feedback to the incoming connection    
    ws.send(createMessage('Connected', 'Server'))

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