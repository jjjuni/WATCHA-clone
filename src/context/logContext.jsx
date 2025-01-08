import { createContext, useState } from "react";

export const LogContext = createContext();

export function LogContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('accessToken'));
  const [userInfo, setUserInfo] = useState();
  
  return (
    <LogContext.Provider
      value={{
        isLogged,
        setIsLogged,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </LogContext.Provider>
  );
}
