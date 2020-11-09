import faker from 'faker'

export type ReceiptItemProps = {
    id?:number,
    name:string,
    amount:number,
    is_bought?:boolean,
}

export type ReceiptProps = {
    id?:number,
    name:string,
    items:ReceiptItemProps[],
    budget:number | null,
    money_spent?:number,
    order_id: number | null,
    completed: boolean
}

export type Action = 
// Add Receipt to list
{type:"addReceipt",data:ReceiptProps}
| {type:"setReceipts",data:ReceiptProps[]}
| {type:"removeReceipt", list_id:number}
| {type:"changeReceipt", list_data:ReceiptProps}
// Add Items to receipt
| {type:"addItem", list_id:number, item_data:ReceiptItemProps}
| {type:"removeItem", list_id:number, item_id:number}
| {type:"changeItem", list_id:number, item_data:ReceiptItemProps}
// Placeholders
| {type:"populateWithPlaceholders"}



export function ReceiptReducer(prevState:ReceiptProps[],action:Action){
    switch(action.type){
        case "setReceipts":
            return [...action.data]
        case "addReceipt":
            let new_receipt = {...action.data}
            if (new_receipt.id === undefined) new_receipt.id = prevState.length
            new_receipt.items = new_receipt.items.map((value,index)=>{
                let new_item = value
                new_item.id = index
                return new_item
            })
            // checks if completed is true
            let sum_of_bougth_items = new_receipt.items
            .map((val)=>val.is_bought?1:0)
            .reduce((prevVal:number,val:number)=>(prevVal + val) ,0)
            if (sum_of_bougth_items === new_receipt.items.length)
                new_receipt.completed = true
            else
                new_receipt.completed = false
            if (prevState[new_receipt.id] !== undefined) return prevState.map((receipt)=>{
                if (receipt.id === new_receipt.id) return new_receipt
                return receipt
            });
            return [...prevState, new_receipt]
        case "removeReceipt":
            return prevState.filter((data)=>{
                if (data.id === action.list_id) return false
                return true
            })
        case "changeReceipt":
            return prevState.map((receipt)=>{
                if (receipt.id === action.list_data.id) return action.list_data
                return receipt
            });
        case "addItem":
            return prevState.map((receipt)=>{
                if (receipt.id === action.list_id) {
                    console.log(receipt)
                    let new_receipt = {...receipt}
                    new_receipt.items = [...receipt.items]
                    if (action.item_data.id === undefined) action.item_data.id = receipt.items.length
                    if (action.item_data.is_bought === undefined) action.item_data.is_bought = false
                    new_receipt.items.push(action.item_data)
                    let sum_of_bougth_items = new_receipt.items
                    .map((val)=>val.is_bought?1:0)
                    .reduce((prevVal:number,val:number)=>(prevVal + val) ,0)
                    if (sum_of_bougth_items === new_receipt.items.length)
                        new_receipt.completed = true
                    else
                        new_receipt.completed = false
                    return new_receipt
                }
                return receipt
            })
        case "changeItem":
            return prevState.map((receipt)=>{
                if (receipt.id === action.list_id) {
                    let new_receipt = {...receipt}
                    new_receipt.items = [...receipt.items]
                    let id:number = (action.item_data as { id: number }& ReceiptItemProps).id
                    new_receipt.items[id] = action.item_data
                    let sum_of_bougth_items = new_receipt.items
                    .map((val)=>val.is_bought?1:0)
                    .reduce((prevVal:number,val:number)=>(prevVal + val) ,0)
                    if (sum_of_bougth_items === new_receipt.items.length)
                        new_receipt.completed = true
                    else
                        new_receipt.completed = false
                    return new_receipt
                }
                return receipt
            })
        case "removeItem":
            return prevState.map((value)=>{
                if (value.id === action.list_id) {
                    let new_items = value.items.filter((item_value)=>{
                        if (item_value.id === action.item_id) return false;
                        return true;
                    })
                    return {...value, items:new_items}
                }
                return value
            })
        case "populateWithPlaceholders":
            var receipt:ReceiptProps[] = []
            for (let i=0;i<20;i++){
                let new_receipt:ReceiptProps={
                    id:i,
                    name:"test",
                    budget: faker.random.number()%40000,
                    order_id:null,
                    items:[{
                        id:0,
                        name: faker.commerce.product(),
                        amount: faker.random.number() % 20+1,
                        is_bought:false
                    }],
                    completed: (faker.random.number()%10 > 2) ? true : false
                }
               
                receipt.push(new_receipt)
            }
            return receipt
        default:
            return prevState;
    }
}