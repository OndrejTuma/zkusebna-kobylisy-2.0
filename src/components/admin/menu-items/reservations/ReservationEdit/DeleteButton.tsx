import { useState } from 'react'
import { alpha, styled } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Button,
  Confirm,
  useDelete,
  useRecordContext,
  ResettableTextField,
  useNotify,
  useUnselect,
  useRedirect,
} from 'react-admin'

const resource = 'reservations'

const DeleteButton = () => {
  const record = useRecordContext()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  const notify = useNotify()
  const unselect = useUnselect(resource)
  const redirect = useRedirect()
  const [remove, { isLoading }] = useDelete()

  const handleClick = () => setOpen(true)
  const handleDialogClose = () => {
    setOpen(false)
    setReason('')
  }
  const handleConfirm = () => {
    remove(
      resource,
      {
        id: record && record.id,
        meta: {
          reason,
        },
      },
      {
        onSuccess: () => {
          setOpen(false)
          notify('ra.notification.deleted', {
            type: 'info',
            messageArgs: { smart_count: 1 },
            undoable: false,
          })
          unselect([record.id])
          redirect('list', resource)
        },
        onError: (error: any) => {
          setOpen(false)

          notify(
            typeof error === 'string'
              ? error
              : error.message || 'ra.notification.http_error',
            {
              type: 'error',
              messageArgs: {
                _:
                  typeof error === 'string'
                    ? error
                    : error && error.message
                    ? error.message
                    : undefined,
              },
            }
          )
        },
      }
    )
    setOpen(false)
  }

  return (
    <>
      <StyledButton
        className={'ra-delete-button'}
        key='button'
        label='Smazat'
        startIcon={<DeleteIcon />}
        onClick={handleClick}
      />
      <Confirm
        isOpen={open}
        loading={isLoading}
        title={'Potvrdit smazání rezervace'}
        content={
          <ResettableTextField
            fullWidth
            label='Důvod zrušení (nepovinné)'
            onChange={(e) => setReason(e.target.value)}
            value={reason}
            multiline
          />
        }
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
        cancel='Zavřít'
        confirm='Smazat'
      />
    </>
  )
}

const StyledButton = styled(Button, {
  name: 'DeleteButton',
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  color: theme.palette.error.main,
  height: 36.5,
  '&:hover': {
    backgroundColor: alpha(theme.palette.error.main, 0.12),
    // Reset on mouse devices
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },
}))

export default DeleteButton
