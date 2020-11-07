import { listenerCount } from "process"
import React, { useReducer, Reducer, useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import {
  Action,
  ReceiptItemProps,
  ReceiptProps,
  ReceiptReducer,
} from "./ReceiptReducer"

type ReceiptContextProps = {
  receipts: ReceiptProps[]
  setReceipts: (receipts: ReceiptProps[]) => void
  addReceipt: (receipt: ReceiptProps) => void
  removeReceipt: (id: number) => void
  changeReceipt: (receipt: ReceiptProps) => void
  populateReceiptsWithPlaceholders: () => void
  addItem: (list_id: number, item_data: ReceiptItemProps) => void
  removeItem: (list_id: number, item_id: number) => void
}

const initialContext = {
  receipts: [],
  setReceipts: (receipts: ReceiptProps[]) => {},
  addReceipt: (receipt: ReceiptProps) => {},
  removeReceipt: (id: number) => {},
  changeReceipt: (receipt: ReceiptProps) => {},
  populateReceiptsWithPlaceholders: () => {},
  addItem: (list_id: number, item_data: ReceiptItemProps) => {},
  removeItem: (list_id: number, item_id: number) => {},
}

export const ReceiptContext = React.createContext<ReceiptContextProps>(
  initialContext,
)

type ReceiptContextProviderProps = {
  children: import("react").ReactNode
}

export function ReceiptContextProvider(props: ReceiptContextProviderProps) {
  const [receipts, dispatchReceipts] = useReducer<
    Reducer<ReceiptProps[], Action>
  >(ReceiptReducer, [])
  const [storage, setStorage] = useLocalStorage<any>("receipt", [])

  useEffect(() => {
    setReceipts(storage)
  }, [])

  useEffect(() => {
    setStorage(receipts)
  })

  const setReceipts = (receipts: ReceiptProps[]) => {
    dispatchReceipts({ type: "setReceipts", data: receipts })
  }

  const addReceipt = (receipt: ReceiptProps) => {
    dispatchReceipts({ type: "addReceipt", data: receipt })
  }
  const removeReceipt = (id: number) => {
    dispatchReceipts({ type: "removeReceipt", list_id: id })
  }
  const changeReceipt = (receipt: ReceiptProps) => {
    dispatchReceipts({ type: "changeReceipt", list_data: receipt })
  }

  const addItem = (list_id: number, item_data: ReceiptItemProps) => {
    dispatchReceipts({ type: "addItem", list_id, item_data })
  }

  const removeItem = (list_id: number, item_id: number) => {
    dispatchReceipts({ type: "removeItem", list_id, item_id })
  }

  const populateReceiptsWithPlaceholders = () => {
    dispatchReceipts({ type: "populateWithPlaceholders" })
  }
  return (
    <ReceiptContext.Provider
      value={{
        receipts,
        setReceipts,
        addReceipt,
        removeReceipt,
        changeReceipt,
        populateReceiptsWithPlaceholders,
        addItem,
        removeItem,
      }}
    >
      {props.children}
    </ReceiptContext.Provider>
  )
}
