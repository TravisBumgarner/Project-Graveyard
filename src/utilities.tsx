import { ipcRenderer } from 'electron'

import { type AsyncMessageIPCFromRenderer } from 'shared/types'
import { EColorTheme } from 'types'

export const saveFile = async (fileName: string, jsonData: unknown) => {
  const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' })
  const a = document.createElement('a')
  a.download = fileName
  a.href = URL.createObjectURL(blob)
  a.addEventListener('click', () => {
    setTimeout(() => { URL.revokeObjectURL(a.href) }, 30 * 1000)
  })
  a.click()
}

export interface TLocalStorage {
  colorTheme: EColorTheme,
}

export const getLocalStorage = (key: keyof TLocalStorage) => {
  const result = localStorage.getItem(key)
  return result ? JSON.parse(result) : ''
}

export const setLocalStorage = <T extends TLocalStorage>(key: keyof T, value: T[keyof T]) => {
  localStorage.setItem(key as string, JSON.stringify(value))
}

// interface MessageReturnTypeMap {
//   [ESyncMessageIPC.AppStart]: AppStartIPCFromMain['body']
// }

// const sendSyncIPCMessage = async <T extends SyncMessageIPCFromRenderer>(
//   message: T
// ): Promise<MessageReturnTypeMap[T['type']]> => {
//   return (await ipcRenderer.invoke(
//     message.type,
//     message.body
//   )) as MessageReturnTypeMap[T['type']]
// }

export const colorThemeOptionLabels: Record<EColorTheme, string> = {
  [EColorTheme.BEACH]: 'Beach',
  [EColorTheme.RETRO_FUTURE]: 'Retro Future',
  [EColorTheme.UNDER_THE_SEA]: 'Under the Sea',
  [EColorTheme.CONTRAST]: 'High Contrast'
}

export const sendAsyncIPCMessage = <T extends AsyncMessageIPCFromRenderer>(
  message: T
) => {
  // Responses end up in useIPCRendererEffect.ts
  ipcRenderer.send(message.type, message.body)
}
