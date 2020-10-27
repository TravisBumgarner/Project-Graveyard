import * as React from 'react'
import styled from 'styled-components'

const ChatBoxWrapper = styled.div`
display: flex;
`

const ChatBox = styled.input`
box-sizing: border-box;
flex-grow: 1;
`

const ChatboxSubmit = styled.button``

const ChatMessage = styled.div`
`

const ReceivedMessages = styled.div`
    width: 100%;
    flex-grow: 1;
    background-color: rgba(0,0,0,0.2);
`

const Chat = ({ client, user }) => {
    const [messagesReceived, setMessagesReceived] = React.useState([])
    const [messageToSend, setMessageToSend] = React.useState('')

    const chatMessages = messagesReceived.map(({ content, sender }, index) => {
        return <ChatMessage key={index}><strong>{sender}</strong>: {content}</ChatMessage>
    })

    const submit = () => {
        client.send(JSON.stringify({
            "content": messageToSend,
            "sender": user
        }))
        setMessageToSend('')
    }

    client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        setMessagesReceived([...messagesReceived, dataFromServer])
    };

    return (
        <>
            <ReceivedMessages>
                {chatMessages}
            </ReceivedMessages>
            <ChatBoxWrapper>
                <ChatBox value={messageToSend} onChange={(event) => setMessageToSend(event.target.value)} />
                <ChatboxSubmit onClick={submit}>Send</ChatboxSubmit>
            </ChatBoxWrapper>
        </>
    )
}

export default Chat