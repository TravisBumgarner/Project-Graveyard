import React, { createContext, useReducer, useState, type Dispatch } from 'react';
import { useAsyncEffect } from 'use-async-effect';

import { Text } from 'ink';
import { AppPage } from './types.js';
import { readCache } from './utils.js';

interface State {
  activeDirectory: string | null,
  backupDirectory: string | null,
  activePage: AppPage,

}

const EMPTY_STATE: State = {
  activeDirectory: null,
  backupDirectory: null,
  activePage: AppPage.MainMenu,
}

interface SetPage {
  type: 'SET_PAGE'
  payload: {
    page: AppPage
  }
}

interface SetDirectories {
  type: 'SET_DIRECTORIES'
  payload: {
    activeDirectory: string,
    backupDirectory: string,
    page: AppPage
  }
}

interface HydrateFromCache {
  type: 'HYDRATE_FROM_CACHE'
  payload: {
    activeDirectory: string | null,
    backupDirectory: string | null,
  }
}

export type Action =
  | HydrateFromCache
  | SetPage
  | SetDirectories

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'HYDRATE_FROM_CACHE': {
      return {
        ...state,
        activeDirectory: action.payload.activeDirectory,
        backupDirectory: action.payload.backupDirectory,
      }
    }
    case 'SET_PAGE': {
      return { ...state, activePage: action.payload.page }
    }
    case 'SET_DIRECTORIES': {
      return {
        ...state,
        activeDirectory: action.payload.activeDirectory,
        backupDirectory: action.payload.backupDirectory,
        activePage: action.payload.page
      }
    }
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

  useAsyncEffect(async () => {
    const { backupDirectory, activeDirectory } = await readCache()
    dispatch({
      type: 'HYDRATE_FROM_CACHE',
      payload: {
        activeDirectory,
        backupDirectory,
      }
    })
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  )
}

export default ResultsContext
export {
  context
};

