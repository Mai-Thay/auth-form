import React from "react";
import { useAuth } from "../context/AutnContext";

const Logout: React.FC = (): React.ReactElement => {
  const {logout} = useAuth();
  return (
    <div className="welcome">
      <div className="welcome--title">Sorry, Mario, your princess is in another castle...</div>
      <div className="welcome--text">Unfortunately, this app was created for only one purpose - to demonstrate that person who made it is really interested in getting a new job. So, the only one thing you can do is to press the LOGOUT button.</div>
      <button className="welcome--logout" onClick={logout}>LOGOUT</button>
    </div>
  )
}

export default Logout;
