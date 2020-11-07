import faker from 'faker'

export type ShoppingListItemProps = {
    id?:number,
    name:string,
    amount:number,
    is_bought?:boolean,
}

export type ShoppingListProps = {
    id?:number,
    name:string,
    items:ShoppingListItemProps[],
    budget:number | null,
    order_id: number | null,
    completed: boolean
}

export type Action = 
// Add Recipt to list
{type:"addRecipt",data:ShoppingListProps}
| {type:"setRecipts",data:ShoppingListProps[]}
| {type:"removeRecipt", list_id:number}
| {type:"changeRecipt", list_data:ShoppingListProps}
// Add Items to recipt
| {type:"addItem", list_id:number, item_data:ShoppingListItemProps}
| {type:"removeItem", list_id:number, item_id:number}
| {type:"changeItem", list_id:number, item_id:number, item_data:ShoppingListItemProps}
// Placeholders
| {type:"populateWithPlaceholders"}



export function ShoppingListReducer(prevState:ShoppingListProps[],action:Action){
    console.log("reducer run")
    switch(action.type){
        case "setRecipts":
            return [...action.data]
        case "addRecipt":
            if (action.data.id === undefined) action.data.id = prevState.length
            action.data.items.map((value,index)=>{
                if (value.id === undefined) value.id = index
                return value
            })
            return [...prevState, action.data]
        case "removeRecipt":
            return prevState.filter((data)=>{
                if (data.id === action.list_id) return false
                return true
            })
        case "changeRecipt":
            return prevState.map((recipt)=>{
                if (recipt.id === action.list_data.id) return action.list_data
                return recipt
            });
        case "addItem":
            return prevState.map((recipt)=>{
                if (recipt.id === action.list_id) {
                    console.log(recipt)
                    let new_recipt = {...recipt}
                    new_recipt.items = [...recipt.items]
                    if (action.item_data.id === undefined) action.item_data.id = recipt.items.length
                    if (action.item_data.is_bought === undefined) action.item_data.is_bought = false
                    new_recipt.items.push(action.item_data)
                    return new_recipt
                }
                return recipt
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
        // case "removeItem":
        //     return prevState.map((value)=>{
        //         if (value.id === action.list_id) {
        //             let new_items = value.items.filter((_, index)=>{
        //                 if (index === action.item_id) return false;
        //                 return true;
        //             })
        //             return {...value, items:new_items}
        //         }
        //         return value
        //     })
        // case "changeItem":
        //     return prevState.map((value)=>{
        //         if (value.id === action.list_id) {
        //             let new_items = value.items.map((item_value, index)=>{
        //                 if (index === action.item_id) return action.item_data;
        //                 return item_value;
        //             })
        //             return {...value, items:new_items}
        //         }
        //         return value
        //     })
        
        case "populateWithPlaceholders":
            var shoppingList:ShoppingListProps[] = []
            for (let i=0;i<20;i++){
                let new_recipt:ShoppingListProps={
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
               
                shoppingList.push(new_recipt)
            }
            return shoppingList
        default:
            return prevState;
    }
}