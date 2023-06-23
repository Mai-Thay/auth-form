import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import InputEmail from "./InputEmail";
import { Field } from "../types/Field";
import InputPassword from "./InputPassword";

const SignUpForm: React.FC = (): ReactElement => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false)
  const [email, changeEmail] = useState<Field>({
    value: '',
    isValid: false,
  });
  const [password, changePassword] = useState<Field>({
    value: '',
    isValid: false,
  });
  const [passwordConfirm, changeConfirmPassword] = useState<Field>({
    value: '',
    isValid: false,
  });

  useEffect(() => {
    if (!password.value.length) {
      changeConfirmPassword(() => ({value: '', isValid: false}));
    }
  }, [password])

  const submit = (event: FormEvent): void => {
    event.preventDefault()
    if (!email.isValid || !password.isValid || !passwordConfirm.isValid) {
      setIsFormSubmitted(true)
    } else {
      alert('This form is made only for decoration. User account wouldn\'t be created. For test login you can use test@test.test/qwerty1234')
    }
  }

  return (
    <form className="form" onSubmit={(event: FormEvent) => submit(event)}>
      <div className="form--title">
        Create account
      </div>
      <InputEmail
        pref="signup"
        value={email.value}
        onChange={(value: Field) => {
          changeEmail((prevState: Field) => ({...prevState, ...value}))
        }}
        showErrors={isFormSubmitted}
      />
      <InputPassword
        pref="signup"
        value={password.value}
        onChange={(value: Field) => {
          changePassword((prevState: Field) => ({...prevState, ...value}))
        }}
        showErrors={isFormSubmitted}
      />
      {password.isValid && <InputPassword
          pref="signup"
          isConfirmField={true}
          label="Password confirmation"
          placeholder="Confirm password"
          password={password.value}
          value={passwordConfirm.value ?? ''}
          onChange={(value: Field) => {
            changeConfirmPassword((prevState: Field) => ({...prevState, ...value}))
          }}
          showErrors={isFormSubmitted}
      />}
      <button className="form--submit">Sign up</button>
    </form>
  )
}

export default SignUpForm;
