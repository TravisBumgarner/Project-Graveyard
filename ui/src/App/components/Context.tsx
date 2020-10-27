
import * as React from 'react'

type State = {
    hasConnected: boolean
    user: string
    pixels: number[]
    messages: { sender: string, content: string }[]
}

const EMPTY_STATE: State = {
    hasConnected: false,
    user: '',
    pixels: [0, 0, 0],
    messages: []
}

const context = React.createContext(
    {
        state: EMPTY_STATE,
        dispatch: () => { }
    } as {
        state: State,
        dispatch: React.Dispatch<Action>
    })


type ConnectedAction = { type: 'CONNECTED' }

type SetUserAction = { type: 'SET_USER', user: string }

type SetupPixelsAction = { type: 'SETUP_PIXELS', pixels: (1 | 0)[] }

type SetPixelAction = { type: 'SET_PIXEL', pixel: number, value: 0 | 1 }

type TransmitMessageAction = { type: 'TRANSMIT_MESSAGE', sender: string, content: string }

// type MessageSentAction = { type: 'MESSAGE_SENT', sender: string, content: string }


type Action =
    | ConnectedAction
    | SetUserAction
    | SetPixelAction
    | TransmitMessageAction
    | SetupPixelsAction
// | MessageSentAction


const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'CONNECTED': {
            return { ...state, hasConnected: true }
        }
        case 'SET_USER': {
            return { ...state, user: action.user }
        }
        case 'SETUP_PIXELS': {
            console.log('hi')
            return {
                ...state,
                pixels: action.pixels
            }
        }
        case 'SET_PIXEL': {
            console.log('Context', action)
            const modifiedPixels = [...state.pixels]
            modifiedPixels[action.pixel] = action.value
            return {
                ...state,
                pixels: modifiedPixels
            }
        }
        // case 'MESSAGE_SENT':
        case 'TRANSMIT_MESSAGE': {
            const { sender, content } = action
            return {
                ...state,
                messages: [...state.messages, { sender, content }]
            }
        }
    }
}

const ResultsContext = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, EMPTY_STATE)

    const Provider = context.Provider

    return (
        <Provider value={{ state, dispatch }}>
            {children}
        </Provider>
    )
}

export default ResultsContext
export { context, Action }