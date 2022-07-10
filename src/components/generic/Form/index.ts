import Form from './Form'
import DateTimePicker from './DateTimePicker'
import Input from './Input'
import Select from './Select'
import SubmitButton from './SubmitButton'
export type { FormValues } from './Form'

export { default as useFormInitials } from './hooks/useFormInitials'
export default Object.assign(Form, {
  DateTimePicker,
  Input,
  Select,
  SubmitButton,
})