import { Null, Record, Static, String } from 'runtypes';

// Pages should share the same name as what's in this list, minus the `Page` prefix.
export enum AppPage {
  MainMenu = 'main-menu',
  ComputeMissingSetup = 'compute-missing-setup',
  ComputeMissing = 'compute-missing',
  Exit = 'exit',
}

export type BasePageProps = {
}

export const CacheRunType = Record({
  activeDirectory: String.Or(Null),
  backupDirectory: String.Or(Null),
})

export type Cache = Static<typeof CacheRunType>