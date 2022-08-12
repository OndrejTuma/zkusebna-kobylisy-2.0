import { TextInput } from 'react-admin'
import React from 'react'

const FilterByTitle = () => {
  return (
    <TextInput label="Hledat" source="title" alwaysOn />
  )
}

export default FilterByTitle