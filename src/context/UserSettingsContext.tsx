import React, { useState } from "react"

type UserSettingsContextProps = {
  login: string | null
  expand_shopping_list_in_orders: boolean
  set_expand_shopping_list_in_orders: (value: boolean) => void
}

const initialContext = {
  login: null,
  expand_shopping_list_in_orders: true,
  set_expand_shopping_list_in_orders: (value: boolean) => {},
}

export const UserSettingsContext = React.createContext<
  UserSettingsContextProps
>(initialContext)

type UserSettingsContextProviderProps = {
  children: import("react").ReactNode
}

export function UserSettingsContextProvider(
  props: UserSettingsContextProviderProps,
) {
  const [login, setLogin] = useState<string | null>(null)
  const [
    expand_shopping_list_in_orders,
    set_expand_shopping_list_in_orders,
  ] = useState<boolean>(true)
  // const [storage, setStorage] = useLocalStorage<any>("usersettings", [])

  return (
    <UserSettingsContext.Provider
      value={{
        login,
        expand_shopping_list_in_orders,
        set_expand_shopping_list_in_orders,
      }}
    >
      {props.children}
    </UserSettingsContext.Provider>
  )
}
