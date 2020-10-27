// import { w3cwebsocket as W3CWebSocket } from "websocket"

// const client = new W3CWebSocket('ws://127.0.0.1:5000')

// client.onopen = () => {
//     console.log('WebSocket Client Connected')
//     // setIsConnected(true)
// }

// type MessageType = 'chatMessage' | 'paintMessage'

// type Message = {
//     content: any,
//     sender: string,
//     action: MessageType
// }

// // const establishConnection = (setIsConnected) => {
// client.onopen = () => {
//     console.log('WebSocket Client Connected')
//     setIsConnected(true)
// }
// // }

// const sendMessage = ({ content, sender, action }: Message) => {
//     const encodedMessage = JSON.stringify({
//         content,
//         action,
//         sender,
//     })
//     client.send(encodedMessage)
// }

// // const parseMessage = (actionSubscription: MessageType, handleMessage) => () => {
// //     client.onmessage = (message) => {
// //         const decodedMessage = JSON.parse(message.data);
// //         return decodedMessage.action === actionSubscription ? handleMessage(decodedMessage) : null
// //     };
// // }

// export default client