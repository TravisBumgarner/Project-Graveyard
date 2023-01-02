import * as React from 'react'
import styled from 'styled-components'

import { context } from '../components'
import { client } from '../App'

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

const Chat = () => {
    const [content, setContent] = React.useState('')
    const { state, dispatch } = React.useContext(context)

    const chatMessages = state.messages.map(({ content, sender }, index) => {
        return <ChatMessage key={index}><strong>{sender}</strong>: {content}</ChatMessage>
    })

    const submit = () => {
        const encodedMessage = JSON.stringify({
            content,
            sender: state.user,
            type: 'TRANSMIT_MESSAGE'
        })
        client.send(encodedMessage)
        // dispatch({ type: 'MESSAGE_SENT', sender: state.user, content })
        setContent('')
    }

    return (
        <>
            <h1>Hello {state.user}</h1>
            <ReceivedMessages>
                {chatMessages}
            </ReceivedMessages>
            <ChatBoxWrapper>
                <ChatBox value={content} onChange={(event) => setContent(event.target.value)} />
                <ChatboxSubmit onClick={submit}>Send</ChatboxSubmit>
            </ChatBoxWrapper>
        </>
    )
}

export default Chat