import { createContext, useContext, useState } from "react";
import { AuthContextProps, AuthProviderProps, User } from "./interfaces";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<User | null>(null)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContext')
  }
  return context
}
