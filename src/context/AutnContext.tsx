import React, { useContext, useEffect, useState } from "react";
import { AuthContextType, Props } from "../types/Context";

const AuthContext = React.createContext<AuthContextType>({
  isAuth: false,
  login: (email, password) =>  {
    return new Promise<boolean>((resolve) => resolve(true));
  },
  logout: () => {}
});

export const useAuth = () => {
  return useContext<AuthContextType>(AuthContext)
}

export const AuthProvider: React.FC<Props> = ({children}) => {
  const [isAuth, setIsAuth] = useState<boolean|null>(null);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem('isAuth'));
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const result = email === 'test@test.test' && password === 'qwerty1234'
      setTimeout(() => {
        localStorage.setItem('isAuth', '1')
        setIsAuth(result)
        resolve(result)
      }, 1000)
    })
  }

  const logout = (): void => {
    localStorage.removeItem('isAuth');
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider value={{isAuth, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
