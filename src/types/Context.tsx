import React from "react";

export type AuthContextType = {
  isAuth: boolean | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

export interface Props {
  children: React.ReactNode
}
