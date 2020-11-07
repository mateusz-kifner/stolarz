export default function moneyNoDivider(moneyString:string){
  return parseInt(moneyString.replace(".","").replace("."," "))
}