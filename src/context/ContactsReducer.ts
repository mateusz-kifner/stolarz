import faker from 'faker'

export type ContactsProps = {
    id?:number,
    name:string,
    surname:string | null,
    tel:string | null,
    email:string | null,
    is_good:boolean,
}

export type Action = 
{type:"add",data:ContactsProps}
| {type:"set",data:ContactsProps[]}
| {type:"remove", id:number}
| {type:"change", data:ContactsProps}
| {type:"populateWithPlaceholders"}



export function ContactsReducer(prevState:ContactsProps[],action:Action){
    switch(action.type){
        case "set":
            return [...action.data]
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
        case "populateWithPlaceholders":
            var contacts:ContactsProps[] = []
            for (let i=0;i<100;i++){
                let new_contact = {
                    id:i,
                    name:faker.name.firstName(),
                    surname:faker.name.lastName(),
                    tel:faker.phone.phoneNumberFormat(),
                    email:faker.internet.email(),
                    is_good: (faker.random.number()%10 > 2) ? true : false
                }
                contacts.push(new_contact)
            }
            return contacts
        default:
            return prevState;
    }
}