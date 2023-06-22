import React, { useEffect, useState } from "react";
import useValidation from "../hooks/UseValidation";
import { ValidationTypesEnum } from "../types/ValidationTypes";
import classNames from "classnames";
import IInputPasswordProps from "../types/IInputPasswordProps";
import show from "../assets/images/show.svg";
import hide from "../assets/images/hide.svg";

const InputPassword: React.FC<IInputPasswordProps> =
  ({
     value = '',
     onChange,
     label = 'User password',
     placeholder = 'Password',
     isConfirmField = false,
     password = ''
   }): React.ReactElement => {
    const [isEqual, setIsEqual] = useState<boolean>(true);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const {
      isValid,
      validate,
      errors
    } = useValidation(value, [ValidationTypesEnum.REQUIRED, ValidationTypesEnum.PASSWORD]);

    useEffect(() => {
      if(isConfirmField) {
        setIsEqual(value.length ? value === password: true);
      }
    }, [value, password])

    const validatePassword = () => {
      onChange({isValid: validate()})
    }

    const checkPasswordsEqual = () => {
      setIsEqual(password === value)
      onChange({isValid: password === value})
    }

    return (
      <div className={classNames({'form--row': true})}>
        <div className={classNames({invalid: isConfirmField ? !isEqual : !isValid})}>
        <label htmlFor={isConfirmField ? 'confirm' : 'password'}>{label}: </label>
          <input
            id={isConfirmField ? 'confirm' : 'password'}
            name="username"
            type={isVisible ? "text" : "password"}
            value={value}
            placeholder={placeholder}
            onBlur={() => !isConfirmField ? validatePassword(): checkPasswordsEqual()}
            onChange={(event: React.FormEvent<HTMLInputElement>) => onChange({value: event.currentTarget.value})}
          />
          <div className="password-show" onClick={() => setIsVisible((value: boolean) => !value)}>
            {isVisible && <img src={hide}/>}
            {!isVisible && <img src={show}/>}
          </div>
        </div>
        {!isValid && !isConfirmField && <div className="errors">
            {errors[0]}
        </div>}
        {isConfirmField && !isEqual && <div className="errors">
          Passwords are not equal.
        </div>}
      </div>
    )
  }

export default InputPassword;
