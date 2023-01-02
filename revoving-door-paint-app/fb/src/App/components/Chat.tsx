import * as React from 'react'

import { firebase } from '../services'
import { context } from '../components'

const Chat = () => {
    const [content, setContent] = React.useState('')
    const [chats, setChats] = React.useState([])
    const [readError, setReadError] = React.useState('')
    const [writeError, setWriteError] = React.useState('')
    const { state, dispatch } = React.useContext(context)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setWriteError('')

        try {
            await firebase.db.ref("chats").push({
                content,
                timestamp: Date.now(),
                uid: 'foo'
            });
            setContent('')
        } catch ({ message }) {
            setWriteError(message)
        }
    }

    React.useEffect(() => {
        try {
            setReadError('')
            firebase.db.ref("chats").on("value", snapshot => {
                let receivedChats = []
                snapshot.forEach((snap) => {
                    receivedChats.push(snap.val())
                })
                setChats(receivedChats)
            })
        } catch ({ message }) {
            setReadError(message)
        }
    }, [])

    return (
        <div>
            <div className="chats">
                {chats.map(chat => {
                    return <p key={chat.timestamp}>{chat.uid}: {chat.content}</p>
                })}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(event) => setContent(event.target.value)}
                    value={content}
                />
                {readError.length ? <p>{readError}</p> : null}
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Chat