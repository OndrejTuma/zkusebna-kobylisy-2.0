import {
  Button,
  Confirm,
  RadioButtonGroupInput,
  useDelete,
  useRecordContext,
  useUpdate,
} from 'react-admin'
import { useWatch } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { styled } from '@mui/material/styles'
import { useMemo } from 'react'
import isSameDay from 'date-fns/isSameDay'
import useRecurrenceChange from './hooks/useRecurrenceChange'

export const RecurrenceSave = () => {
  const record = useRecordContext()
  const data = useWatch()
  const recurrenceType = useWatch({ name: 'recurrenceType' })
  const [update, { isLoading }] = useUpdate()

  const changes = {
    data: {
      ...data,
      recurrenceType,
    },
  }

  const { handleClose, handleConfirm, handleOpen, open } = useRecurrenceChange(
    update,
    changes,
    'Úprava proběhla úspěšně'
  )

  const hideAll = useMemo(
    () =>
      !isSameDay(new Date(record.dateStart), new Date(data.dateStart)) ||
      !isSameDay(new Date(record.dateEnd), new Date(data.dateEnd)),
    [data.dateStart, data.dateEnd, record.dateStart, record.dateEnd]
  )

  return (
    <>
      <StyledButton
        label='Uložit'
        startIcon={<SaveIcon />}
        onClick={handleOpen}
      />
      <RecurrenceModal
        hideAll={hideAll}
        isLoading={isLoading}
        isOpen={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  )
}

export const RecurrenceDelete = () => {
  const recurrenceType = useWatch({ name: 'recurrenceType' })
  const [remove, { isLoading }] = useDelete()

  const data = {
    meta: {
      recurrenceType,
    },
  }

  const { handleClose, handleConfirm, handleOpen, open } = useRecurrenceChange(
    remove,
    data,
    'Smazání proběhlo úspěšně'
  )

  return (
    <>
      <StyledButton
        label='Smazat'
        startIcon={<DeleteIcon />}
        onClick={handleOpen}
      />
      <RecurrenceModal
        isLoading={isLoading}
        isOpen={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  )
}

interface RecurrenceModalProps {
  hideAll?: boolean
  isLoading?: boolean
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
}

const RecurrenceModal = ({
  hideAll,
  isLoading,
  isOpen,
  onConfirm,
  onClose,
}: RecurrenceModalProps) => {
  const choices = [
    { id: 0, name: 'Tuto událost' },
    { id: 1, name: 'Tuto a následující události' },
  ]

  return (
    <Confirm
      isOpen={isOpen}
      loading={isLoading}
      title={'Upravit opakující se událost'}
      content={
        <RadioButtonGroupInput
          label=''
          source='recurrenceType'
          choices={
            hideAll
              ? choices
              : [...choices, { id: 2, name: 'Všechny události' }]
          }
          row={false}
        />
      }
      onConfirm={onConfirm}
      onClose={onClose}
      cancel='Zavřít'
      confirm='Potvrdit'
    />
  )
}

const StyledButton = styled(Button, {
  name: 'RecurrenceButton',
  overridesResolver: (props, styles) => styles.root,
})(() => ({
  height: 36.5,
}))
