export default interface IInputPasswordProps {
  value: string
  onChange: Function
  label?: string
  placeholder?: string
  isConfirmField?: boolean
  password?: string
  showErrors?: boolean
  pref?: string
}
