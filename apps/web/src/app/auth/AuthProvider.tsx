import { useCallback, useMemo, useReducer } from "react";
import { AuthContext, CurrentUser } from "./AuthContext";

const setSession = (token: string, user: CurrentUser) => {
  window.sessionStorage.setItem("token", token);
  window.sessionStorage.setItem("user", JSON.stringify(user));
};

const removeUserSession = () => {
  window.sessionStorage.removeItem("token");
  window.sessionStorage.removeItem("user");
};

let userInfo: CurrentUser | null = null;

const user = sessionStorage.getItem("user");

if (user) {
  userInfo = JSON.parse(user) as CurrentUser;
}

export type AuthActionType =
  | {
      type: "LOGIN";
      token: string;
      user: CurrentUser;
    }
  | {
      type: "LOGOUT";
    };

const authReducer = (
  state: CurrentUser | null = userInfo,
  action: AuthActionType
): CurrentUser | null => {
  switch (action.type) {
    case "LOGIN":
      if (action.user) {
        setSession(action.token, action.user);
        return action.user;
      }

      return state;
    case "LOGOUT":
      removeUserSession();
      return null;
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(authReducer, userInfo);

  const login = useCallback(
    (user: CurrentUser, token: string) => {
      dispatch({ type: "LOGIN", token, user });
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, [dispatch]);

  const authValue = useMemo(
    () => ({ state, login, logout }),
    [state, login, logout]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
