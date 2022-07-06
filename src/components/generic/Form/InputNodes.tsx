import React from 'react'

import Input from './Input'
import type { Inputs } from './utils/useFormInitials'

type Props = {
  inputs: Inputs
}

const InputNodes = ({ inputs }: Props) => {
  return (
    <>
      {Object.entries(inputs).map(([ name, { label, type } ]) => (
        <Input key={name} name={name} label={label} type={type}/>
      ))}
    </>
  )
}

export default InputNodes