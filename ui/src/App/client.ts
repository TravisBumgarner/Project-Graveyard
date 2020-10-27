import { w3cwebsocket as W3CWebSocket } from "websocket"

const client = new W3CWebSocket('ws://127.0.0.1:5000')

type MessageType = 'chatMessage' | 'paintMessage'

type Message = {
    content: any,
    sender: string,
    messageType: MessageType
}

const establishConnection = (setIsConnected) => {
    client.onopen = () => {
        console.log('WebSocket Client Connected')
        setIsConnected(true)
    }
}

const sendMessage = ({ content, sender, messageType }: Message) => {
    client.send(JSON.stringify({
        content,
        sender,
        messageType
    }))
}

const parseMessage = (messageTypeSubscription: MessageType, handleMessage) => {
    return client.onmessage = (message) => {
        const { messageType }: Message = JSON.parse(message.data);

        return messageType === messageTypeSubscription ? handleMessage(message) : null
    };
}

export { parseMessage, sendMessage, establishConnection }