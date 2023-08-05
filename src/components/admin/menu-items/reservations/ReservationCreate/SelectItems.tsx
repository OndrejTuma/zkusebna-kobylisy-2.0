import Button from 'Components/generic/Button'
import { useFormContext } from 'react-hook-form'
import { SelectArrayInput, useChoicesContext } from 'react-admin'

import { AdminReservation } from 'LocalTypes'

const SelectItems = (props: any) => {
  const { setValue } = useFormContext<AdminReservation>()
  const { allChoices } = useChoicesContext()

  const handleSelectAll = () => {
    setValue(
      'itemIds',
      allChoices.filter(({ busy }) => !busy).map(({ id }) => id)
    )
  }
  const handleUnselectAll = () => {
    setValue('itemIds', [])
  }

  return (
    <div>
      <div>
        <Button variant='text' size='small' onClick={handleSelectAll}>
          Označit vše
        </Button>
        <Button variant='text' size='small' onClick={handleUnselectAll}>
          Odznačit vše
        </Button>
      </div>
      <SelectArrayInput {...props} />
    </div>
  )
}

export default SelectItems
