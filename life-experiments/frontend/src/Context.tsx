import React from 'react'

type State = {
    message: {
        body: string,
        timeToLiveMS: number
    } | null
}

const EMPTY_STATE: State = {
    message: null
}

type AddAlert = {
    type: 'ADD_ALERT'
    data: {
        message: string
        timeToLiveMS?: number
    }
}

type RemoveAlert = {
    type: 'REMOVE_ALERT'
}

type Action =
    | AddAlert
    | RemoveAlert

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_ALERT': {
            return { ...state, message: { body: action.data.message, timeToLiveMS: action.data.timeToLiveMS } }
        }
        case 'REMOVE_ALERT': {
            return { ...state, message: null }
        }
        default:
            throw new Error('Unexpected action')
    }
}

const context = React.createContext(
    {
        state: EMPTY_STATE,
        dispatch: () => { },
    } as {
        state: State,
        dispatch: React.Dispatch<Action>
    },
)

const ResultsContext = ({ children }: { children: React.ReactChild }) => {
    const [state, dispatch] = React.useReducer(reducer, EMPTY_STATE)

    const { Provider } = context

    return (
        <Provider value={{ state, dispatch }}>
            {children}
        </Provider>
    )
}

export default ResultsContext
export {
    context
}
