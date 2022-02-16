import React from 'react'

import { Worksheet, WorksheetEntry } from '../../types'

type State = {
    worksheets: Record<string, Worksheet>
    worksheetEntries: Record<string, WorksheetEntry>
    appHydrated: boolean
}

const EMPTY_STATE: State = {
    worksheets: {},
    worksheetEntries: {},
    appHydrated: false
}

const context = React.createContext(
    {
        state: EMPTY_STATE,
        dispatch: () => { }
    } as {
        state: State,
        dispatch: React.Dispatch<Action>
    })

type HydrateApp = {
    type: 'HYDRATE_APP'
    data: {
        worksheets: Worksheet[],
        worksheetEntries: WorksheetEntry[]
    }
}

type AddWorksheet = {
    type: 'ADD_WORKSHEET'
    data: {
        worksheet: Worksheet
    }
}

type EditWorksheet = {
    type: 'EDIT_WORKSHEET'
    data: {
        worksheet: Worksheet
    }
}

type DeleteWorksheet = {
    type: 'DELETE_WORKSHEET'
    data: {
        id: string
    }
}

type AddWorksheetEntry = {
    type: 'ADD_WORKSHEET_ENTRY'
    data: {
        worksheetEntry: WorksheetEntry
    }
}

type DeleteWorksheetEntry = {
    type: 'DELETE_WORKSHEET_ENTRY'
    data: {
        id: string
    }
}

type GetWorksheets = {
    type: 'GET_WORKSHEETS'
    data: {
        worksheets: Worksheet[],

    }
}

type Action =
    | HydrateApp
    | AddWorksheet
    | EditWorksheet
    | DeleteWorksheet
    | GetWorksheets
    | AddWorksheetEntry
    | DeleteWorksheetEntry

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'HYDRATE_APP': {
            const worksheets: Record<string, Worksheet> = {}
            action.data.worksheets.forEach(worksheet => worksheets[worksheet.id] = { ...worksheet })

            const worksheetEntries: Record<string, WorksheetEntry> = {}
            action.data.worksheetEntries.forEach(worksheetEntry => worksheetEntries[worksheetEntry.id] = { ...worksheetEntry })
            return { ...state, worksheets, worksheetEntries, appHydrated: true }
        }
        case 'GET_WORKSHEETS': {
            const worksheets: Record<string, Worksheet> = {}
            action.data.worksheets.forEach(worksheet => worksheets[worksheet.id] = { ...worksheet })
            return { ...state, worksheets }
        }
        case 'ADD_WORKSHEET':
        case 'EDIT_WORKSHEET': {
            return { ...state, worksheets: { ...state.worksheets, [action.data.worksheet.id]: { ...action.data.worksheet } } }
        }
        case 'DELETE_WORKSHEET': {
            const modifiedWorksheets = { ...state.worksheets }
            delete modifiedWorksheets[action.data.id]
            return { ...state, worksheets: modifiedWorksheets }
        }
        case 'ADD_WORKSHEET_ENTRY': {
            return { ...state, worksheetEntries: { ...state.worksheetEntries, [action.data.worksheetEntry.id]: { ...action.data.worksheetEntry } } }
        }
        case 'DELETE_WORKSHEET_ENTRY': {
            const modifiedWorksheetEntries = { ...state.worksheetEntries }
            delete modifiedWorksheetEntries[action.data.id]
            return { ...state, worksheetEntries: modifiedWorksheetEntries }
        }
        default: {
            console.error("Swallowing action", action)
            return state
        }
    }
}

const ResultsContext = ({ children }: { children: React.ReactChild }) => {
    const [state, dispatch] = React.useReducer(reducer, EMPTY_STATE)

    const Provider = context.Provider

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