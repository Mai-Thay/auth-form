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
     password = '',
     showErrors = false,
     pref = 'signin'
   }): React.ReactElement => {
    const [visibleErrors, setVisibleErrors] = useState<boolean>(showErrors)
    const [isEqual, setIsEqual] = useState<boolean>(true);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const {
      isValid,
      validate,
      errors
    } = useValidation(value, [ValidationTypesEnum.REQUIRED, ValidationTypesEnum.PASSWORD]);

    useEffect(() => {
      if (isConfirmField) {
        setIsEqual(value.length ? value === password : true);
      }
    }, [value, password])

    useEffect(() => {
      if(!isConfirmField) {
        validate()
      } else {
        value && checkPasswordsEqual(value)
      }
      setVisibleErrors(showErrors)
    }, [showErrors])

    const validatePassword = (value: string) => {
      setVisibleErrors(false)
      validate()
      onChange({value, isValid: validate()})
    }

    const checkPasswordsEqual = (value: string) => {
      setIsEqual(password === value)
      setVisibleErrors(false)
      onChange({value, isValid: password === value})
    }

    return (
      <div className={classNames({'form--row': true})}>
        <div className={classNames({invalid: visibleErrors && (isConfirmField ? !isEqual : !isValid)})}>
          <label htmlFor={isConfirmField ? `${pref}-confirm` : `${pref}-password`}>{label}: </label>
          <input
            id={isConfirmField ? `${pref}-confirm` : `${pref}-password`}
            name="username"
            type={isVisible ? "text" : "password"}
            value={value}
            placeholder={placeholder}
            onBlur={() => setVisibleErrors(true)}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              !isConfirmField ?
                validatePassword(event.currentTarget.value) :
                checkPasswordsEqual(event.currentTarget.value)
            }}
          />
          <div className="password-show" onClick={() => setIsVisible((value: boolean) => !value)}>
            {isVisible && <img src={hide}/>}
            {!isVisible && <img src={show}/>}
          </div>
        </div>
        {visibleErrors && !isValid && !isConfirmField && <div className="errors">
          {errors[0]}
        </div>}
        {visibleErrors && isConfirmField && !isEqual && <div className="errors">
            Passwords are not equal.
        </div>}
      </div>
    )
  }

export default InputPassword;
