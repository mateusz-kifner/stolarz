import { listenerCount } from "process"
import React, { useReducer, Reducer, useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import {
  Action,
  ReciptItemProps,
  ReciptProps,
  ReciptReducer,
} from "./ReciptReducer"

type ReciptContextProps = {
  recipts: ReciptProps[]
  setRecipts: (recipts: ReciptProps[]) => void
  addRecipt: (recipt: ReciptProps) => void
  removeRecipt: (id: number) => void
  changeRecipt: (recipt: ReciptProps) => void
  populateReciptsWithPlaceholders: () => void
  addItem: (list_id: number, item_data: ReciptItemProps) => void
  removeItem: (list_id: number, item_id: number) => void
}

const initialContext = {
  recipts: [],
  setRecipts: (recipts: ReciptProps[]) => {},
  addRecipt: (recipt: ReciptProps) => {},
  removeRecipt: (id: number) => {},
  changeRecipt: (recipt: ReciptProps) => {},
  populateReciptsWithPlaceholders: () => {},
  addItem: (list_id: number, item_data: ReciptItemProps) => {},
  removeItem: (list_id: number, item_id: number) => {},
}

export const ReciptContext = React.createContext<ReciptContextProps>(
  initialContext,
)

type ReciptContextProviderProps = {
  children: import("react").ReactNode
}

export function ReciptContextProvider(props: ReciptContextProviderProps) {
  const [recipts, dispatchRecipts] = useReducer<Reducer<ReciptProps[], Action>>(
    ReciptReducer,
    [],
  )
  const [storage, setStorage] = useLocalStorage<any>("recipt", [])

  useEffect(() => {
    setRecipts(storage)
  }, [])

  useEffect(() => {
    setStorage(recipts)
  })

  const setRecipts = (recipts: ReciptProps[]) => {
    dispatchRecipts({ type: "setRecipts", data: recipts })
  }

  const addRecipt = (recipt: ReciptProps) => {
    dispatchRecipts({ type: "addRecipt", data: recipt })
  }
  const removeRecipt = (id: number) => {
    dispatchRecipts({ type: "removeRecipt", list_id: id })
  }
  const changeRecipt = (recipt: ReciptProps) => {
    dispatchRecipts({ type: "changeRecipt", list_data: recipt })
  }

  const addItem = (list_id: number, item_data: ReciptItemProps) => {
    dispatchRecipts({ type: "addItem", list_id, item_data })
  }

  const removeItem = (list_id: number, item_id: number) => {
    dispatchRecipts({ type: "removeItem", list_id, item_id })
  }

  const populateReciptsWithPlaceholders = () => {
    dispatchRecipts({ type: "populateWithPlaceholders" })
  }
  return (
    <ReciptContext.Provider
      value={{
        recipts,
        setRecipts,
        addRecipt,
        removeRecipt,
        changeRecipt,
        populateReciptsWithPlaceholders,
        addItem,
        removeItem,
      }}
    >
      {props.children}
    </ReciptContext.Provider>
  )
}
