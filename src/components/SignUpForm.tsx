import React, { FormEvent, isValidElement, ReactElement, useEffect, useState } from "react";
import anchor from "../assets/images/question-mark.svg";
import InputEmail from "./InputEmail";
import { Field } from "../types/Field";
import InputPassword from "./InputPassword";
import classNames from "classnames";
import { Simulate } from "react-dom/test-utils";
import submit = Simulate.submit;

const SignUpForm: React.FC = (): ReactElement => {
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
    if(!password.value.length) {
      changeConfirmPassword((prevState: Field) => ({value: '', isValid: false}));
    }
  }, [password])

  const submit = (event: FormEvent): void => {
    event.preventDefault()
    alert('This form is made only for decoration. User account wouldn\'t be created. For test login you can use test@test.test/qwerty1234')
  }

  return (
    <form className="form" onSubmit={(event:FormEvent) => submit(event)}>
      <div className="form--title">
        Create account
      </div>
      <InputEmail
        value={email.value}
        onChange={(value: Field) => { changeEmail((prevState: Field) => ({...prevState, ...value}))}}
      />
      <InputPassword
        value={password.value}
        onChange={(value: Field) => { changePassword((prevState: Field) => ({...prevState, ...value}))}}
      />
      {password.isValid && <InputPassword
        isConfirmField={true}
        label="Password confirmation"
        placeholder="Confirm password"
        password={password.value}
        value={passwordConfirm.value ?? ''}
        onChange={(value: Field) => { changeConfirmPassword((prevState: Field) => ({...prevState, ...value}))}}
      />}
      <button
        className={classNames({
          "form--submit": true,
          disabled: !email.isValid || !password.isValid || !passwordConfirm.isValid
        })}>Sign up</button>
    </form>
  )
}

export default SignUpForm;
