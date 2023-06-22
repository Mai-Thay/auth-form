export enum ValidationTypesEnum {
  EMAIL = 'email',
  PASSWORD = 'password',
  REQUIRED = 'required',
}

export type ValidationTypes = `${ValidationTypesEnum}`

export type UseValidation = {
  isValid: boolean
  validate: Function
  errors: Array<string>
}
