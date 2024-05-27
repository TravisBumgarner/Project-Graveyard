import React, { createContext, useReducer, useState, type Dispatch } from 'react';
import { useAsyncEffect } from 'use-async-effect';

import { Text } from 'ink';
import { AppPage, FileTree } from './types.js';
import { readCache } from './utils.js';

interface State {
  activeRootDirectory: string,
  backupRootDirectory: string,
  activePage: AppPage,
  errorMessage: string,
  missingFileTree: FileTree | null
}

const EMPTY_STATE: State = {
  activeRootDirectory: "",
  backupRootDirectory: "",
  activePage: AppPage.MainMenu,
  errorMessage: "",
  missingFileTree: null
}

interface SET_MISSING_FILE_TREE {
  type: 'SET_MISSING_FILE_TREE'
  payload: {
    missingFileTree: FileTree
  }
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
    activeRootDirectory: string,
    backupRootDirectory: string,
  }
}

interface HydrateFromCache {
  type: 'HYDRATE_FROM_CACHE'
  payload: {
    activeRootDirectory: string,
    backupRootDirectory: string,
  }
}

interface SetErrorMessage {
  type: 'SET_ERROR_MESSAGE'
  payload: {
    errorMessage: string
  }

}

export type Action =
  | HydrateFromCache
  | SetPage
  | SetDirectories
  | SetErrorMessage
  | SET_MISSING_FILE_TREE

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'HYDRATE_FROM_CACHE': {
      return {
        ...state,
        activeRootDirectory: action.payload.activeRootDirectory,
        backupRootDirectory: action.payload.backupRootDirectory,
      }
    }
    case 'SET_PAGE': {
      return { ...state, activePage: action.payload.page }
    }
    case 'SET_DIRECTORIES': {
      return {
        ...state,
        ...action.payload

      }
    }
    case 'SET_ERROR_MESSAGE': {
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
    }
    case 'SET_MISSING_FILE_TREE': {
      return {
        ...state,
        missingFileTree: action.payload.missingFileTree
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
    const { backupRootDirectory, activeRootDirectory } = await readCache()
    dispatch({
      type: 'HYDRATE_FROM_CACHE',
      payload: {
        activeRootDirectory: activeRootDirectory || '',
        backupRootDirectory: backupRootDirectory || '',
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

