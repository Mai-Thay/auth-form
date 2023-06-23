import React, { useState } from 'react';
import { UseValidation, ValidationTypes, ValidationTypesEnum } from "../types/ValidationTypes";

const useValidation = (
  rules: Array<ValidationTypes>,
): UseValidation => {
  const [isValid, setIsValid] = useState(true)
  const [errors, setErrors] = useState<Array<string>>([])

  const validate = (value: string) => {
    let valid = true;
    const errorsBag = [];
    if (rules.includes(ValidationTypesEnum.REQUIRED) && !checkRequired(value)) {
      valid = false;
      errorsBag.push('The field is required');
    }

    if (rules.includes(ValidationTypesEnum.EMAIL) && !checkEmail(value)) {
      valid = false;
      errorsBag.push('Incorrect email address');
    }

    if (rules.includes(ValidationTypesEnum.PASSWORD) && !checkLength(value, 8)) {
      valid = false;
      errorsBag.push('Minimal password length should be 8 characters.');
    }

    if (rules.includes(ValidationTypesEnum.PASSWORD) && !checkPassword(value)) {
      valid = false;
      errorsBag.push('Password should include at least 1 letter and 1 digit.');
    }

    setIsValid(valid);
    setErrors(errorsBag);
    return valid;
  }

  const checkRequired = (value: string): boolean => {
    return Boolean(value?.trim());
  }

  const checkEmail = (value: string): boolean => {
    return Boolean(value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ));
  }

  const checkLength = (value: string, length: number): boolean => {
    return value.trim().length >= length;
  }

  const checkPassword = (value: string): boolean => {
    return Boolean(value.match(/[a-zA-Z]/g)) && Boolean(value.match(/[0-9]/g));
  }

  return {isValid, validate, errors}
}

export default useValidation;
