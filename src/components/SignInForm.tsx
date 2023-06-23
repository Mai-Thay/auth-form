import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import anchor from '../assets/images/question-mark.svg';
import InputEmail from "./InputEmail";
import InputPassword from "./InputPassword";
import { Field } from "../types/Field";
import { useAuth } from "../context/AutnContext";
import { Tooltip } from "react-tooltip";

const SignInForm: React.FC = (): ReactElement => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false)
  const [userError, setUserError] = useState<boolean>(false)
  const [email, changeEmail] = useState<Field>({
    value: '',
    isValid: false,
  });

  const [password, changePassword] = useState<Field>({
    value: '',
    isValid: false,
  });

  const {login} = useAuth();

  useEffect(() => {
    setUserError(false)
  }, [email.value, password.value])

  const submitForm = (event: FormEvent): void => {
    event.preventDefault();
    if (password?.isValid && email?.isValid) {
      login(email.value, password.value).then((res) => setUserError(!res))
    } else {
      setIsFormSubmitted(true)
    }
  }

  return (
    <form className="form" onSubmit={(event: FormEvent) => submitForm(event)}>
      <div className="form--title">
        Account login
        <a className="form--title-anchor">
          <img src={anchor}/>
        </a>
      </div>
      <InputEmail
        showErrors={isFormSubmitted}
        value={email.value ?? ''}
        onChange={(value: Field) => {
          changeEmail((prevState: Field) => ({...prevState, ...value}))
        }}
      />
      <InputPassword
        value={password.value ?? ''}
        showErrors={isFormSubmitted}
        onChange={(value: Field) => {
          changePassword((prevState: Field) => ({...prevState, ...value}))
        }}
      />
      {userError && <div className="form--row">
        <div className="errors">
          Wrong user email or password. Please, try again.
        </div>
      </div>}
      <button className="form--submit">Sign In</button>
      <div className="form--restore">Forgot <a>password</a>?</div>
      <Tooltip
        className="custom-colored-tooltip"
        anchorSelect=".form--title-anchor"
        place="bottom">
        For test login use<br/>
        <b>Email: test@test.test<br/>
          Password: qwerty1234
        </b>
      </Tooltip>
    </form>
  )
}
export default SignInForm;
