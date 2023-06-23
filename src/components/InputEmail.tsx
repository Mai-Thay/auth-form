import React, { useEffect, useState } from "react";
import useValidation from "../hooks/UseValidation";
import IInputEmailProps from "../types/IInputEmailProps";
import { ValidationTypesEnum } from "../types/ValidationTypes";
import classNames from "classnames";

const InputEmail: React.FC<IInputEmailProps> =
  ({
     value = '',
     onChange,
     label = 'User email',
     placeholder = 'Email',
     showErrors = false,
     pref = 'signin'
   }): React.ReactElement => {
    const {isValid, validate, errors} = useValidation(value, [ValidationTypesEnum.REQUIRED, ValidationTypesEnum.EMAIL])
    const [visibleErrors, setVisibleErrors] = useState<boolean>(showErrors)

    useEffect(() => {
      validate()
      setVisibleErrors(showErrors)
    }, [showErrors])

    const validateEmail = (value: string) => {
      setVisibleErrors(false)
      validate()
      onChange({
        value,
        isValid: validate()
      })
    }


    return (
      <div className={classNames({'form--row': true})}>
        <div className={classNames({invalid: visibleErrors && !isValid})}>
          <label htmlFor={`${pref}-email`}>{label}: </label>
          <input
            id={`${pref}-email`}
            name="username"
            type="text"
            value={value}
            placeholder={placeholder}
            onBlur={() => setVisibleErrors(true)}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              validateEmail(event.currentTarget.value)
            }
          />
        </div>
        {visibleErrors && !isValid && <div className="errors">
            <div>{errors[0]}</div>
        </div>}
      </div>
    )
  }

export default InputEmail;
