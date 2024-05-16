export enum EAsyncMessageIPCFromRenderer {
  CreateNotification = 'create-notification',
  RestartApp = 'restart-app',
}

export enum EAsyncMessageIPCFromMain {
  UpdateAvailable = 'update-available',
  UpdateDownloaded = 'update-downloaded'
}

export interface AsyncNotificationIPCFromRenderer {
  type: EAsyncMessageIPCFromRenderer.CreateNotification
  body: {
    title: string
    body: string
  }
}

export interface AsyncRestartAppIPCFromRenderer {
  type: EAsyncMessageIPCFromRenderer.RestartApp
  body: null
}


export type AsyncMessageIPCFromRenderer =
  | AsyncNotificationIPCFromRenderer
  | AsyncRestartAppIPCFromRenderer
