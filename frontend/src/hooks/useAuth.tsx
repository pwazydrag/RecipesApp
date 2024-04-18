import { createContext, useContext, useMemo, useState } from "react";

type AuthContextType = {
  token: string;
  login: (tokenData: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: "",
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );

  const login = async (tokenData: string) => {
    setToken(tokenData);
    localStorage.setItem("token", tokenData);
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const value = {
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
