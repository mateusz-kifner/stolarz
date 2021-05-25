// TODO
export type OrderProps  = {
    id:number,
    name:string,
    desc:string,
    notes:string,
    client_id:number,
    shopping_list_id:number | null,

    price_value:number | null,
    is_price_paid:boolean,
    
    advance_value:number | null,
    is_advance_paid:boolean,
    
    is_completed:boolean,
    is_abandoned:boolean,

    date_of_issue:Date,
    est_date_of_completion:Date | null,
    date_of_completion:Date | null,

}

export type Action = 
{type:"add",data:OrderProps}
| {type:"set",data:OrderProps[]}
| {type:"remove", id:number}
| {type:"change", data:OrderProps}



export function OrdersReducer(prevState:OrderProps[],action:Action){
    switch(action.type){
        case "set":
            let new_data: OrderProps[] = []
            action.data.filter(data=>data!==undefined).map((data=>{
                if (data.id !== undefined){
                    new_data[data.id] = data;
                }
            }))
            return new_data;
        case "add":
            return [...prevState, action.data]
        case "remove":
            return prevState.filter((data)=>{
                if (data.id === action.id) return false
                return true
            })
        case "change":
            return prevState.map((value)=>{
                if (value.id === action.data.id) return action.data
                return value
            });
        default:
            return prevState;
    }
}