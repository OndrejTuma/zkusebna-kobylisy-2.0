import { useState } from 'react'
import { useNotify, useRecordContext, useRedirect, useUnselect } from 'react-admin'

const resource = 'reservations'

const useRecurrenceChange = (action: any, data: object, notificationMessage: string) => {
  const record = useRecordContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const notify = useNotify()
  const unselect = useUnselect(resource)
  const redirect = useRedirect()

  const handleConfirm = async () => {
    await action(
      resource,
      {
        id: record && record.id,
        ...data,
      },
      {
        onSuccess: () => {
          setOpen(false)
          notify(notificationMessage, {
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
  }

  return {
    handleConfirm,
    handleOpen,
    open,
    handleClose,
  }
}

export default useRecurrenceChange
