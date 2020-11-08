import faker from 'faker'
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
    is_anbandoned:boolean,

    date_of_issue:Date,
    est_date_of_completion:Date | null,
    date_of_completion:Date | null,

}

export type Action = 
{type:"add",data:OrderProps}
| {type:"set",data:OrderProps[]}
| {type:"remove", id:number}
| {type:"change", data:OrderProps}
| {type:"populateWithPlaceholders"}



export function OrdersReducer(prevState:OrderProps[],action:Action){
    switch(action.type){
        case "set":
            return [...action.data]
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
        case "populateWithPlaceholders":
            var contacts:OrderProps[] = []
            for (let i=0;i<40;i++){
                let new_order:OrderProps= {
                    id:i,
                    name:"test",
                    client_id:0,
                    desc:"wooden Table",
                    notes:"",
                    price_value:faker.random.number()%4000+500,
                    is_price_paid:false,
                    advance_value:faker.random.number()%500,
                    is_advance_paid:(faker.random.number()%10 > 2) ? true : false,
                    shopping_list_id:null,
                    is_anbandoned:false,
                    is_completed:false,
                    date_of_issue:faker.date.recent(),
                    est_date_of_completion:faker.date.soon(),
                    date_of_completion:null
                }
                contacts.push(new_order)
            }
            return contacts
        default:
            return prevState;
    }
}