

export type ContactsProps = {
    id?:number,
    firstname:string,
    lastname:string | null,
    tel:string | null,
    email:string | null,
    users_permissions_user?: Object | null,
    is_good:boolean,
}

export type Action = 
{type:"add",data:ContactsProps}
| {type:"set",data:ContactsProps[]}
| {type:"remove", id:number}
| {type:"change", data:ContactsProps}




export function ContactsReducer(prevState:ContactsProps[],action:Action){
    switch(action.type){
        case "set":
            let new_data:ContactsProps[] = []
            action.data.map((data=>{
                if (data.id !== undefined){
                    new_data[data.id] = data;
                }
            }))
            return new_data;
        case "add":
            if (action.data.id === undefined) action.data.id = prevState.length
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