import { context } from 'Context'
import { useContext, type FC } from 'react'
import ConfirmationModal, { type ConfirmationModalProps } from './ConfirmationModal'
import EditEntryModal from './EditEntry'
import SettingsModal from './Settings'

export enum ModalID {
  SETTINGS_MODAL = 'SETTINGS_MODAL',
  CONFIRMATION_MODAL = 'CONFIRMATION_MODAL',
  EDIT_ENTRY_MODAL = 'EDIT_ENTRY_MODAL',
}

export type ActiveModal =
  | { id: ModalID.SETTINGS_MODAL }
  | { id: ModalID.CONFIRMATION_MODAL } & ConfirmationModalProps
  | { id: ModalID.EDIT_ENTRY_MODAL, projectEntryId: string }

const RenderModal: FC = () => {
  const { state } = useContext(context)

  if (!state.activeModal?.id) return null

  switch (state.activeModal.id) {
    case ModalID.SETTINGS_MODAL:
      return <SettingsModal />
    case ModalID.EDIT_ENTRY_MODAL:
      return <EditEntryModal projectEntryId={state.activeModal.projectEntryId} />
    case ModalID.CONFIRMATION_MODAL:
      return < ConfirmationModal
        {...state.activeModal}
      />
    default:
      return null
  }
}

export default RenderModal
