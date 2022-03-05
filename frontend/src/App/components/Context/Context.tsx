import { User as TFirebaseUser } from 'firebase/auth'
import React from 'react'
import utilities from '../../utilities'

import { TWorksheetEntry, TPhraseADayUser } from '../../types'

type State = {
    message: {
        body: string,
        timeToLiveMS: number
    } | null
    worksheetEntries: Record<string, TWorksheetEntry>
    appHydrated: boolean
    currentUser: {
        firebase: TFirebaseUser,
        phraseADay: TPhraseADayUser
    } | null | undefined
}

const EMPTY_STATE: State = {
    message: null,
    worksheetEntries: {},
    appHydrated: false,
    currentUser: undefined,
}

type UserSignup = {
    type: 'USER_SIGNED_UP'
    data: {
        currentUser: {
            firebase: TFirebaseUser
            phraseADay: TPhraseADayUser
        }
    }
}

type UserLogin = {
    type: 'USER_LOGGED_IN'
    data: {
        currentUser: {
            firebase: TFirebaseUser
            phraseADay: TPhraseADayUser
        }
    }
}

type UserSignedOut = {
    type: 'USER_SIGNED_OUT'
    data: {
        currentUser: null
    }
}

type AddMessage = {
    type: 'ADD_MESSAGE'
    data: {
        message: string
        timeToLiveMS?: number
    }
}

type DeleteMessage = {
    type: 'DELETE_MESSAGE'
}

type Action =
    | AddMessage
    | DeleteMessage
    | UserLogin
    | UserSignup
    | UserSignedOut

const context = React.createContext(
    {
        state: EMPTY_STATE,
        dispatch: () => { },
    } as {
        state: State,
        dispatch: React.Dispatch<Action>
    },
)

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_MESSAGE': {
            return { ...state, message: { body: action.data.message, timeToLiveMS: action.data.timeToLiveMS } }
        }
        case 'DELETE_MESSAGE': {
            return { ...state, message: null }
        }
        case 'USER_SIGNED_OUT':
        case 'USER_LOGGED_IN':
        case 'USER_SIGNED_UP': {
            return { ...state, currentUser: action.data.currentUser }
        }
        default: {
            utilities.logger(`Swallowing action: ${JSON.stringify(action)}`)
            return state
        }
    }
}

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
    context,
    Action,
}
