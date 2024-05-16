import { type Action } from 'Context'
import { ipcRenderer } from 'electron'
import { EAsyncMessageIPCFromMain, EAsyncMessageIPCFromRenderer } from 'shared/types'

export const useIPCAsyncMessageEffect = (dispatch: React.Dispatch<Action>) => {
  ipcRenderer.on(EAsyncMessageIPCFromMain.UpdateAvailable, () => {
    ipcRenderer.removeAllListeners(EAsyncMessageIPCFromMain.UpdateAvailable)
    dispatch({ type: 'ADD_MESSAGE', payload: { text: 'A new update is available. Downloading now...', severity: 'info' } })
  })

  ipcRenderer.on(EAsyncMessageIPCFromMain.UpdateDownloaded, () => {
    ipcRenderer.removeAllListeners(EAsyncMessageIPCFromMain.UpdateDownloaded)
    dispatch({ type: 'ADD_MESSAGE', payload: { text: 'Update Downloaded. It will be installed on restart. Restart now?', severity: 'info', cancelCallbackText: 'Later', confirmCallbackText: 'Restart', confirmCallback: () => { ipcRenderer.send(EAsyncMessageIPCFromRenderer.RestartApp) } } })
  })
}
