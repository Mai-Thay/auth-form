import React, { useEffect } from "react";
import useValidation from "../hooks/UseValidation";
import IInputEmailProps from "../types/IInputEmailProps";
import { ValidationTypesEnum } from "../types/ValidationTypes";
import classNames from "classnames";

const InputEmail: React.FC<IInputEmailProps> =
  ({
     value = '',
     onChange,
     label = 'User email',
     placeholder = 'Email'
   }): React.ReactElement => {
    const {isValid, validate, errors} = useValidation(value, [ValidationTypesEnum.REQUIRED, ValidationTypesEnum.EMAIL])
    const validateEmail = () => {
      onChange({isValid: validate()})
    }
    return (
      <div className={classNames({'form--row': true})}>
        <div className={classNames({invalid: !isValid})}>
          <label htmlFor="email">{label}: </label>
          <input
            id="email"
            name="username"
            type="text"
            value={value}
            placeholder={placeholder}
            onBlur={() => validateEmail()}
            onChange={(event: React.FormEvent<HTMLInputElement>) => onChange({value: event.currentTarget.value})}
          />
        </div>
        {!isValid && <div className="errors">
            <div>{errors[0]}</div>
        </div>}
      </div>
    )
  }

export default InputEmail;
