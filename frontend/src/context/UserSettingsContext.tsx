import axios from "axios";
import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type UserSettingsContextProps = {
  userdata: Object | null;
  authToken: string | null;
  singin: (login: string, password: string) => boolean;
  singout: () => void;
  expand_shopping_list_in_orders: boolean;
  set_expand_shopping_list_in_orders: (value: boolean) => void;
};

const initialContext = {
  userdata: null,
  authToken: null,
  singin: (login: string, password: string) => {
    return false;
  },
  singout: () => {},
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
  const [userdata, setUserdata] = useState<Object | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [storageUserData, setStorageUserData] = useLocalStorage<any>(
    "user_data",
    []
  );
  const [storageToken, setStorageToken] = useLocalStorage<any>("token", []);
  const [expand_shopping_list_in_orders, set_expand_shopping_list_in_orders] =
    useState<boolean>(true);
  // const [storage, setStorage] = useLocalStorage<any>("usersettings", [])

  useEffect(() => {
    if (storageToken && storageToken !== "") {
      setAuthToken(storageToken);
      axios.defaults.headers["Authorization"] = `Bearer ${storageToken}`;
    } else {
      singout();
    }

    if (storageUserData && storageUserData !== "") {
      try {
        var data = JSON.parse(storageUserData);
      } catch (e) {
        singout();
      }
      setUserdata(data);
    } else {
      singout();
    }
  }, []);

  const singin = (login: string, password: string) => {
    axios
      .post(
        "/auth/local",
        {
          identifier: login,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "",
          },
        }
      )
      .then((res) => {
        if (res?.data) {
          setAuthToken(res.data.jwt);
          setStorageToken(res.data.jwt);
          setUserdata(res.data.user);
          setStorageUserData(JSON.stringify(res.data.user));
          axios.defaults.headers["Authorization"] = `Bearer ${res.data.jwt}`;
          return true;
        }
        return false;
      })
      .catch((err) => console.log(err.response));
    return false;
  };

  const singout = () => {
    delete axios.defaults.headers.common["Authorization"];
    setAuthToken(null);
    setStorageToken(null);
    setUserdata(null);
    setStorageUserData(null);
  };

  return (
    <UserSettingsContext.Provider
      value={{
        userdata,
        authToken,
        singin,
        singout,
        expand_shopping_list_in_orders,
        set_expand_shopping_list_in_orders,
      }}
    >
      {props.children}
    </UserSettingsContext.Provider>
  );
}
