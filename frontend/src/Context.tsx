import React from 'react'

import { Metric } from 'sharedTypes'

type State = {
    metrics: Record<string, Metric>
}

const EMPTY_STATE: State = {
    metrics: {}
}

type NewMetric = {
    type: 'NEW_METRIC',
    data: Metric
}

type Action =
    | NewMetric

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'NEW_METRIC': {
            return { ...state, metrics: { ...state.metrics, [action.data.id]: action.data } }
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
