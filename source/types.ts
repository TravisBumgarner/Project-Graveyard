import { Record, String, Null, Static } from 'runtypes'


export const StateRunType = Record({
  activeDirectory: String.Or(Null),
  backupDirectory: String.Or(Null),
})

export type State = Static<typeof StateRunType>


export enum AppPage {
  MainMenu = 'main-menu',
  CheckFilesSetup = 'check-files-setup',
  Exit = 'exit',
}

export type BasePageProps = {
  setCurrentPage: (page: AppPage) => void;
}