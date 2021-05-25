import axios from "axios";
import React, { useState } from "react";

type UserSettingsContextProps = {
  login: string | null;
  authToken: string | null;
  singin: (login: string, password: string) => boolean;
  expand_shopping_list_in_orders: boolean;
  set_expand_shopping_list_in_orders: (value: boolean) => void;
};

const initialContext = {
  login: null,
  authToken: null,
  singin: (login: string, password: string) => {
    return false;
  },
  expand_shopping_list_in_orders: true,
  set_expand_shopping_list_in_orders: (value: boolean) => {},
};

export const UserSettingsContext =
  React.createContext<UserSettingsContextProps>(initialContext);

type UserSettingsContextProviderProps = {
  children: import("react").ReactNode;
};

export function UserSettingsContextProvider(
  props: UserSettingsContextProviderProps
) {
  const [login, setLogin] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const [expand_shopping_list_in_orders, set_expand_shopping_list_in_orders] =
    useState<boolean>(true);
  // const [storage, setStorage] = useLocalStorage<any>("usersettings", [])

  const singin = (login: string, password: string) => {
    axios
      .post("/auth/local", {
        identifier: login,
        password: password,
      })
      .then((res) => {
        if (res?.data?.jwt) {
          setAuthToken(res.data.jwt);
          console.log(res.data.jwt);
          axios.defaults.auth = res.data.jwt;
          return true;
        }
        return false;
      })
      .catch((err) => console.log(err.response));
    return false;
  };

  return (
    <UserSettingsContext.Provider
      value={{
        login,
        authToken,
        singin,
        expand_shopping_list_in_orders,
        set_expand_shopping_list_in_orders,
      }}
    >
      {props.children}
    </UserSettingsContext.Provider>
  );
}
