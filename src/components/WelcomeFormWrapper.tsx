import React, { ReactElement, useState } from "react";
import classNames from "classnames";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useAuth } from "../context/AutnContext";
import Logout from "./Logout";
import { FormTypeEnum, FormTypeValue } from "../types/FormTypes";

const WelcomeFormWrapper: React.FC = (): ReactElement => {
  const [formType, setFormType] = useState<FormTypeValue|null>(FormTypeEnum.SIGNIN);
  const {isAuth} = useAuth();

  const switchFormType = (type: FormTypeValue): void => {
    if(type !== formType) {
      setFormType(null)
      setTimeout(() => setFormType(type), 1000)
    }
  }

  return (
    <div className="wrap-welcome">
      <div className="wrap-welcome--left"></div>
      {isAuth === false && <div className="wrap-welcome--right">
        <ul className="wrap-welcome--right-tabs">
          <li
            onClick={() => switchFormType(FormTypeEnum.SIGNIN)}
            className={classNames({active: formType === FormTypeEnum.SIGNIN})}>
            Sign in
          </li>
          <li
            onClick={() => switchFormType(FormTypeEnum.SIGNUP)}
            className={classNames({active: formType === FormTypeEnum.SIGNUP})}>
            Sign up
          </li>
        </ul>
        <div className="wrap-welcome--right-tabs-content">
          <div className={classNames({active: formType === FormTypeEnum.SIGNIN})}>
            <SignInForm/>
          </div>
          <div className={classNames({active: formType === FormTypeEnum.SIGNUP})}>
            <SignUpForm/>
          </div>
        </div>
      </div> || isAuth &&
          <div className="wrap-welcome--right">
              <Logout/>
          </div>
      }

    </div>
  )
}

export default WelcomeFormWrapper;
