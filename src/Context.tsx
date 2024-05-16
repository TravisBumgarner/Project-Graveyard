import { createContext, useEffect, useReducer, useState, type Dispatch } from 'react'

import { EActivePage, EColorTheme, type TSettings } from 'types'
import { getLocalStorage, setLocalStorage } from 'utilities'
import { type ActiveModal } from './modals/RenderModal'

const HAS_DONE_WARM_START = 'hasDoneWarmStart'
const TRUE = 'TRUE'

export interface State {
  message: {
    text: string
    severity: 'error' | 'warning' | 'info' | 'success'
    confirmCallback?: () => void
    confirmCallbackText?: string
    cancelCallback?: () => void
    cancelCallbackText?: string
  } | null
  settings: {
    colorTheme: EColorTheme
  }
  activeModal: ActiveModal | null
  activePage: EActivePage
}

const EMPTY_STATE: State = {
  settings: {
    colorTheme: EColorTheme.BEACH,
  },
  activeModal: null,
  activePage: EActivePage.Home,
  message: null,
}

const initialSetup = (backupDir: string) => {
  Object
    .keys(EMPTY_STATE.settings)
    .forEach((key) => { setLocalStorage(key as keyof typeof EMPTY_STATE['settings'], EMPTY_STATE.settings[key as keyof typeof EMPTY_STATE['settings']]) })

  // setLocalStorage(HAS_DONE_WARM_START, TRUE)
}

const getKeysFromStorage = () => {
  const output: Record<string, string> = {}

  Object
    .keys(EMPTY_STATE.settings)
    .forEach((key) => {
      output[key] = getLocalStorage(key as keyof State['settings'])
    })
  return output as unknown as State['settings']
}

interface HydrateUserSettings {
  type: 'HYDRATE_USER_SETTINGS'
  payload: TSettings
}

interface EditUserSettings {
  type: 'EDIT_USER_SETTING'
  payload: {
    key: keyof State['settings']
    value: string
  }
}

interface SetActiveModal {
  type: 'SET_ACTIVE_MODAL'
  payload: ActiveModal
}

interface ClearActiveModal {
  type: 'CLEAR_ACTIVE_MODAL'
}

interface SetActivePage {
  type: 'SET_ACTIVE_PAGE'
  payload: {
    page: EActivePage
  }
}

interface AddMessage {
  type: 'ADD_MESSAGE'
  payload: {
    text: string
    severity: 'error' | 'warning' | 'info' | 'success'
    url?: string
    confirmCallback?: () => void
    confirmCallbackText?: string
    cancelCallback?: () => void
    cancelCallbackText?: string
  }
}

interface DeleteMessage {
  type: 'DELETE_MESSAGE'
}

export type Action =
  | EditUserSettings
  | HydrateUserSettings
  | SetActiveModal
  | ClearActiveModal
  | SetActivePage
  | AddMessage
  | DeleteMessage

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'HYDRATE_USER_SETTINGS': {
      return { ...state, settings: { ...state.settings, ...action.payload } }
    }
    // case 'EDIT_USER_SETTING': {
    //   const { key, value } = action.payload
    //   setLocalStorage(key, value)
    //   return { ...state, settings: { ...state.settings, [key as 'colorTheme']: value } }
    // }
    case 'SET_ACTIVE_MODAL': {
      return { ...state, activeModal: action.payload }
    }
    case 'CLEAR_ACTIVE_MODAL': {
      return { ...state, activeModal: null }
    }
    case 'SET_ACTIVE_PAGE': {
      const { page } = action.payload
      return { ...state, activePage: page }
    }
    case 'ADD_MESSAGE': {
      return { ...state, message: { ...action.payload } }
    }
    case 'DELETE_MESSAGE': {
      return { ...state, message: null }
    }
    default:
      throw new Error('Unexpected action')
  }
}

const context = createContext(
  {
    state: EMPTY_STATE,
    dispatch: () => { }
  } as {
    state: State
    dispatch: Dispatch<Action>
  }
)

const ResultsContext = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, EMPTY_STATE)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      // if (getLocalStorage(HAS_DONE_WARM_START) !== TRUE) {
      //   initialSetup(backupDir)
      // } else {
      const currentLocalStorage = getKeysFromStorage()
      const payload = { ...currentLocalStorage }
      dispatch({ type: 'HYDRATE_USER_SETTINGS', payload })
      // }
    }

    setIsLoading(true)
    void fetchData().then(() => { setIsLoading(false) })
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

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
