import { createContext, useContext } from "react";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
};

export interface AuthContextProps {
  state: CurrentUser | null;
  login: (user: CurrentUser, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
